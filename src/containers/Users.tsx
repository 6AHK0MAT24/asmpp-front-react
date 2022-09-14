import React, { useState } from 'react'
import { useMutation, useQuery, useSubscription } from '@apollo/client'
import { notification } from 'antd'
import UsersTable from 'components/Tables/AntDTable/UsersTable'
import { CREATE_USER, DELETE_USER, UPDATE_USER } from 'graphql/mutations'
import { USERS_SUBSCRIPTION } from 'graphql/subscriptions'
import { GET_ALL_USERS } from 'graphql/queries'
import type { TableUser, User } from 'types/User'

// TODO перевод нотификаций

const Users: React.FC = () => {
  const [allUsers, setAllUsers] = useState<User[] | undefined>()

  const { loading: usersLoading } = useQuery(GET_ALL_USERS, {
    fetchPolicy: 'no-cache',
    onCompleted({ getAllUsers }) {
      const supAdminFiltered = getAllUsers.items
        .filter((user: User) => user.id !== '777')
        .sort((a: User, b: User) => Number(a.id) - Number(b.id))
      setAllUsers(supAdminFiltered)
    },
  })

  const [createUserMutation] = useMutation(CREATE_USER)
  const [updateUserMutation] = useMutation(UPDATE_USER)
  const [deleteUserMutation] = useMutation(DELETE_USER)

  const { data: subscriptionData } = useSubscription(USERS_SUBSCRIPTION, {
    onSubscriptionData({ subscriptionData }) {
      const { action, user } = subscriptionData.data.subUsers
      setAllUsers((prevState) => {
        if (action === 'DELETED') {
          return prevState?.filter((prevUser) => prevUser.id !== user.id)
        }
        if (action === 'ADDED') {
          return [...(prevState as User[]), user]
        }
        if (action === 'UPDATED') {
          const index = prevState?.findIndex(
            (existUser) => existUser.id === user.id
          )
          index && prevState?.splice(index, 1, user)
          return prevState && [...prevState]
        }
      })
    },
  })

  const getRolesFromTable = (record: TableUser) => {
    const roles: string[] = []
    Object.entries(record).filter((item) => {
      if (item[1] === true) {
        roles.push(item[0])
      }
    })
    return roles
  }
  const handleCreateUser = (record: TableUser) => {
    createUserMutation({
      variables: {
        input: {
          username: record.username,
          password: '1234',
          roles: [...getRolesFromTable(record)],
        },
      },
      onCompleted(data) {
        if (data.createUser) {
          notification.success({
            message: 'Успех',
            description: `Пользователь ${data.createUser.username} успешно создан`,
          })
        }
      },
    }).then()
  }

  const handleUpdateUser = (record: TableUser) => {
    updateUserMutation({
      variables: {
        id: record.id,
        input: {
          username: record.username,
          roles: [...getRolesFromTable(record)],
        },
      },
      onCompleted(data) {
        if (data.updateUser) {
          notification.success({
            message: 'Успех',
            description: `Пользователь ${data.updateUser.username} успешно изменен`,
          })
        }
      },
    }).then()
  }

  const handleDeleteUser = (record: TableUser) => {
    const selfId = localStorage.getItem('id')
    if (record.id.toString() !== selfId) {
      deleteUserMutation({
        variables: { id: record.id },
        onCompleted(data) {
          if (data.deleteUserById) {
            notification.success({
              message: 'Успех',
              description: `Пользователь ${record.username} успешно удален`,
            })
          }
          if (!data.deleteUserById) {
            notification.error({
              message: 'Ошибка удаления',
              description: `Что-то пошло не так`,
            })
          }
        },
        onError({ message }) {
          if (message.includes('User not exist')) {
            notification.error({
              message: 'Ошибка удаления',
              description: `Пользователя с именем ${record.username} не существует`,
            })
          }
        },
      }).then()
    } else {
      notification.warn({
        message: 'Внимание',
        description: 'Нельзя удалить самого себя',
      })
    }
  }

  return (
    <UsersTable
      loading={usersLoading}
      data={allUsers}
      pageSize={14}
      handleCreateUser={handleCreateUser}
      handleUpdateUser={handleUpdateUser}
      handleDeleteUser={handleDeleteUser}
    />
  )
}
export default Users
