import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dropdown, Menu } from 'antd'
import type { ItemType } from 'antd/es/menu/hooks/useItems'

interface HeaderDropdownProps {
  items: ItemType[]
  menuClickHandler: (id: any) => void
  type: 'direction' | 'dayType' | 'timezone'
}

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({
  items,
  menuClickHandler,
  type,
}) => {
  const { t } = useTranslation()
  const [timeZone, setTimeZone] = useState(3)
  const defaultSelectedKeys = items
    ? [items[type === 'timezone' ? 1 : 0]?.key as string]
    : []

  const handleMenuClick = (e: any) => {
    setTimeZone(e.key)
    menuClickHandler(e.key)
  }

  return (
    <Dropdown.Button
      overlay={
        <Menu
          onClick={handleMenuClick}
          selectable
          items={items}
          defaultSelectedKeys={defaultSelectedKeys}
        />
      }
    >
      {type === 'dayType' && t('dayType')}
      {type === 'direction' && t('direction')}
      {type === 'timezone' && `GMT +${timeZone}`}
    </Dropdown.Button>
  )
}

export default HeaderDropdown
