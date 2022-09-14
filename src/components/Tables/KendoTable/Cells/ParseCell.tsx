import React, { useEffect, useState } from 'react'
import { reaction } from 'mobx'
import { useLocation } from 'react-router-dom'
import parseMsToHours from 'utils/parseMsToHours'
import { parseMsToDate, parseMsToTime } from 'utils/parseMsToDateTime'
import type { GridCellProps } from '@progress/kendo-react-grid'
import store from 'store'

const ParseCell = (props: GridCellProps) => {
  const { pathname } = useLocation()
  const [data, setData] = useState('')
  const field = props.field || ''
  const value = props.dataItem[field]

  useEffect(() => {
    const parseDateWithOffset = () => {
      if (pathname === '/dailyTransportation') {
        setData(parseMsToDate(value, store.api.utcOffset))
      }
      if (field.includes('Date')) {
        setData(
          parseMsToTime(value, store.api.utcOffset) +
            ' ' +
            parseMsToDate(value, store.api.utcOffset)
        )
      }
    }
    if (field.includes('duration')) {
      setData(parseMsToHours(value))
    }
    if (field.includes('timestamp')) {
      setData(parseMsToTime(value))
    }

    parseDateWithOffset()

    return reaction(
      () => store.api.utcOffset,
      () => parseDateWithOffset()
    )
  }, [field, pathname, value])

  return <td>{data}</td>
}

export default ParseCell
