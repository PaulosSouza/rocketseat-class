/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-async-promise-executor */
import axios, { AxiosError, AxiosInstance } from 'axios'
import {
  storageAuthTokenGet,
  storageAuthTokenSave,
} from '@storage/storageAuthToken'

import { SessionRefreshTokenDTO } from '@dtos/SessionRefreshTokenDTO'

import { AppError } from '@utils/AppError'

type SignOutFunction = () => Promise<void>

interface PromisesType {
  onSuccess(token: string): void
  onFailure(error: AxiosError): void
}

interface APIInstanceProps extends AxiosInstance {
  registerInterceptTokenManager(signOutFn: SignOutFunction): () => void
}

const api = axios.create({
  baseURL: 'http://10.0.0.151:3333',
}) as APIInstanceProps

let failedQueue: PromisesType[] = []
let isRefeshing = false

api.registerInterceptTokenManager = (signOutFn) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      if (requestError?.response?.status === 401) {
        if (
          requestError?.response?.data?.message === 'token.expired' ||
          requestError?.response?.data?.message === 'token.invalid'
        ) {
          const { refreshToken } = await storageAuthTokenGet()

          if (!refreshToken) {
            return Promise.reject(requestError)
          }

          const originalRequestConfig = requestError.config

          if (isRefeshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSuccess(token: string) {
                  originalRequestConfig.headers = {
                    Authorization: `Bearer ${token}`,
                  }

                  resolve(api(originalRequestConfig))
                },
                onFailure(error: AxiosError) {
                  reject(error)
                },
              })
            })
          }

          isRefeshing = true

          return new Promise(async (resolve, reject) => {
            try {
              const responseRefreshToken =
                await api.post<SessionRefreshTokenDTO>(
                  '/sessions/refresh-token',
                  {
                    refresh_token: refreshToken,
                  },
                )

              const { refresh_token, token } = responseRefreshToken.data
              await storageAuthTokenSave({ token, refreshToken: refresh_token })

              if (originalRequestConfig.data) {
                originalRequestConfig.data = JSON.parse(
                  originalRequestConfig.data,
                )
              }

              originalRequestConfig.headers = {
                Authorization: `Bearer ${token}`,
              }

              api.defaults.headers.common.Authorization = `Bearer ${token}`

              for (const requests of failedQueue) {
                requests.onSuccess(token)
              }

              resolve(api(originalRequestConfig))
            } catch (error: any) {
              for (const requests of failedQueue) {
                requests.onFailure(error)
              }

              signOutFn()
              reject(error)
            } finally {
              isRefeshing = false
              failedQueue = []
            }
          })
        }

        await signOutFn()
      }

      if (requestError.response && requestError.response?.data) {
        return Promise.reject(new AppError(requestError.response.data.message))
      }

      return Promise.reject(requestError)
    },
  )

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}

export { api }
