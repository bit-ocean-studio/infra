import { Lang } from '@bit-ocean/utils'
import { type Callback, createInstance, type InitOptions } from 'i18next'
import { initReactI18next } from 'react-i18next'

import { DEFAULT_NS } from './constants'
import type { I18n } from './types'

class I18nInstance {
  #instance: I18n

  #defaultOptions: InitOptions = {
    load: 'currentOnly',
    lng: Lang['en-US'],
    fallbackLng: Lang['en-US'],
    defaultNS: DEFAULT_NS,
    interpolation: {
      escapeValue: false
    }
  }

  #resources: [string, Record<string, unknown>][] = []

  constructor(options?: InitOptions, callback?: Callback) {
    this.#instance = createInstance({ ...this.#defaultOptions, ...options }, callback) as I18n
    this.#instance.rt = this.#rt
  }

  #rt(key: string = '') {
    return this.#instance.exists(key) ? this.#instance.t(key as any) : key
  }

  getInstance() {
    return this.#instance
  }

  useReactI18next() {
    this.#instance.use(initReactI18next)
    return this
  }

  useResources(resources: [string, Record<string, unknown>][]) {
    this.#resources = resources
    return this
  }

  #loadTrans() {
    this.#resources
      .map<
        [string, string, Record<string, unknown>]
      >(([path, resource]) => [path.replace(/^.*?locales\/resources\//, '').replace(/\/[^/]+$/, ''), path.match(/([^/]+)\.json$/)![1].toUpperCase(), resource])
      .forEach((transItem) => this.#instance.addResourceBundle(...transItem))
    this.#resources = []
  }

  async init(callback?: Callback) {
    await this.#instance.init(callback)
    this.#loadTrans()
    return this.#instance
  }
}

export default I18nInstance
