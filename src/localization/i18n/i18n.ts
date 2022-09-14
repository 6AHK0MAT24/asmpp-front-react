import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ru from './locales/ru.json'
import en from './locales/en.json'

i18n
  .use(initReactI18next)
  .init({
    lng: 'ru',
    fallbackLng: ['ru', 'en'],
    defaultNS: 'common',
    resources: {
      ru,
      en,
    },
  })
  .then()

export default i18n
