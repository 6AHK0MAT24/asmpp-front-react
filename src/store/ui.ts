import { makeAutoObservable } from 'mobx'

export default class Ui {
  loggedIn = !!localStorage.getItem('jwt')
  language: 'ru' | 'en' = 'ru'
  currentPageTitle = ''

  constructor() {
    makeAutoObservable(this)
  }

  setLoggedIn(status: boolean) {
    this.loggedIn = status
  }

  setCurrentPageTitle(title: string) {
    this.currentPageTitle = title
  }

  setLanguage(lang: 'ru' | 'en') {
    this.language = lang
  }
}
