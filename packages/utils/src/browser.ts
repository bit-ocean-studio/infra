import type { ScrollOptions } from '@/types'

/**
 * 浏览器工具类
 * @summary 浏览器环境中的工具方法
 * @author Bruce Song <recall4056@gmail.com>
 * @license MIT
 */
export class BrowserUtils {
  /**
   * 打开新窗口
   * @param url 目标地址 URL
   * @example
   * ```ts
   * BrowserUtils.openNewWindow("https://github.com/recallwei")
   * ```
   */
  static openNewWindow(url: string) {
    const w: Window | null = window.open('about:blank')
    if (w) {
      w.opener = null
      w.location.href = url
    }
  }

  /**
   * 获取发送邮件的链接
   * @param email 邮箱地址
   * @example
   * ```ts
   * BrowserUtils.getEmailLink("recall4056@gmail.com")
   * ```
   */
  static getEmailLink(email: string) {
    return `mailto:${email}`
  }

  /**
   * 复制到剪切板
   * @param text 需要复制的文本
   * @
   * @example
   * ```ts
   * const copy = async (text: string) => {
   *   try {
   *     await BrowserUtils.getClipBoardText(text)
   *   } catch {
   *   //
   *   }
   * }
   * ```
   */
  static async setClipBoardText(text: string): Promise<void> {
    if (window.isSecureContext && navigator.clipboard) {
      await navigator.clipboard.writeText(text)
      return
    }
    this.#unsecuredCopyToClipboard(text)
  }

  /**
   * 从剪切板获取文本【不安全】
   * @param text 需要复制的文本
   * @description 仅在 http 环境下使用
   * @deprecated
   * @see https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
   */
  static #unsecuredCopyToClipboard(text: string) {
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.top = '0'
    textArea.style.left = '0'
    textArea.style.position = 'fixed'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }

  /**
   * 下载文件
   * @param url 文件地址
   * @param fileName 下载后的文件名
   * @example
   * ```ts
   * BrowserUtils.downloadFile("FILE_URL", "FILE_NAME")
   * ```
   */
  static downloadFile(url: string, fileName: string) {
    const aElement = document.createElement('a')
    aElement.href = url
    aElement.setAttribute('download', fileName)
    aElement.click()
  }

  /**
   * 根据站点元数据动态加载 favicon
   * @description 默认使用 /favicon.ico
   * @example
   * ```ts
   * BrowserUtils.loadFavicon()
   * ```
   */
  static loadFavicon(url?: string) {
    const faviconUrl = url ?? '/favicon.ico'

    let faviconElement = document.querySelector('link[rel="icon"]') as HTMLLinkElement

    if (faviconElement !== null) {
      faviconElement.href = faviconUrl
    } else {
      faviconElement = document.createElement('link')
      faviconElement.rel = 'icon'
      faviconElement.href = faviconUrl
      document.head.appendChild(faviconElement)
    }
  }

  /**
   * 禁止手势缩放
   * @description 该方法用于禁止移动端手势缩放，以提高更好的用户体验。适配 Web 手机端页面，在页面初始化的时候调用即可。
   * @example
   * ```ts
   * BrowserUtils.disableGestureScale()
   * ```
   */
  static disableGestureScale() {
    document.addEventListener(
      'gesturestart',
      (event) => {
        event.preventDefault()
      },
      false
    )
    let lastTouchEnd = 0
    document.documentElement.addEventListener(
      'touchend',
      (event) => {
        const now = Date.now()
        if (now - lastTouchEnd <= 300) {
          event.preventDefault()
        }
        lastTouchEnd = now
      },
      false
    )
    document.addEventListener('gesturestart', (event) => {
      event.preventDefault()
    })
  }

  /**
   * 解决 Naive UI 样式冲突问题
   * @description 注意：需要在挂载 App 之前调用
   * @example
   * ```ts
   * BrowserUtils.resolveNaiveStyle()
   * @see {@link [Naive UI - 样式冲突](https://www.naiveui.com/en-US/os-theme/docs/style-conflict)}
   */
  static resolveNaiveStyle() {
    const meta = document.createElement('meta')
    meta.name = 'naive-ui-style'
    document.head.appendChild(meta)
  }

  /**
   * 判定是否是移动端
   * @description 响应式请使用 useMediaQuery
   * @returns 是否是移动端
   * @example
   * ```ts
   * const isMobile = BrowserUtils.isMobile()
   * ```
   */
  static isMobile(): boolean {
    return window.matchMedia('only screen and (max-width: 640px)').matches
  }

  /**
   * 平滑滚动
   * @description 借助 requestAnimationFrame 实现平滑滚动
   * @param scrollOptions 滚动配置项
   * @returns requestAnimationFrame 的 id
   * @example
   * ```ts
   * let animationFrameId: number | null = null
   * animationFrameId = BrowserUtils.smoothScroll({
   *   element: document.body,
   *   target: 0,
   *   duration: 200,
   *   animationFrameId
   * })
   * ```
   */
  static smoothScroll(scrollOptions: ScrollOptions): number | null {
    const startTime = performance.now()
    const start = scrollOptions.element.scrollLeft
    const distance = scrollOptions.target - start

    let currentFrameId: number | null = null

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / (scrollOptions.duration ?? 200), 1)
      // eslint-disable-next-line no-param-reassign
      scrollOptions.element.scrollLeft = start + distance * progress

      if (!scrollOptions.animationFrameId) {
        if (progress < 1) {
          requestAnimationFrame(step)
        }
      } else if (progress < 1) {
        currentFrameId = requestAnimationFrame(step)
      } else {
        currentFrameId = null
      }
    }

    requestAnimationFrame(step)
    return currentFrameId
  }
}
