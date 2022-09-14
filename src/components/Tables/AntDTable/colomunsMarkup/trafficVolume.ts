import i18n from 'i18next'
import filterExtension from 'components/Tables/AntDTable/filterExtension'
import type { RefObject } from 'react'
import type { InputRef } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { RouteNumberItem } from 'types/RouteNumber'

const trafficVolume = (
  searchInput: RefObject<InputRef>
): ColumnsType<RouteNumberItem> => [
  {
    title: '№',
    key: 'index',
    align: 'center',
    render: (value, item, index) => index + 1,
    width: '4%',
  },
  {
    title: `${i18n.t('tables:common.route')}`,
    dataIndex: 'routeNumber',
    align: 'center',
    sorter: (a, b) => a.routeNumber.localeCompare(b.routeNumber),
    ...filterExtension('routeNumber', searchInput),
  },
  {
    title: `${i18n.t('tables:trafficVolume.circular')}`,
    dataIndex: 'circular',
    align: 'center',
    sorter: (a, b) => Number(a.circular) - Number(b.circular),
    render: (value) => (value ? 'Да' : 'Нет'),
  },
  {
    title: `${i18n.t('tables:common.weekDays')}`,
    dataIndex: 'dayType',
    align: 'center',
    sorter: (a, b) => a.dayType.localeCompare(b.dayType),
    render: (value) => (value === 'ALL' ? 'Все' : 'Нет'),
  },
  {
    title: `${i18n.t('tables:common.vehicleType')}`,
    dataIndex: 'vehicleType',
    align: 'center',
    render: (value) => (value === null ? 'Н/д' : value),
  },
  {
    title: `${i18n.t('tables:trafficVolume.tripsCount')}`,
    dataIndex: 'tripSize',
    align: 'center',
    sorter: (a, b) => a.tripSize - b.tripSize,
  },
  {
    title: `${i18n.t('tables:trafficVolume.transportationAB')}`,
    dataIndex: 'fwTripTransported',
    align: 'center',
    sorter: (a, b) => a.fwTripTransported - b.fwTripTransported,
  },
  {
    title: `${i18n.t('tables:trafficVolume.transportationBA')}`,
    dataIndex: 'bwTripTransported',
    align: 'center',
    sorter: (a, b) => a.bwTripTransported - b.bwTripTransported,
  },
  {
    title: `${i18n.t('tables:trafficVolume.transportationCommon')}`,
    dataIndex: 'tripsTransported',
    align: 'center',
    sorter: (a, b) => a.tripsTransported - b.tripsTransported,
  },
  {
    title: `${i18n.t('tables:trafficVolume.coeffIrregularity')}`,
    dataIndex: 'unevennessCoeff',
    align: 'center',
    render: (value) => (value === null ? 'Н/д' : value.toFixed(2)),
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

export default trafficVolume
