/**
 * 国际化工具类
 * @summary 用于处理国际化相关的逻辑
 * @author Bruce Song <recall4056@gmail.com>
 * @license MIT
 */
export class I18nUtils {
  /**
   * 获取未知情况的多语言文本
   * @param text - 字符串、多语言文本函数
   * @example
   * ```ts
   * const i18nString = ()=> t("Hello, World!")
   * const text = I18nUtils.getText(i18nString)
   * ```
   */
  static getText(text?: string | (() => string)) {
    if (!text) {
      return ''
    }
    return typeof text === 'function' ? text() : text
  }
}
