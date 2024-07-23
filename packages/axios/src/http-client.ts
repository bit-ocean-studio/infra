import { AuthUtils, LangUtils } from '@bit-ocean/utils'
import type { NoticeType } from 'antd/es/message/interface'
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig
} from 'axios'
import axios, { HttpStatusCode } from 'axios'

import { errorMessageMap } from './error-message.map'
import type {
  AxiosInstanceOptions,
  InterceptorInitOptions,
  PendingRequest,
  R,
  Tokens
} from './types'

axios.defaults.timeout = 30_000
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8'

export class HttpClient {
  /**
   * The instance of Axios.
   */
  #instance: AxiosInstance

  /**
   * The extra custom options for the instance.
   */
  #instanceOptions: AxiosInstanceOptions = {}

  /**
   * The flag to indicate whether the interceptors are loaded.
   */
  #interceptorsLoaded = false

  /**
   * The flag to indicate whether the token is refreshing.
   * @description If the token is refreshing, the request will be added to the pending list.
   */
  #isTokenRefreshing = false

  /**
   * The pending requests.
   */
  #pendingQueue: PendingRequest[] = []

  constructor(options?: AxiosInstanceOptions, config?: CreateAxiosDefaults) {
    this.#instance = axios.create(config)
    this.#instanceOptions = options ?? {}
  }

  /**
   * Initialize the interceptors.
   */
  async initInterceptors(options?: InterceptorInitOptions) {
    // NOTE: Prevent repeating the initialization.
    if (this.#interceptorsLoaded) {
      return
    }
    this.#interceptorsLoaded = true

    const { router, message, i18n } = options ?? {}

    this.#initRequestInterceptor()
    this.#initResponseInterceptor({ router, message })
  }

