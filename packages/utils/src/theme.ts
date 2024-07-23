import { Theme } from '@/enums'

/**
 * 主题工具类
 * @summary 支持暗黑模式
 * @author Bruce Song <recall4056@gmail.com>
 * @license MIT
 */
export class ThemeUtils {
  /**
   * 主题存储键名
   * @description 用于存储主题到 `localStorage` 中的键名
   * @default "theme"
   */
  static readonly #THEME_KEY = 'theme'

  /**
   * 获取主题
   * @description 获取 `localStorage` 中存储的主题
   * @returns `localStorage` 中存储的主题
   * @example
   * ```ts
   * const theme = ThemeUtils.getTheme()
   * ```
   */
  static getTheme(): string | null {
    return localStorage.getItem(this.#THEME_KEY)
  }

  /**
   * 设置主题
   * @description 设置 `localStorage` 中存储的主题
   * @param theme - 主题
   * @example
   * ```ts
   * ThemeUtils.setTheme(Theme.LIGHT)
   * ThemeUtils.setTheme(Theme.DARK)
   * ```
   */
  static setTheme(theme: string) {
    localStorage.setItem(this.#THEME_KEY, theme)
  }

  /**
   * 清除主题
   * @description 清除 `localStorage` 中存储的主题
   * @example
   * ```ts
   * ThemeUtils.clearTheme()
   * ```
   */
  static clearTheme() {
    localStorage.removeItem(this.#THEME_KEY)
  }

  /**
   * 获取默认主题
   * @description 从 `localStorage` 中读取主题，如果没有读取到，则根据系统主题设置返回默认主题
   * @returns 默认主题
   * @example
   * ```ts
   * const theme = ThemeUtils.getDefaultTheme()
   * ```
   */
  static getDefaultTheme(): Theme {
    if (
      this.getTheme() === Theme.DARK ||
      (!this.getTheme() && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      return Theme.DARK
    }
    return Theme.LIGHT
  }

  /**
   * 切换主题
   * @description
   * - 切换主题模式时，会自动添加或移除 document 上 `dark` 类名
   * - 将主题模式存储到 `localStorage` 中，以便下次打开页面时读取
   * @param theme  - 主题
   * @example
   * ```ts
   * ThemeUtils.changeTheme(Theme.DARK)
   * ThemeUtils.changeTheme(Theme.LIGHT)
   * ```
   */
  static changeTheme(theme: Theme) {
    if (theme === Theme.DARK || theme === Theme.LIGHT) {
      document.documentElement.setAttribute('data-theme', theme)
      ThemeUtils.setTheme(theme)
    }
    if (theme === Theme.DARK) {
      document.documentElement.classList.add(Theme.DARK)
    } else if (theme === Theme.LIGHT) {
      document.documentElement.classList.remove(Theme.DARK)
    }
  }
}
