import i18n from 'i18next'
import type { ColumnsType } from 'antd/es/table'
import type { CategoryItem } from 'types/Category'

const ratioTripsPassengers: ColumnsType<CategoryItem> = [
  {
    title: '№',
    key: 'index',
    align: 'center',
    render: (value, item, index) => index + 1,
    width: '4%',
  },
  {
    title: `${i18n.t('tables:tripsPassengersRatio.tripsCategory')}`,
    dataIndex: 'type',
    align: 'center',
    render: (value) => {
      switch (value) {
        case 'VERY_SMALL':
          return 'Очень малые '
        case 'SMALL':
          return 'Малые '
        case 'BELOW_AVERAGE':
          return 'Ниже среднего'
        case 'AVERAGE':
          return 'Средние'
        case 'ABOVE_AVERAGE':
          return 'Больше среднего '
        case 'LARGE':
          return 'Большие'
        case 'VERY_LARGE':
          return 'Очень большие '
        default:
          return 'Неопределенная категория '
      }
    },
  },
  {
    title: `${i18n.t('tables:common.tripsCount')}`,
    dataIndex: 'trips',
    align: 'center',
    sorter: (a, b) => a.trips - b.trips,
  },
  {
    title: `${i18n.t('tables:tripsPassengersRatio.percentCategory')}`,
    dataIndex: 'percent',
    align: 'center',
    sorter: (a, b) => a.percent - b.percent,
    render: (value) => value + '%',
  },
]

export default ratioTripsPassengers
