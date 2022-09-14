import i18n from 'i18next'
import filterExtension from 'components/Tables/AntDTable/filterExtension'
import type { RefObject } from 'react'
import type { InputRef } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { TransportsOnlineItem } from 'types/TransportsOnline'

const transportsOnline = (
  searchInput: RefObject<InputRef>
): ColumnsType<TransportsOnlineItem> => [
  {
    title: '№',
    key: 'index',
    align: 'center',
    render: (value, item, index) => index + 1,
    width: '4%',
  },
  {
    title: `${i18n.t('tables:common.board')}`,
    dataIndex: 'boardNumber',
    align: 'center',
    sorter: (a, b) => a.boardNumber.localeCompare(b.boardNumber),
    ...filterExtension('boardNumber', searchInput),
  },
  {
    title: `${i18n.t('tables:common.modelVehicle')}`,
    dataIndex: 'transportModel',
    align: 'center',
    sorter: (a, b) => a.transportModel.localeCompare(b.transportModel),
    ...filterExtension('transportModel', searchInput),
  },
  {
    title: `${i18n.t('tables:transportLoad.currentRoute')}`,
    dataIndex: 'currentRouteNumber',
    align: 'center',
    sorter: (a, b) => a.currentRouteNumber.localeCompare(b.currentRouteNumber),
  },
  {
    title: `${i18n.t('tables:common.capacity')}`,
    dataIndex: 'cabinCapacity',
    align: 'center',
    sorter: (a, b) => a.cabinCapacity - b.cabinCapacity,
  },
  {
    title: `${i18n.t('tables:common.occupancy')}`,
    dataIndex: 'occupancy',
    align: 'center',
    sorter: (a, b) => a.occupancy - b.occupancy,
  },
  {
    title: `${i18n.t('tables:common.load')}`,
    dataIndex: 'load',
    align: 'center',
    sorter: (a, b) => a.load - b.load,
  },
]

export default transportsOnline
