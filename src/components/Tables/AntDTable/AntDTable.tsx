import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Table } from 'antd'
import { runInAction } from 'mobx'
import addKeysToObject from 'utils/addKeysToObject'
import type { ColumnsType } from 'antd/es/table'
import store from 'store'

interface AntDTableProps {
  data: any
  columns: ColumnsType<any> // TODO Разрешить проблему с типами
  multiSelectable?: boolean
  title?: string
  loading: boolean
  amountFooter?: any
  emptySummaryCells?: number
  computedFooter?: (
    pageData: any,
    selectedRowKeys: React.Key[]
  ) => React.ReactNode
}

const AntDTable: React.FC<AntDTableProps> = ({
  data,
  columns,
  multiSelectable,
  title,
  loading,
  computedFooter,
  emptySummaryCells,
}) => {
  // TODO добавить пагинацию и связать бы ее с пагинацией на беке
  const tableData = data ? runInAction(() => addKeysToObject(data?.items)) : []
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const selectRow = (record: typeof tableData) => {
    const selectedRowKeysInner = [...selectedRowKeys]
    if (selectedRowKeysInner.indexOf(record.key) >= 0) {
      selectedRowKeysInner.splice(selectedRowKeysInner.indexOf(record.key), 1)
    } else {
      selectedRowKeysInner.push(record.key)
    }
    setSelectedRowKeys(selectedRowKeysInner)
  }

  const amountFooter = (pageData: any) => {
    if (pageData[0] && data?.amount) {
      return (
        <Table.Summary fixed>
          <Table.Summary.Row style={{ textAlign: 'center' }}>
            {[...Array(emptySummaryCells).keys()].map((item) => (
              <Table.Summary.Cell key={item} index={item} />
            ))}
            {Object.keys(pageData[0]).map((item, index) => (
              <Table.Summary.Cell key={index} index={index}>
                {data?.amount[item]}
              </Table.Summary.Cell>
            ))}
          </Table.Summary.Row>
        </Table.Summary>
      )
    }
  }

  return (
    <Table
      loading={loading}
      rowKey={(record) => record.key}
      title={() => title}
      style={{ textAlign: 'center' }}
      columns={columns}
      dataSource={tableData}
      rowSelection={multiSelectable ? rowSelection : undefined}
      pagination={{
        pageSize: Number(store.api.itemsPerPage),
        total: data && data.totalItems ? data.totalItems : false,
        showTotal: (total, range) =>
          `${range[0]}-${range[1]} of ${total} items`,
      }}
      scroll={{ y: 540 }}
      bordered
      onRow={(record) => ({ onClick: () => selectRow(record) })}
      summary={
        data?.items.length
          ? (pageData) =>
              multiSelectable && computedFooter
                ? computedFooter(pageData, selectedRowKeys)
                : amountFooter(pageData)
          : undefined
      }
    />
  )
}

export default observer(AntDTable)
