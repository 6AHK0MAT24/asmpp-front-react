import React from 'react'
import type { ColumnInterface } from 'components/Tables/KendoTable/KendoTable'
import type { GridFooterCellProps } from '@progress/kendo-react-grid'
import type { TransportAmount } from 'types/Transport'
import i18n from 'i18next'
import store from 'store'

const loadRollingStock: ColumnInterface[] = [
  {
    field: 'transportId',
    title: '№',
    width: 60,
  },
  {
    field: 'boardNumber',
    title: `${i18n.t('tables:common.board')}`,
    filter: 'text',
  },
  {
    field: 'model',
    title: `${i18n.t('tables:common.modelVehicle')}`,
    filter: 'text',
  },
  {
    field: 'transported',
    title: `${i18n.t('tables:common.transported')}`,
    filter: 'numeric',
  },
  {
    field: 'passPerHour',
    title: `${i18n.t('tables:common.passHour')}`,
    filter: 'numeric',
  },
  {
    field: 'passPerKm',
    title: `${i18n.t('tables:common.passKm')}`,
    filter: 'numeric',
  },
  {
    field: 'cabinCapacity',
    title: `${i18n.t('tables:common.capacity')}`,
    filter: 'numeric',
  },
  {
    field: 'averageOccupancy',
    title: `${i18n.t('tables:common.averageOccupancy')}`,
    filter: 'numeric',
  },
  {
    field: 'averageLoad',
    title: `${i18n.t('tables:rollingStockLoad.averageLoad')}`,
    filter: 'numeric',
  },
]

export default loadRollingStock.map((item) => ({
  ...item,
  show: true,
  footerCell: (props: GridFooterCellProps) => (
    <td>
      {store.data.transportData?.amount[props.field as keyof TransportAmount]}
    </td>
  ),
}))
