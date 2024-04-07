import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'

import type { HttpRequestOptions } from './types'

export class HttpRequest {
  #instance: AxiosInstance

  #BASE_API_PREFIX: string = 'base-api'

  readonly #config: AxiosRequestConfig = {
    timeout: 30_000,
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  }

  constructor(options?: HttpRequestOptions) {
    const { baseAPIPrefix } = options ?? {}
    if (baseAPIPrefix) {
      this.#BASE_API_PREFIX = baseAPIPrefix
    }
    this.#instance = axios.create(this.#config)
  }

  async initInterceptors() {
    await 1
  }

  /**
   * Common request
   * @param config Request config
   */
  async request<T>(config: AxiosRequestConfig): Promise<T> {
    return this.#instance.request(config)
  }

  /**
   * GET method request
   * @param url
   * @param params
   * @param config
   */
  async get<T>(url: string, params?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> {
    return this.#instance.get(url, { params, ...config })
  }

  /**
   * POST method request
   * @param url
   * @param data
   * @param config
   */
  async post<T>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> {
    return this.#instance.post(url, data, config)
  }

  /**
   * PUT method request
   * @param url
   * @param data
   * @param config
   */
  async put<T>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> {
    return this.#instance.put(url, data, config)
  }

  /**
   * DELETE method request
   * @param url
   * @param params
   * @param config
   */
  async delete<T>(
    url: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.#instance.delete(url, { params, ...config })
  }

  /**
   * PATCH method request
   * @param url
   * @param data
   * @param config
   */
  async patch<T>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> {
    return this.#instance.patch(url, data, config)
  }
}
