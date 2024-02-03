import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'

import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from '@storage/storageUser'
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from '@storage/storageAuthToken'

import { api } from '@services/api'
import { UserDTO } from '@dtos/UserDTO'
import { SessionDTO } from '@dtos/SessionDTO'

export interface AuthContextDataProps {
  user: UserDTO
  isLoadingUserStorageData: boolean

  updateUserProfile(userUpdated: UserDTO): Promise<void>

  signIn(email: string, password: string): Promise<void>
  signUp(email: string, name: string, password: string): Promise<void>
  signOut(): Promise<void>
}

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState<boolean>(true)

  function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
    setUser(userData)
  }

  async function storageUserAndTokenSave(
    userData: UserDTO,
    token: string,
    refreshToken: string,
  ) {
    setIsLoadingUserStorageData(true)

    await storageUserSave(userData)
    await storageAuthTokenSave({ token, refreshToken })

    setIsLoadingUserStorageData(false)
  }

  const loadUserDataAndToken = useCallback(async () => {
    const userLogged = await storageUserGet()
    const { token } = await storageAuthTokenGet()

    userAndTokenUpdate(userLogged, token)
    setIsLoadingUserStorageData(false)
  }, [])

  async function signIn(email: string, password: string) {
    const response = await api.post<SessionDTO>('/sessions', {
      email,
      password,
    })

    const { user, token, refresh_token } = response.data

    await storageUserAndTokenSave(user, token, refresh_token)
    userAndTokenUpdate(user, token)
  }

  async function signUp(email: string, name: string, password: string) {
    await api.post('/users', {
      email,
      name,
      password,
    })
  }

  const signOut = useCallback(async () => {
    setIsLoadingUserStorageData(true)
    setUser({} as UserDTO)

    await storageUserRemove()
    await storageAuthTokenRemove()
    setIsLoadingUserStorageData(false)
  }, [])

  async function updateUserProfile(userUpdated: UserDTO) {
    setUser(userUpdated)

    await storageUserSave(userUpdated)
  }

  useEffect(() => {
    loadUserDataAndToken()
  }, [loadUserDataAndToken])

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut)

    return () => {
      subscribe()
    }
  }, [signOut])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadingUserStorageData,
        updateUserProfile,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
