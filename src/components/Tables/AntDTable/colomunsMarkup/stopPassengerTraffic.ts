import filterExtension from 'components/Tables/AntDTable/filterExtension'
import type { RefObject } from 'react'
import type { InputRef } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { TripStationsItem } from 'types/TripStations'
import i18n from 'i18next'

const stopPassengerTraffic = (
  searchInput: RefObject<InputRef>
): ColumnsType<TripStationsItem> => [
  {
    title: '№',
    key: 'index',
    align: 'center',
    render: (value, item, index) => index + 1,
    width: '4%',
  },
  {
    title: `${i18n.t('tables:common.name')}`,
    dataIndex: 'name',
    align: 'center',
    sorter: (a, b) => a.name.localeCompare(b.name),
    width: '20%',
    ...filterExtension('name', searchInput),
  },
  {
    title: `${i18n.t('tables:common.code')}`,
    dataIndex: 'stationId',
    align: 'center',
    sorter: (a, b) => a.stationId - b.stationId,
    width: '5%',
  },
  {
    title: `${i18n.t('tables:common.generalIncome')}`,
    dataIndex: 'generalOutcome',
    align: 'center',
    sorter: (a, b) => a.generalOutcome - b.generalOutcome,
  },
  {
    title: `${i18n.t('tables:common.generalOutcome')}`,
    dataIndex: 'generalIncome',
    align: 'center',
    sorter: (a, b) => a.generalIncome - b.generalIncome,
  },
  {
    title: `${i18n.t('tables:stopPassengerTraffic.averageIncome')}`,
    dataIndex: 'averageIncome',
    align: 'center',
    sorter: (a, b) => a.averageIncome - b.averageIncome,
  },
  {
    title: `${i18n.t('tables:stopPassengerTraffic.averageOutcome')}`,
    dataIndex: 'averageOutcome',
    align: 'center',
    sorter: (a, b) => a.averageOutcome - b.averageOutcome,
  },
  {
    title: `${i18n.t('tables:common.averageOccupancy')}`,
    dataIndex: 'averageOccupancy',
    align: 'center',
    sorter: (a, b) => a.averageOccupancy - b.averageOccupancy,
  },
  {
    title: `${i18n.t('tables:common.maxLoad')}`,
    dataIndex: 'maxLoad',
    align: 'center',
    sorter: (a, b) => a.maxLoad - b.maxLoad,
    render: (value) => `${value}%`,
  },
]

export default stopPassengerTraffic
