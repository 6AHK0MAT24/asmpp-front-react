import React, { useEffect, useState } from 'react'
import { orderBy, SortDescriptor } from '@progress/kendo-data-query'
import { Tooltip } from '@progress/kendo-react-tooltip'
import {
  getSelectedState,
  Grid,
  GridColumn,
  GridColumnProps,
  GridPageChangeEvent,
  GridSelectionChangeEvent,
  GridSortChangeEvent,
  GridToolbar,
} from '@progress/kendo-react-grid'
import Loading from 'components/Loading/Loading'
import { ColumnMenu } from 'components/Tables/KendoTable/ColumnMenu/ColumnMenu'
import { Typography } from 'antd'
import type { Trips, TripsItem } from 'types/Trips'
import type { Transport, TransportItem } from 'types/Transport'
import type { Category } from 'types/Category'
import type { Days } from 'types/Days'
import type { Hours } from 'types/Hours'
import type { TripStationsSpecificRoute } from 'types/TripStationsSpecificRoute'
import './KendoTable.scss'

interface KendoTableProps {
  title: string
  data:
    | Trips
    | Transport
    | Category
    | Days
    | TripStationsSpecificRoute
    | Hours
    | undefined
  columns: ColumnInterface[]
  selectable?: boolean
  selectionDataItemKey?: 'transportId' | 'tripSpecificId'
  handleSelectedId?: (id: string) => void
  halfHeight?: boolean
  loading?: boolean
}

export interface ColumnInterface extends GridColumnProps {
  show?: boolean
}

interface SelectedState {
  [key: string]: boolean | number[]
}

interface PageState {
  skip: number
  take: number
}

const KendoTable: React.FC<KendoTableProps> = ({
  title,
  data,
  columns,
  selectable,
  selectionDataItemKey,
  handleSelectedId,
  halfHeight,
  loading,
}) => {
  const innerItems = data ? data.items : []
  const selectionKey = 'selected'
  const pagination = { skip: 0, take: 25 }
  const pageSizes = [25, 50, 75]
  const initialSort: Array<SortDescriptor> = [{ field: 'id', dir: 'asc' }]
  const [stateColumns, setStateColumns] = useState(columns)
  const [page, setPage] = React.useState<PageState>(pagination)
  const [sort, setSort] = useState(initialSort)
  const [selected, setSelected] = useState<SelectedState>({})

  const makeDataPageble = (arr: any[]) =>
    arr.slice(page.skip, page.take + page.skip)
  const makeDataSelectable = (arr: any[]) =>
    arr.map((item: any) => Object.assign({ selected: false }, item))
  const makeDataSortable = (arr: any[]) =>
    orderBy(arr, sort).map((item: any) =>
      selectable && selectionDataItemKey
        ? {
            ...item,
            ['selected']:
              selected[
                (item as { selected: boolean } & TripsItem & TransportItem)[
                  selectionDataItemKey
                ]
              ],
          }
        : item
    )

  useEffect(() => {
    handleSelectedId &&
      handleSelectedId(Object.getOwnPropertyNames(selected).join())
  }, [handleSelectedId, selected])

  useEffect(() => {
    if (!data?.items.length) {
      setSelected({})
    }
  }, [data?.items.length, handleSelectedId])

  const onColumnsSubmit = (columnsState: ColumnInterface[]) =>
    setStateColumns(columnsState)

  const handleSelectionChange = (event: GridSelectionChangeEvent) => {
    const newSelectedState = getSelectedState({
      event,
      selectedState: selected,
      dataItemKey: selectionDataItemKey ? selectionDataItemKey : '',
    })
    setSelected(newSelectedState)

    if (Object.keys(selected).includes(Object.keys(newSelectedState)[0])) {
      setSelected({})
    }
  }
  const handlePageChange = (event: GridPageChangeEvent) => setPage(event.page)

  return (
    <div className="kendo-table__container">
      <div
        className={
          loading
            ? 'kendo-table__loading-spinner kendo-table__loading-spinner_loading'
            : 'kendo-table__loading-spinner'
        }
      >
        <Loading />
      </div>
      <Tooltip anchorElement="pointer" position="bottom">
        <Grid
          className={`
            ${loading ? 'kendo-table_loading' : ''}
            ${
              halfHeight ? 'kendo-table' : 'kendo-table kendo-table_full-height'
            }`}
          data={
            data
              ? makeDataSelectable(
                  makeDataSortable(makeDataPageble(data.items))
                )
              : []
          }
          sortable
          sort={sort}
          onSortChange={(event: GridSortChangeEvent) => setSort(event.sort)}
          selectable={{ enabled: selectable, mode: 'single' }}
          selectedField={selectionKey}
          onSelectionChange={handleSelectionChange}
          pageable={{ pageSizes }}
          total={innerItems.length}
          skip={page.skip}
          pageSize={page.take}
          onPageChange={handlePageChange}
          resizable
        >
          <GridToolbar>
            <Typography.Title level={5} style={{ fontWeight: 400 }}>
              {title}
            </Typography.Title>
          </GridToolbar>
          {stateColumns.map(
            (column, idx) =>
              column.show && (
                <GridColumn
                  key={idx}
                  field={column.field}
                  title={column.title}
                  filter={column.filter}
                  footerCell={column.footerCell}
                  headerCell={column.headerCell}
                  cell={column.cell}
                  width={column.width}
                  columnMenu={(props) => (
                    <ColumnMenu
                      {...props}
                      columns={stateColumns}
                      onColumnsSubmit={onColumnsSubmit}
                    />
                  )}
                />
              )
          )}
        </Grid>
      </Tooltip>
    </div>
  )
}

export default KendoTable
