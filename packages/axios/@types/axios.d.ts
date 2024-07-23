import 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    rawResponse?: boolean
    isRefreshRequest?: boolean
  }
}
