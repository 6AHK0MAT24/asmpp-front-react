import React from 'react'
import ParseCell from 'components/Tables/KendoTable/Cells/ParseCell'
import type { ColumnInterface } from 'components/Tables/KendoTable/KendoTable'
import type { GridFooterCellProps } from '@progress/kendo-react-grid'
import type { TripsAmount } from 'types/Trips'
import store from 'store'
import i18n from 'i18next'

const tripsDuringPeriod: ColumnInterface[] = [
  {
    field: 'tripSpecificId',
    title: '№',
    width: 60,
  },
  {
    field: 'boardNumber',
    title: `${i18n.t('tables:common.board')}`,
    filter: 'text',
    width: 79,
  },
  {
    field: 'routeNumber',
    title: `${i18n.t('tables:common.route')}`,
    filter: 'text',
    width: 100,
  },
  {
    field: 'typeTransport',
    title: `${i18n.t('tables:common.vehicleType')}`,
    filter: 'text',
  },
  {
    field: 'direction',
    title: `${i18n.t('tables:tripsDuringPeriod.direction')}`,
    filter: 'numeric',
    width: 140,
  },
  {
    field: 'startDate',
    title: `${i18n.t('tables:tripsDuringPeriod.tripStart')}`,
    filter: 'date',
    cell: ParseCell,
  },
  {
    field: 'finishDate',
    title: `${i18n.t('tables:tripsDuringPeriod.tripsFinish')}`,
    filter: 'date',
    cell: ParseCell,
  },
  {
    field: 'duration',
    title: `${i18n.t('tables:tripsDuringPeriod.duration')}`,
    filter: 'numeric',
    cell: ParseCell,
  },
  {
    field: 'modelTransport',
    title: `${i18n.t('tables:common.modelVehicle')}`,
    filter: 'text',
    width: 127,
  },
  {
    field: 'averageOccupancy',
    title: `${i18n.t('tables:common.averageOccupancy')}`,
    filter: 'numeric',
  },
  {
    field: 'passInHour',
    title: `${i18n.t('tables:common.passHour')}`,
    filter: 'numeric',
    width: 90,
  },
  {
    field: 'passPerKm',
    title: `${i18n.t('tables:common.passKm')}`,
    filter: 'numeric',
    width: 90,
  },
  {
    field: 'transported',
    title: `${i18n.t('tables:common.transported')}`,
    filter: 'numeric',
  },

  {
    field: 'capacity',
    title: `${i18n.t('tables:common.capacity')}`,
    filter: 'numeric',
  },
  {
    field: 'maxLoad',
    title: `${i18n.t('tables:common.maxLoad')}`,
    filter: 'numeric',
    width: 110,
  },
]

export default tripsDuringPeriod.map((item) => ({
  ...item,
  show: true,
  footerCell: (props: GridFooterCellProps) => (
    <td>{store.data.tripsData?.amount[props.field as keyof TripsAmount]}</td>
  ),
}))
