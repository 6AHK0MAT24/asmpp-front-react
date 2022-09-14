import React, { useEffect, useState } from 'react'
import { reaction } from 'mobx'
import client from 'graphql/apolloClientConfig'
import { ApolloProvider } from '@apollo/client'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ConfigProvider as AntConfigProvider } from 'antd'
import HomePage from 'pages/HomePage'
import AuthPage from 'pages/AuthPage'
import antLocalization from 'localization/antd/antdLocalization'
import antTheme from 'assets/antTheme'
import 'localization/i18n/i18n'
import 'moment/locale/ru'
import store from 'store'
import type { Locale } from 'antd/es/locale-provider'
import './App.scss'
import { ThemeProvider as MUIThemeProvider } from '@mui/material'
import KendoLocalization from 'localization/kendo/KendoLocalization'
import theme from 'assets/themeMUI'

AntConfigProvider.config(antTheme)

function App() {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const [antLocale, setAntLocale] = useState<Locale>(
    antLocalization[store.ui.language]
  )

  useEffect(() => {
    reaction(
      () => store.ui.language,
      () => {
        i18n.changeLanguage(store.ui.language).then()
        setAntLocale(antLocalization[store.ui.language])
      }
    )
  }, [i18n])

  useEffect(() => {
    reaction(
      () => store.api.loggedIn,
      () => {
        if (store.api.loggedIn) {
          const roles = localStorage.getItem('roles')
          store.data.setUserRoles(roles ? roles : undefined)
          navigate(store.data.filterRoutesByRoles[0].path)
        }
        if (!store.api.loggedIn) {
          store.api.setLoggedOut()
        }
      }
    )
  }, [navigate])

  return (
    <KendoLocalization>
      <MUIThemeProvider theme={theme}>
        <AntConfigProvider componentSize="middle" locale={antLocale}>
          <ApolloProvider client={client}>
            {store.api.loggedIn ? <HomePage /> : <AuthPage />}
          </ApolloProvider>
        </AntConfigProvider>
      </MUIThemeProvider>
    </KendoLocalization>
  )
}

export default observer(App)
