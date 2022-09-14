import ru from 'localization/i18n/locales/ru.json'

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: typeof ru
  }
}
