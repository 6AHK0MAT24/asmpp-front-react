import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useMatch } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Typography, Button } from 'antd'
import HeaderCalendar from 'components/HeaderCalendar/HeaderCalendar'
import HeaderDropdown from 'components/HeaderDropdown/HeaderDropdown'
import { MenuOutlined } from '@mui/icons-material'
import {
  dayTypes,
  directions,
  timeZones,
} from 'components/Header/dropdownsData'
import store from 'store'
import './Header.scss'

const Header: React.FC = () => {
  const { t } = useTranslation()
  const isMatch = useMatch('/users')
  const [showControls, setShowControls] = useState(true)

  useEffect(() => {
    isMatch ? setShowControls(false) : setShowControls(true)
  }, [isMatch])

  const handleLogOut = () => store.api.setLoggedOut()
  const handleSwapLang = () =>
    store.ui.setLanguage(store.ui.language === 'ru' ? 'en' : 'ru')

  return (
    <div className="header">
      {showControls && (
        <div className="header__controls">
          <span className="header__navbar-icon">
            <Button
              icon={<MenuOutlined />}
              size={'large'}
              style={{ visibility: 'hidden' }}
            />
          </span>
          <HeaderCalendar />
          <div className="header__dropdown header__dropdown-timezone">
            <HeaderDropdown
              type={'timezone'}
              items={timeZones}
              menuClickHandler={store.api.setUtcOffset}
            />
          </div>
          <div className="header__dropdown">
            <HeaderDropdown
              type={'direction'}
              items={directions}
              menuClickHandler={store.api.setDirectionId}
            />
          </div>
          <div className="header__dropdown">
            <HeaderDropdown
              type={'dayType'}
              items={dayTypes}
              menuClickHandler={store.api.setDayType}
            />
          </div>
          <div className="header__button">
            <Button onClick={handleSwapLang}>
              {store.ui.language.toUpperCase()}
            </Button>
          </div>
        </div>
      )}
      <Typography.Title
        level={5}
        className={
          showControls
            ? 'header__title'
            : 'header__title header__title_centered'
        }
      >
        {store.ui.currentPageTitle}
      </Typography.Title>
      <div className="header__button">
        <Button onClick={handleLogOut}>{t('logout')}</Button>
      </div>
    </div>
  )
}

export default observer(Header)
