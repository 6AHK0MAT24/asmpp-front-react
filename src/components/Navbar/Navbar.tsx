import React from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import NavElement from 'components/NavElement/NavElement'
import store from 'store'
import './Navbar.scss'

const Navbar: React.FC = () => {
  const { t } = useTranslation('pages')
  return (
    <>
      {store.data.filterRoutesByRoles.length > 1 && (
        <nav className="navbar">
          {store.data.filterRoutesByRoles.map((route) => (
            <NavElement
              key={route.path}
              path={route.path}
              title={t(route.title as unknown as TemplateStringsArray)}
              content={<route.navbarIcon />}
            />
          ))}
        </nav>
      )}
    </>
  )
}

export default observer(Navbar)
