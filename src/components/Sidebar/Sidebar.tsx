import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { reaction } from 'mobx'
import { useMatch } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from 'components/Navbar/Navbar'
import ListCheckboxes from 'components/ListCheckboxes/ListCheckboxes'
import store from 'store'
import './Sidebar.scss'

const Sidebar: React.FC = () => {
  const isMatch = useMatch('/users')
  const { t } = useTranslation('sidebar')
  const [showLists, setShowLists] = useState(true)
  const [loadingRoutesList, setLoadingRoutesList] = useState(false)
  const [loadingTransportList, setLoadingTransportList] = useState(false)
  const [unset, setUnset] = useState(false)

  const resetCheckboxes = () => {
    setUnset(true)
    store.data.clearTablesData()
    setTimeout(() => setUnset(false), 0)
  }

  useEffect(() => {
    isMatch ? setShowLists(false) : setShowLists(true)
  }, [isMatch])

  useEffect(() => {
    setLoadingRoutesList(true)
    store.api.fetchRoutesList().finally(() => setLoadingRoutesList(false))
  }, [store.api.dateQuery])

  useEffect(() => {
    reaction(
      () => store.api.routes,
      () => {
        if (store.api.routes) {
          setLoadingTransportList(true)
          store.api
            .fetchTransportsList()
            .finally(() => setLoadingTransportList(false))
        }
        if (!store.api.routes) {
          store.data.clearTransportsList()
        }
      }
    )
  }, [])

  useEffect(() => {
    reaction(
      () => !store.api.tsIds,
      () => {
        store.data.clearTablesData()
      }
    )
  }, [])

  return (
    <div className="sidebar">
      <Navbar />
      {showLists && (
        <div className="sidebar__lists">
          <div className="sidebar__half">
            <ListCheckboxes
              loading={loadingRoutesList}
              list={store.data.routesList?.items}
              title={t('routeList')}
              resetCheckboxes={resetCheckboxes}
            />
          </div>
          <div className="sidebar__half">
            <ListCheckboxes
              loading={loadingTransportList}
              list={store.data.transportsList?.items}
              title={t('transport')}
              transport
              unset={unset}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default observer(Sidebar)
