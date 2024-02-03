import AsyncStorage from '@react-native-async-storage/async-storage'

import * as T from './types'
import { AUTH_TOKEN_STORAGE } from './config'

export async function storageAuthTokenSave({
  token,
  refreshToken,
}: T.StorageAuthTokenProps): Promise<void> {
  await AsyncStorage.setItem(
    AUTH_TOKEN_STORAGE,
    JSON.stringify({ token, refreshToken }),
  )
}

export async function storageAuthTokenGet() {
  const response = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE)

  const { token, refreshToken }: T.StorageAuthTokenProps = response
    ? JSON.parse(response)
    : {}

  return {
    token,
    refreshToken,
  }
}

export async function storageAuthTokenRemove(): Promise<void> {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE)
}
