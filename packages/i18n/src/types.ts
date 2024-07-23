import type { i18n } from 'i18next'

export interface I18n extends i18n {
  rt: (key: string) => string
}

export interface LocaleResource {
  ns: string
  resources: Record<string, string>
}
