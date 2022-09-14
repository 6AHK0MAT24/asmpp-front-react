import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Header from 'components/Header/Header'
import Sidebar from 'components/Sidebar/Sidebar'
import Loading from 'components/Loading/Loading'
import ContentTemplate from 'components/ContentTemplate/ContentTemplate'
import AllRoutes from 'routes/AllRoutes'
import routes from 'routes/routes'
import store from 'store'
import { observer } from 'mobx-react-lite'

const HomePage: React.FC = () => {
  const { t } = useTranslation('pages')
  const { pathname } = useLocation()

  useEffect(() => {
    const roles = localStorage.getItem('roles')
    store.data.setUserRoles(roles ? roles : undefined)
  }, [])

  useEffect(() => {
    routes.filter(
      (item) =>
        item.path === pathname &&
        store.ui.setCurrentPageTitle(
          t(item.title as unknown as TemplateStringsArray)
        )
    )
  }, [pathname, t])
  return (
    <>
      {/* TODO перенести в темплейт все */}
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <ContentTemplate>
          {store.data.userRoles ? <AllRoutes /> : <Loading />}
        </ContentTemplate>
      </div>
    </>
  )
}

export default observer(HomePage)
