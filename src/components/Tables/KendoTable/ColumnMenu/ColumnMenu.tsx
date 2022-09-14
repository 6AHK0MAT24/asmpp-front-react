import React, { useState } from 'react'
import {
  GridColumnMenuFilter,
  GridColumnMenuItemGroup,
  GridColumnMenuItem,
  GridColumnMenuItemContent,
  GridColumnMenuProps,
} from '@progress/kendo-react-grid'

import type { ColumnInterface } from 'components/Tables/KendoTable/KendoTable'

interface CustomColumnMenuProps extends GridColumnMenuProps {
  columns: ColumnInterface[]
  onColumnsSubmit: (event: any) => void
}

export const ColumnMenu = (props: CustomColumnMenuProps) => {
  const [columns, setColumns] = useState<ColumnInterface[]>(props.columns)
  const [columnsExpanded, setColumnsExpanded] = useState(false)
  const [filterExpanded, setFilterExpanded] = useState(false)

  const onToggleColumn = (id: number) => {
    const newColumns = columns.map((column, idx) => {
      return idx === id ? { ...column, show: !column.show } : column
    })
    setColumns(newColumns)
  }

  const onReset = (event: any) => {
    event.preventDefault()
    const newColumns: Array<ColumnInterface> = props.columns.map((col) => {
      return {
        ...col,
        show: true,
      }
    })
    setColumns(newColumns)
    props.onColumnsSubmit(newColumns)
    if (props.onCloseMenu) {
      props.onCloseMenu()
    }
  }

  const onSubmit = (event: any) => {
    if (event) {
      event.preventDefault()
    }
    props.onColumnsSubmit(columns)
    if (props.onCloseMenu) {
      props.onCloseMenu()
    }
  }

  const onMenuItemClick = () => {
    const value = !columnsExpanded
    setColumnsExpanded(value)
    setFilterExpanded(value ? false : filterExpanded)
  }

  const onFilterExpandChange = (value: boolean) => {
    setFilterExpanded(value)
    setColumnsExpanded(value ? false : columnsExpanded)
  }

  const oneVisibleColumn = columns.filter((c) => c.show).length === 1

  return (
    <div>
      <GridColumnMenuFilter
        {...props}
        onExpandChange={onFilterExpandChange}
        expanded={filterExpanded}
      />
      <GridColumnMenuItemGroup>
        <GridColumnMenuItem
          title={'Колонки'}
          iconClass={'k-i-columns'}
          onClick={onMenuItemClick}
        />
        <GridColumnMenuItemContent show={columnsExpanded}>
          <div className={'k-column-list-wrapper'}>
            <form onSubmit={onSubmit} onReset={onReset}>
              <div className={'k-column-list'}>
                {columns.map((column, idx) => (
                  <div key={idx} className={'k-column-list-item'}>
                    <input
                      id={`column-visiblity-show-${idx}`}
                      className="k-checkbox k-checkbox-md k-rounded-md"
                      type="checkbox"
                      readOnly={true}
                      disabled={column.show && oneVisibleColumn}
                      checked={column.show}
                      onClick={() => {
                        onToggleColumn(idx)
                      }}
                    />
                    <label
                      htmlFor={`column-visiblity-show-${idx}`}
                      className="k-checkbox-label"
                      style={{ userSelect: 'none', marginLeft: 2 }}
                    >
                      {column.title}
                    </label>
                  </div>
                ))}
              </div>
              <div className={'k-actions k-hstack k-justify-content-stretch'}>
                <button
                  type={'reset'}
                  className={
                    'k-button k-button-md k-rounded-md k-button-solid k-button-solid-base'
                  }
                >
                  Сбросить
                </button>
                <button
                  className={
                    'k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary'
                  }
                >
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </GridColumnMenuItemContent>
      </GridColumnMenuItemGroup>
    </div>
  )
}