  /**
   * Initialize the request interceptor.
   */
  #initRequestInterceptor() {
    this.#instance.interceptors.request.use(
      (req: InternalAxiosRequestConfig) => {
        this.#addLanguage(req)
        this.#addAuthorization(req)
        return req
      },
      (err: AxiosError) => Promise.reject(err)
    )
  }

  /**
   * Initialize the response interceptor.
   */
  #initResponseInterceptor(options: InterceptorInitOptions) {
    const { message } = options
    this.#instance.interceptors.response.use(
      (res: AxiosResponse<R>) => {
        if (res.config?.rawResponse) {
          return res
        }
        const { data, msg } = res.data

        this.#handleMessage(msg, message)

        return data
      },
      async (err: AxiosError<R>) => {
        const { response, config } = err

        // If the request is canceled, throw the error.
        if (axios.isCancel(err)) {
          throw err
        }

        // Process the refresh token API error.
        if (config?.isRefreshRequest) {
          this.#isTokenRefreshing = false
          throw response?.data.data
        }

        // If the token is refreshing, add the request to the pending queue.
        if (this.#isTokenRefreshing) {
          return this.#pendingRequest(config)
        }

        // Handle by status code.
        const newResponse = await this.#handleStatusCode(response, options)
        if (newResponse) {
          return newResponse
        }

        throw response?.data
      }
    )
  }

  /**
   * Add the current language to the request header.
   */
  #addLanguage(req: InternalAxiosRequestConfig) {
    req.headers['Accept-Language'] = LangUtils.getDefaultLang()
  }

  /**
   * Add the authorization to the request header.
   */
  #addAuthorization(req: InternalAxiosRequestConfig) {
    if (AuthUtils.isAuthenticated()) {
      req.headers.Authorization = AuthUtils.getAuthorization()
    }
  }

  /**
   * Handle the message.
   * @description
   * - If the message is an array, show each message.
   * - If the message is a string, show the message.
   * - Default message type is `success`.
   */
  #handleMessage(
    msg?: string | string[],
    message?: InterceptorInitOptions['message'],
    messageType: NoticeType = 'success'
  ) {
    if (!message || !msg) {
      return
    }
    if (Array.isArray(msg)) {
      msg.forEach((m) => message[messageType](m))
    } else {
      message[messageType](msg)
    }
  }

  /**
   * Add the request to the pending queue.
   */
  #pendingRequest(config?: AxiosRequestConfig) {
    return new Promise((resolve) => {
      this.#pendingQueue.push({ config, resolve })
    })
  }

  /**
   * Error handling by status code.
   * @description
   * - If the status code is `401`, handle the unauthorized logic.
   * - If the status code is `403`, redirect to the `403` page.
   * - If the status code is `500`, redirect to the `500` page.
   * - If the status code is not in the above, do nothing.
   */
  async #handleStatusCode(res?: AxiosResponse<R>, options?: InterceptorInitOptions) {
    const { status = 0, data, config } = res ?? {}
    const { message, router } = options ?? {}

    /**
     * 1. Use the `msg` from the response data.
     * 2. Check the `errorMessageMap` by status code.
     * 3. Use the default message `Unknown error!`.
     */
    const errorMsg = data?.msg ?? errorMessageMap.get(status) ?? 'Unknown error!'

    switch (status) {
      case HttpStatusCode.Unauthorized: {
        try {
          /**
           * If the refresh token logic is enabled, try to refresh the token.
           */
          if (this.#instanceOptions.enableRefreshToken) {
            const newResponse = await this.#refresh(config)
            if (newResponse) {
              return newResponse
            }
          }
        } catch {
          //
        }
        this.#handleMessage(errorMsg, message, 'error')
        this.#handleUnauthorized(router)
        break
      }
      case HttpStatusCode.Forbidden: {
        router?.navigate({ to: '/403', replace: true })
        this.#handleMessage(errorMsg, message, 'error')
        break
      }
      case HttpStatusCode.InternalServerError:
      case HttpStatusCode.BadGateway:
      case HttpStatusCode.GatewayTimeout: {
        router?.navigate({ to: '/500', replace: true })
        this.#handleMessage(errorMsg, message, 'error')
        break
      }
      default: {
        this.#handleMessage(errorMsg, message, 'error')
        break
      }
    }
    return false
  }

  /**
   * Handle the unauthorized logic.
   * @description
   * - Clear the access token and refresh token.
   * - Redirect to the public page (`/login` by default) with query `?redirect=${currentPath}`.
   */
  #handleUnauthorized(router: InterceptorInitOptions['router']) {
    const { unauthorizedRedirectUrl = '/login' } = this.#instanceOptions

    AuthUtils.clearAccessToken()
    AuthUtils.clearRefreshToken()

    const currentPath = router?.state.location.pathname

    if (currentPath !== unauthorizedRedirectUrl) {
      router?.navigate({
        to: unauthorizedRedirectUrl,
        replace: true,
        search: currentPath === unauthorizedRedirectUrl ? undefined : { redirect: currentPath }
      })
    }
  }

  /**
   * Refresh the token.
   * @description
   * - Get the refresh token from the local storage.
   * - Send a request to the refresh token API.
   * - Set the new access token and refresh token.
   * - Retry the current request and pending requests after get new tokens.
   */
  async #refresh(config?: AxiosRequestConfig) {
    this.#isTokenRefreshing = true

    const token = AuthUtils.getRefreshToken()

    const { accessToken, refreshToken } = await this.POST<Tokens>(
      '/auth/refresh',
      {
        token
      },
      {
        isRefreshRequest: true
      }
    )

    AuthUtils.setAccessToken(accessToken)
    AuthUtils.setRefreshToken(refreshToken)

    this.#isTokenRefreshing = false

    // Retry the current request after get new tokens.
    if (config) {
      const newResponse = await this.request({
        ...config,
        headers: {
          ...config.headers,
          Authorization: AuthUtils.getAuthorization()
        }
      })

      if (this.#pendingQueue.length > 0) {
        this.#pendingQueue.forEach((task) => task.resolve(this.request(task.config!)))
        this.#pendingQueue = []
      }
      return newResponse
    }
    return false
  }

  /**
   * The method to send a request.
   * @example
   * ```ts
   * const httpClient = new HttpClient()
   * httpClient.request({ url: '/api/users', method: 'GET' })
   * ```
   */
  request<T>(config: AxiosRequestConfig): Promise<T> {
    return this.#instance.request(config)
  }

  /**
   * The method to send a `GET` request.
   * @example
   * ```ts
   * const httpClient = new HttpClient()
   * httpClient.GET('/api/users')
   * ```
   */
  get<T, D = any>(
    url: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig<D>
  ): Promise<T> {
    return this.#instance.get(url, { params, ...config })
  }

  /**
   * The method to send a `POST` request.
   * @example
   * ```ts
   * const httpClient = new HttpClient()
   * httpClient.POST('/api/users', { id: 1, name: 'Bruce' })
   * ```
   */
  post<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T> {
    return this.#instance.post(url, data, config)
  }

  /**
   * The method to send a `PUT` request.
   * @example
   * ```ts
   * const httpClient = new HttpClient()
   * httpClient.PUT('/api/users/1', { name: 'Bruce' })
   * ```
   */
  put<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T> {
    return this.#instance.put(url, data, config)
  }

  /**
   * The method to send a `DELETE` request.
   * @example
   * ```ts
   * const httpClient = new HttpClient()
   * httpClient.DELETE('/api/users/1')
   * ```
   */
  delete<T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T> {
    return this.#instance.delete(url, config)
  }

  /**
   * The method to send a `PATCH` request.
   * @example
   * ```ts
   * const httpClient = new HttpClient()
   * httpClient.PATCH('/api/users/1', { name: 'Bruce' })
   * ```
   */
  patch<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T> {
    return this.#instance.patch(url, data, config)
  }

  /**
   * The method to send a `GET` request.
   * @description In order to highlight the method of request, also support the upper case methods.
   * @example
   * ```ts
   * const httpClient = new HttpClient()
   * httpClient.GET('/api/users')
   * ```
   */
  GET<T, D = any>(
    url: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig<D>
  ): Promise<T> {
    return this.#instance.get(url, { params, ...config })
  }

  /**
   * The method to send a `POST` request.
   * @description In order to highlight the method of request, also support the upper case methods.
   * @example
   * ```ts
   * const httpClient = new HttpClient()
   * httpClient.POST('/api/users', { id: 1, name: 'Bruce' })
   * ```
   */
  POST<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T> {
    return this.#instance.post(url, data, config)
  }

  /**
   * The method to send a `PUT` request.
   * @description In order to highlight the method of request, also support the upper case methods.
   * @example
   * ```ts
   * const httpClient = new HttpClient()
   * httpClient.PUT('/api/users/1', { name: 'Bruce' })
   * ```
   */
  PUT<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T> {
    return this.#instance.put(url, data, config)
  }

  /**
   * The method to send a `DELETE` request.
   * @description In order to highlight the method of request, also support the upper case methods.
   * @example
   * ```ts
   * const httpClient = new HttpClient()
   * httpClient.DELETE('/api/users/1')
   * ```
   */
  DELETE<T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T> {
    return this.#instance.delete(url, config)
  }

  /**
   * The method to send a `PATCH` request.
   * @description In order to highlight the method of request, also support the upper case methods.
   * @example
   * ```ts
   * const httpClient = new HttpClient()
   * httpClient.PATCH('/api/users/1', { name: 'Bruce' })
   * ```
   */
  PATCH<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T> {
    return this.#instance.patch(url, data, config)
  }
}
