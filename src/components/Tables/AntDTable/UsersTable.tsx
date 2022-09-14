import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Checkbox, Form, notification, Popconfirm, Table } from 'antd'
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  PersonAdd,
} from '@mui/icons-material'
import EditableCell from './EditableCell'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import type { TableUser, User } from 'types/User'
import roles from 'routes/roles'

interface UsersTableProps {
  loading: boolean
  data: any
  pageSize: number
  handleCreateUser: (record: TableUser) => void
  handleUpdateUser: (record: TableUser) => void
  handleDeleteUser: (record: TableUser) => void
}

const UsersTable: React.FC<UsersTableProps> = ({
  loading,
  data,
  pageSize,
  handleCreateUser,
  handleUpdateUser,
  handleDeleteUser,
}) => {
  const { t } = useTranslation('tables')
  const [checkboxState, setCheckboxState] = useState<TableUser[] | undefined>()
  const [originalRecord, setOriginalRecord] = useState<
    TableUser[] | undefined
  >()

  useEffect(() => {
    if (data) {
      const clonedData = structuredClone(data)
      setCheckboxState(
        clonedData.map((user: User) => {
          const rolesArr = Object.values(roles)
          const userRolesArr = user.roles?.map((role) => role.name)
          const excludesRoles = rolesArr.filter(
            (role) => !userRolesArr?.includes(role)
          )
          userRolesArr?.map((role) => Object.assign(user, { [role]: true }))
          excludesRoles.map((role) => Object.assign(user, { [role]: false }))
          delete user.roles
          return user
        })
      )
    }
  }, [data, loading])

  const handleCheckboxChangeFactory =
    (rowIndex: number, columnKey: string) => (event: CheckboxChangeEvent) => {
      const newCheckboxState = checkboxState ? [...checkboxState] : []
      // @ts-ignore
      newCheckboxState[rowIndex][columnKey] = event.target.checked
      setCheckboxState(newCheckboxState)
    }

  const TableCheckbox = (
    value: boolean | undefined,
    rowIndex: number,
    columnKey: string,
    record: TableUser
  ) => (
    <Checkbox
      checked={value}
      onChange={handleCheckboxChangeFactory(rowIndex, columnKey)}
      disabled={editingId !== record.id}
      name={columnKey}
    />
  )

  const columns = [
    {
      title: '№',
      dataIndex: 'id',
      width: '40px',
      render: (
        _value: boolean | undefined,
        _record: TableUser,
        rowIndex: number
      ) => rowIndex + 1,
    },
    {
      title: t('users.username'),
      dataIndex: 'username',
      key: 'username',
      width: '150px',
      editable: true,
    },
    {
      title: t('users.administrator'),
      dataIndex: roles.admin,
      key: roles.admin,
      width: '130px',
      render: (
        value: boolean | undefined,
        record: TableUser,
        rowIndex: number
      ): React.ReactElement =>
        TableCheckbox(value, rowIndex, roles.admin, record),
    },
    {
      title: t('users.transportation'),
      children: [
        {
          title: t('users.volume'),
          dataIndex: roles.route,
          key: roles.route,
          width: '80px',
          render: (
            value: boolean | undefined,
            record: TableUser,
            rowIndex: number
          ): React.ReactElement =>
            TableCheckbox(value, rowIndex, roles.route, record),
        },
        {
          title: t('users.dailyByDay'),
          dataIndex: roles.day,
          key: roles.day,
          width: '140px',
          render: (
            value: boolean | undefined,
            record: TableUser,
            rowIndex: number
          ): React.ReactElement =>
            TableCheckbox(value, rowIndex, roles.day, record),
        },
      ],
    },
    {
      title: t('users.passengerTraffic'),
      children: [
        {
          title: t('users.regular'),
          dataIndex: roles.trip,
          key: roles.trip,
          render: (
            value: boolean | undefined,
            record: TableUser,
            rowIndex: number
          ): React.ReactElement =>
            TableCheckbox(value, rowIndex, roles.trip, record),
        },
        {
          title: t('users.stopping'),
          dataIndex: roles.station,
          key: roles.station,
          render: (
            value: boolean | undefined,
            record: TableUser,
            rowIndex: number
          ): React.ReactElement =>
            TableCheckbox(value, rowIndex, roles.station, record),
        },
        {
          title: t('users.periodsOfDay'),
          dataIndex: roles.hour,
          key: roles.hour,
          render: (
            value: boolean | undefined,
            record: TableUser,
            rowIndex: number
          ): React.ReactElement =>
            TableCheckbox(value, rowIndex, roles.hour, record),
        },
      ],
    },
    {
      title: t('users.transport'),
      children: [
        {
          title: t('users.efficiency'),
          dataIndex: roles.transport,
          key: roles.transport,
          render: (
            value: boolean | undefined,
            record: TableUser,
            rowIndex: number
          ): React.ReactElement =>
            TableCheckbox(value, rowIndex, roles.transport, record),
        },
        {
          title: t('users.workload'),
          dataIndex: roles.category,
          key: roles.category,
          render: (
            value: boolean | undefined,
            record: TableUser,
            rowIndex: number
          ): React.ReactElement =>
            TableCheckbox(value, rowIndex, roles.category, record),
        },
        {
          title: t('users.onlineDownload'),
          dataIndex: roles.online,
          key: roles.online,
          render: (
            value: boolean | undefined,
            record: TableUser,
            rowIndex: number
          ): React.ReactElement =>
            TableCheckbox(value, rowIndex, roles.online, record),
        },
        {
          title: t('users.monitoring'),
          dataIndex: roles.door,
          key: roles.door,
          render: (
            value: boolean | undefined,
            record: TableUser,
            rowIndex: number
          ): React.ReactElement =>
            TableCheckbox(value, rowIndex, roles.door, record),
        },
      ],
    },
    {
      title: t('users.reports'),
      dataIndex: roles.report,
      key: roles.report,
      width: '100px',
      render: (
        value: boolean | undefined,
        record: TableUser,
        rowIndex: number
      ): React.ReactElement =>
        TableCheckbox(value, rowIndex, roles.report, record),
    },
    {
      title: t('users.actions'),
      width: '120px',
      render: (_: any, record: TableUser) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <Button
              type={'primary'}
              onClick={() => save(record)}
              style={{ marginRight: 8 }}
              icon={<CheckOutlined />}
            />
            <Button
              onClick={() => cancel(record.id)}
              icon={<CloseOutlined />}
            />
          </span>
        ) : (
          <>
            <Button
              type={'primary'}
              disabled={editingId !== undefined}
              onClick={() => edit(record)}
              style={{ marginRight: 8 }}
              icon={<EditOutlined />}
            />
            <Popconfirm
              title={`Подтвердите удаление ${record.username}`}
              onConfirm={() => deleteUser(record)}
            >
              <Button icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </>
        )
      },
    },
  ]

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: TableUser) => ({
        record,
        inputType: col.dataIndex === 'username' ? 'text' : 'checkbox',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })

  const [form] = Form.useForm()
  const [editingId, setEditingId] = useState<number | undefined>()

  const isEditing = (record: TableUser) => record.id === editingId

  const addNewRecord = () => {
    const newDataItem: TableUser = { id: 0 }
    form.setFieldsValue({ username: '' })
    const additionOpenCheck = checkboxState?.some((user) => user.id === 0)
    if (!additionOpenCheck) {
      setCheckboxState(checkboxState ? [newDataItem, ...checkboxState] : [])
      setEditingId(0)
    } else {
      // TODO перевод
      notification.info({
        message: 'Внимание',
        description: 'За раз может быть создан только 1 пользователь',
      })
    }
  }

  const deleteUser = (record: TableUser) => handleDeleteUser(record)

  const edit = (record: TableUser) => {
    form.setFieldsValue({ ...record })
    setEditingId(record.id)
    setOriginalRecord(structuredClone(checkboxState))
  }

  const cancel = (recordId: number) => {
    const newRecord = recordId === 0
    if (newRecord && checkboxState) {
      const newData = [...checkboxState]
      newData.splice(0, 1)
      setCheckboxState(newData)
    }
    if (!newRecord) {
      originalRecord && setCheckboxState(originalRecord)
    }
    setEditingId(undefined)
  }

  const checkRoles = (record: TableUser) => {
    const roles = Object.entries(record).filter(
      ([key, value]) => key.includes('_ROLE') && value
    )
    const onlyReportRole =
      roles.length === 1 ? roles[0].includes('REPORT_ROLE') : false
    if (roles.length) {
      return !onlyReportRole
    }
    return false
  }

  const save = async (record: TableUser) => {
    const newItem = record.id === 0
    try {
      const inputRecord = (await form.validateFields()) as TableUser
      if (newItem && checkRoles(record)) {
        const newUser = { ...inputRecord, ...record }
        handleCreateUser(newUser)
        setCheckboxState((prevState) =>
          prevState?.filter((item) => item.id !== 0)
        )
        setEditingId(undefined)
      }
      if (!newItem && checkRoles(record)) {
        if (JSON.stringify(originalRecord) === JSON.stringify(record)) {
          setEditingId(undefined)
        } else {
          record.username = inputRecord.username
          handleUpdateUser(record)
          setEditingId(undefined)
        }
      }
      if (!checkRoles(record)) {
        notification.error({
          message: 'Ошибка',
          description: `У пользователя должна быть хотя бы одна роль, помимо отчетной`,
        })
      }
    } catch (errInfo) {
      // TODO ошибки валидации
      console.log('Validate Failed:', errInfo)
    }
  }

  return (
    <Form form={form} component={false}>
      <Table
        title={() => (
          <Button
            icon={<PersonAdd />}
            type={'primary'}
            onClick={addNewRecord}
          />
        )}
        style={{ textAlign: 'center' }}
        rowKey={(record) => record.id}
        dataSource={checkboxState}
        columns={mergedColumns}
        loading={loading}
        size={'small'}
        pagination={{ pageSize }}
        components={{ body: { cell: EditableCell } }}
        bordered
      />
    </Form>
  )
}

export default UsersTable
