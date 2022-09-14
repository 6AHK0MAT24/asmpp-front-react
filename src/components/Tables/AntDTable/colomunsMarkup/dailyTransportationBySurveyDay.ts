import i18n from 'i18next'
import type { RefObject } from 'react'
import type { DaysItem } from 'types/Days'
import type { InputRef } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import filterExtension from '../filterExtension'
import { parseMsToDate } from 'utils/parseMsToDateTime'
import store from 'store'

const dailyTransportationBySurveyDay = (
  searchInput: RefObject<InputRef>
): ColumnsType<DaysItem> => [
  {
    title: '№',
    key: 'index',
    align: 'center',
    render: (value, item, index) => index + 1,
    width: '4%',
  },
  {
    align: 'center',
    dataIndex: 'startDate',
    title: `${i18n.t('tables:common.date')}`,
    sorter: (a, b) => a.startDate - b.startDate,
    ...filterExtension('startDate', searchInput),
    // TODO заново изобретать смену часовых поясов
    render: (value) => parseMsToDate(value, store.api.utcOffset),
  },
  {
    align: 'center',
    dataIndex: 'dayOfWeek',
    title: `${i18n.t('tables:common.weekDays')}`,
    sorter: (a, b) => a.dayOfWeek.localeCompare(b.dayOfWeek),
    ...filterExtension('dayOfWeek', searchInput),
    render: (value) => {
      switch (value) {
        case 'MONDAY':
          return 'Понедельник'
        case 'TUESDAY':
          return 'Вторник'
        case 'WEDNESDAY':
          return 'Среда'
        case 'THURSDAY':
          return 'Четверг'
        case 'FRIDAY':
          return 'Пятница'
        case 'SATURDAY':
          return 'Суббота'
        case 'SUNDAY':
          return 'Воскресенье'
        default:
          return 'Н/Д'
      }
    },
  },
  {
    align: 'center',
    dataIndex: 'tripSize',
    title: `${i18n.t('tables:common.tripsCount')}`,
    sorter: (a, b) => a.tripSize - b.tripSize,
  },
  {
    align: 'center',
    dataIndex: 'transported',
    title: `${i18n.t('tables:dailyTransportation.transportedTotal')}`,
    sorter: (a, b) => a.transported - b.transported,
  },
  {
    align: 'center',
    dataIndex: 'transportedAverage',
    title: `${i18n.t('tables:dailyTransportation.transportedAverage')}`,
    sorter: (a, b) => a.transportedAverage - b.transportedAverage,
  },
  {
    align: 'center',
    dataIndex: 'passPerHour',
    title: `${i18n.t('tables:common.passHour')}`,
    sorter: (a, b) => a.passPerHour - b.passPerHour,
  },
  {
    align: 'center',
    dataIndex: 'passPerKm',
    title: `${i18n.t('tables:common.passKm')}`,
    sorter: (a, b) => a.passPerKm - b.passPerKm,
  },
]

export default dailyTransportationBySurveyDay
