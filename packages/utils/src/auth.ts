/**
 * 认证工具类
 * @summary 用于处理登录认证相关的逻辑
 * @author Bruce Song <recall4056@gmail.com>
 * @license MIT
 */
export class AuthUtils {
  /**
   * 访问令牌存储键名
   * @default "access_token"
   */
  static readonly #ACCESS_TOKEN_KEY = 'access_token'

  /**
   * 刷新令牌存储键名
   * @default "refresh_token"
   */
  static readonly #REFRESH_TOKEN_KEY = 'refresh_token'

  /**
   * 记住密码相关信息存储键名
   * @default "remember_account_data"
   */
  static readonly #REMEMBERED_ACCOUNT_KEY = 'remember_account_data'

  /**
   * 默认管理员用户名
   * @description 用于内置管理员角色登录的用户名
   * @default "admin"
   */
  static readonly DEFAULT_ADMIN_USERNAME = 'admin'

  /**
   * 默认管理员密码
   * @description 用于内置管理员角色登录的密码
   * @default "admin"
   */
  static readonly DEFAULT_ADMIN_PASSWORD = '123456'

  /**
   * 获取访问令牌
   * @description 获取 `localStorage` 中存储的访问令牌
   * @returns `localStorage` 中存储的访问令牌
   * @example
   * ```ts
   * AuthUtils.getAccessToken()
   * ```
   */
  static getAccessToken(): string {
    return localStorage.getItem(this.#ACCESS_TOKEN_KEY) ?? ''
  }

  /**
   * 获取 authorization
   * @description 拼接访问令牌，格式如：`Bearer` + `accessToken`
   * @param prefix - 前缀，默认为 `Bearer`
   * @returns 访问令牌
   * @example
   * ```ts
   * AuthUtils.getAuthorization() // 默认是 Bearer 开头
   * AuthUtils.getAuthorization("Basic") // 自定义前缀
   * ```
   */
  static getAuthorization(prefix: string = 'Bearer') {
    return `${prefix} ${this.getAccessToken()}`
  }

  /**
   * 设置访问令牌
   * @description 设置 `localStorage` 中存储的访问令牌
   * @param token - 访问令牌
   * @example
   * ```ts
   * AuthUtils.setAccessToken("xxx")
   * ```
   */
  static setAccessToken(token: string) {
    localStorage.setItem(this.#ACCESS_TOKEN_KEY, token)
  }

  /**
   * 清除访问令牌
   * @description 清除 `localStorage` 中存储的访问令牌
   * @example
   * ```ts
   * AuthUtils.clearAccessToken()
   * ```
   */
  static clearAccessToken() {
    localStorage.removeItem(this.#ACCESS_TOKEN_KEY)
  }

  /**
   * 获取刷新令牌
   * @description 获取 `localStorage` 中存储的刷新令牌
   * @returns `localStorage` 中存储的刷新令牌
   * @example
   * ```ts
   * AuthUtils.getRefreshToken()
   * ```
   */
  static getRefreshToken(): string {
    return localStorage.getItem(this.#REFRESH_TOKEN_KEY) ?? ''
  }

  /**
   * 设置刷新令牌
   * @description 设置 `localStorage` 中存储的刷新令牌
   * @param token - 刷新令牌
   * @example
   * ```ts
   * AuthUtils.setRefreshToken("xxx")
   * ```
   */
  static setRefreshToken(token: string) {
    localStorage.setItem(this.#REFRESH_TOKEN_KEY, token)
  }

  /**
   * 清除刷新令牌
   * @description 清除 `localStorage` 中存储的刷新令牌
   * @example
   * ```ts
   * AuthUtils.clearRefreshToken()
   * ```
   */
  static clearRefreshToken() {
    localStorage.removeItem(this.#REFRESH_TOKEN_KEY)
  }

  /**
   * 判断当前是否已经登录
   * @description 根据是否存在访问令牌，判断当前是否处于登录状态
   * @returns 是否已经登录
   * @example
   * ```ts
   * AuthUtils.isAuthenticated()
   * ```
   */
  static isAuthenticated(): boolean {
    return !!localStorage.getItem(this.#ACCESS_TOKEN_KEY)
  }

  /**
   * 获取记住密码的账号密码
   * @description 用于登录页记住密码功能
   * @returns 记住密码的账号密码
   * @example
   * ```ts
   * JSON.parse(AuthUtils.getRememberedAccount() ?? '')
   * ```
   */
  static getRememberedAccount(): string | null {
    return localStorage.getItem(this.#REMEMBERED_ACCOUNT_KEY)
  }

  /**
   * 设置记住密码的账号密码
   * @description 设置 `localStorage` 中存储的与记住密码相关的信息
   * @param data - 序列化后的记住密码的信息
   * @example
   * ```ts
   * AuthUtils.setRememberedAccount(JSON.stringify({
   *    username: "xxx",
   *    password: "xxx",
   *  })
   * )
   * ```
   */
  static setRememberedAccount(data: string) {
    localStorage.setItem(this.#REMEMBERED_ACCOUNT_KEY, data)
  }

  /**
   * 清除记住密码的账号密码
   * @description  清除 `localStorage` 中存储的与记住密码相关的信息
   * @example
   * ```ts
   * AuthUtils.clearRememberedAccount()
   * ```
   */
  static clearRememberedAccount() {
    localStorage.removeItem(this.#REMEMBERED_ACCOUNT_KEY)
  }
}
