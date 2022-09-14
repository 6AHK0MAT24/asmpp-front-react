import ParseCell from 'components/Tables/KendoTable/Cells/ParseCell'
import type { ColumnInterface } from 'components/Tables/KendoTable/KendoTable'
import i18n from 'i18next'

const tripsDetailsByStops: ColumnInterface[] = [
  {
    field: 'id',
    title: '№',
    width: 60,
  },
  {
    field: 'name',
    title: `${i18n.t('tables:common.name')}`,
    filter: 'text',
  },
  {
    field: 'timestamp',
    title: `${i18n.t('tables:tripsDetailsByStops.factDeparture')}`,
    cell: ParseCell,
  },
  {
    field: 'income',
    title: `${i18n.t('tables:common.generalIncome')}`,
    filter: 'numeric',
  },
  {
    field: 'outcome',
    title: `${i18n.t('tables:common.generalOutcome')}`,
    filter: 'numeric',
  },
  {
    field: 'occupancy',
    title: `${i18n.t('tables:common.occupancy')}`,
    filter: 'numeric',
  },
  {
    field: 'load',
    title: `${i18n.t('tables:common.load')}`,
    filter: 'numeric',
  },
]

export default tripsDetailsByStops.map((item) => ({ ...item, show: true }))
