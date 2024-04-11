import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'

import type { HttpRequestOptions } from './types'

export class HttpRequest {
  #instance: AxiosInstance

  #config: AxiosRequestConfig = {
    timeout: 30_000,
    withCredentials: false,
    headers: { 'Content-Type': 'application/json;charset=utf-8' }
  }

  constructor(httpRequestOptions?: HttpRequestOptions) {
    const { baseURL } = httpRequestOptions ?? {}
    this.#instance = axios.create({ ...this.#config, baseURL })
  }

  /**
   * 通用请求
   * @param config 请求配置
   */
  async request<T>(config: AxiosRequestConfig): Promise<T> {
    return this.#instance.request(config)
  }

  /**
   * GET 请求
   * @param url 请求地址
   * @param params 请求参数
   * @param config 请求配置
   */
  async get<T>(url: string, params?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> {
    return this.#instance.get(url, { params, ...config })
  }

  /**
   * POST 请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   */
  async post<T>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> {
    return this.#instance.post(url, data, config)
  }

  /**
   * PUT 请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   */
  put<T>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> {
    return this.#instance.put(url, data, config)
  }

  /**
   * DELETE 请求
   * @param url 请求地址
   * @param params 请求参数
   * @param config 请求配置
   */
  delete<T>(url: string, params?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> {
    return this.#instance.delete(url, { params, ...config })
  }

  /**
   * PATCH 请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   */
  patch<T>(url: string, data?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> {
    return this.#instance.patch(url, data, config)
  }
}
