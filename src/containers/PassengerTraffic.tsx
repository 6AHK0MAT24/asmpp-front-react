import React, { useMemo, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import AntDTable from 'components/Tables/AntDTable/AntDTable'
import DownloadButton from 'components/DownloadButton/DownloadButton'
import filterExtension from 'components/Tables/AntDTable/filterExtension'
import useFetchTable from 'hooks/useFetchTable'
import type { InputRef } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { HoursItem } from 'types/Hours'
import store from 'store'

const PassengerTraffic: React.FC = () => {
  const { t } = useTranslation('tables')
  const loading = useFetchTable(store.api.fetchHoursData)
  const searchInput = useRef<InputRef>(null)

  const addHoursColumns = (columns: ColumnsType<HoursItem>) => {
    for (let i = 0; i < 24; i++) {
      columns.push({
        dataIndex: ['passengersByHour', i],
        title: `${i < 10 ? '0' : ''}${i}:00 
      - 
      ${i < 9 ? '0' : ''}${i === 23 ? '00' : i + 1}:00`,
      })
    }
    return columns
  }

  const memoizedColumns = useMemo(
    () =>
      addHoursColumns([
        {
          align: 'center',
          dataIndex: 'key',
          title: '№',
          width: '4%',
        },
        {
          align: 'center',
          dataIndex: 'name',
          title: `${t('common.name')}`,
          width: 160,
          ...filterExtension('name', searchInput),
        },
        {
          align: 'center',
          dataIndex: 'direction',
          title: `${t('common.code')}`,
          width: 80,
        },
      ]),
    [t]
  )

  return (
    <>
      <DownloadButton
        fetchReportFunction={store.api.fetchDownloadHours}
        disabledButton={!store.data.hoursData}
      />
      <AntDTable
        loading={loading}
        data={store.data.hoursData}
        columns={memoizedColumns}
      />
    </>
  )
}

export default observer(PassengerTraffic)
