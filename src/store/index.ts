import { configure } from 'mobx'
import Api from 'store/api'
import Data from 'store/data'
import Ui from 'store/ui'

class Store {
  api: Api
  data: Data
  ui: Ui

  constructor() {
    this.api = new Api(this)
    this.data = new Data()
    this.ui = new Ui()
  }
}

const store = new Store()

export default store

configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  disableErrorBoundaries: true,
})
