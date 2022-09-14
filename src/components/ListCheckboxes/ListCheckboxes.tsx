import React, { useEffect, useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Checkbox, Typography } from '@mui/material'
import { MapOutlined, DirectionsBus } from '@mui/icons-material'
import { Input } from 'antd'
import Loading from 'components/Loading/Loading'
import type { TransportsItem } from 'types/Transports'
import type { RoutesItem } from 'types/Routes'
import store from 'store'
import './ListCheckboxes.scss'

interface OLCheckboxesProps {
  title: string
  transport?: boolean
  list?: RoutesItem[] | TransportsItem[]
  resetCheckboxes?: () => void
  unset?: boolean
  loading?: boolean
}

const ListCheckboxes: React.FC<OLCheckboxesProps> = ({
  transport = false,
  title,
  list = [],
  resetCheckboxes,
  unset,
  loading,
}) => {
  const [checked, setChecked] = useState<number[]>([])
  const [keyword, setKeyword] = useState('')
  const isAllSelected = list.length > 0 && checked?.length === list.length

  const setRequestString = (checked: number[]) => {
    if (list?.length) {
      if (!transport) {
        store.api.setRoutes(
          checked
            .map((item) => (list[item] as RoutesItem).routeNumber)
            .join(',')
        )
      }
      if (transport) {
        store.api.setTsIds(
          checked.map((item) => (list[item] as TransportsItem).id).join(',')
        )
      }
    }
  }

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]
    currentIndex === -1
      ? newChecked.push(value)
      : newChecked.splice(currentIndex, 1)
    setChecked(newChecked)
  }

  useEffect(() => {
    checked && setRequestString(checked)
    resetCheckboxes && resetCheckboxes()
    if (transport && unset) {
      setChecked([])
    }
  }, [checked, unset])

  useEffect(() => {
    if (!store.data.routesList?.items.length) {
      setChecked([])
      store.api.clearRoutesTsIdsQuery()
    }
  }, [store.data.routesList])

  const handleClickAll = () => {
    checked.length === list.length
      ? setChecked([])
      : setChecked([...Array(list.length).keys()])
  }
  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) =>
    setKeyword(event.target.value)

  const filterList = (
    list: (RoutesItem | TransportsItem)[]
  ): (RoutesItem | TransportsItem)[] => {
    return list.filter((item: RoutesItem | TransportsItem) =>
      (transport
        ? (item as TransportsItem).boardNumber
        : (item as RoutesItem).routeNumber
      ).includes(keyword.trim())
    )
  }
  return (
    <List className="list-checkboxes" disablePadding>
      <div className="list-checkboxes__title">
        <Input
          bordered={false}
          placeholder={title}
          value={keyword}
          onChange={handleFilter}
        />
        <Checkbox
          edge="end"
          checked={isAllSelected}
          indeterminate={checked?.length > 0 && checked.length < list.length}
          onClick={handleClickAll}
        />
      </div>
      {!loading ? (
        filterList(list).map((item: RoutesItem | TransportsItem, index) => {
          return (
            <ListItem key={item.id} disablePadding>
              <ListItemButton onClick={handleToggle(index)} dense>
                <ListItemText primaryTypographyProps={{ fontWeight: 500 }}>
                  <div className="list-checkboxes__list-item">
                    <Typography variant="caption">{index + 1}</Typography>
                    <ListItemIcon
                      style={{ minWidth: 'inherit', marginRight: 16 }}
                    >
                      {transport ? (
                        <DirectionsBus fontSize={'small'} />
                      ) : (
                        <MapOutlined fontSize={'small'} />
                      )}
                    </ListItemIcon>
                    {transport
                      ? (item as TransportsItem).boardNumber
                      : (item as RoutesItem).routeNumber}
                  </div>
                </ListItemText>
                <Checkbox
                  edge="end"
                  checked={checked.includes(index)}
                  disableRipple
                />
              </ListItemButton>
            </ListItem>
          )
        })
      ) : (
        <Loading />
      )}
    </List>
  )
}

export default ListCheckboxes
