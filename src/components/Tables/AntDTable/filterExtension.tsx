import React from 'react'
import { Button, Input, InputRef, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import type { FilterConfirmProps } from 'antd/es/table/interface'
import type { ColumnType } from 'antd/es/table'

// type DataIndex = keyof MonitoringItem

const handleSearch = (
  selectedKeys: string[],
  confirm: (param?: FilterConfirmProps) => void
) => {
  confirm()
}

const handleReset = (clearFilters: () => void) => {
  clearFilters()
}

const filterExtension = (
  dataIndex: any, //toDO: Определить конкретные типы
  ref: React.RefObject<InputRef>
): ColumnType<any> => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }) => (
    <div style={{ padding: 8, borderRadius: 4 }}>
      <Input
        ref={ref}
        placeholder={`Поиск`}
        value={selectedKeys[0]}
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={() => handleSearch(selectedKeys as string[], confirm)}
        style={{ marginBottom: 8, display: 'block' }}
      />
      <Space style={{ justifyContent: 'center', display: 'flex' }}>
        <Button
          onClick={() => handleSearch(selectedKeys as string[], confirm)}
          style={{
            backgroundColor: 'rgb(105, 65, 198)',
            color: '#fff',
          }}
        >
          Поиск
        </Button>
        <Button
          onClick={() => clearFilters && handleReset(clearFilters)}
          style={{ borderRadius: 4, color: 'rgb(105, 65, 198)' }}
        >
          Сбросить
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered: boolean) => (
    <SearchOutlined
      style={{ color: filtered ? 'rgb(105, 65, 198)' : undefined }}
    />
  ),
  onFilter: (value, record) =>
    record[dataIndex]
      .toString()
      .toLowerCase()
      .includes((value as string).toLowerCase()),
  onFilterDropdownVisibleChange: (visible) => {
    if (visible) {
      setTimeout(() => ref.current?.select(), 100)
    }
  },
})

export default filterExtension
