import { gql } from '@apollo/client'

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      items {
        id
        username
        roles {
          name
        }
      }
    }
  }
`

export const GET_ALL_ROLES = gql`
  query GetAllRoles {
    getRoles {
      items {
        id
        name
      }
    }
  }
`

export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      username
      roles {
        id
        name
      }
    }
  }
`

export const GET_USER_BY_NAME = gql`
  query GetUserByUsername($username: String!) {
    getUserByUsername(username: $username) {
      id
      username
      roles {
        id
        name
      }
    }
  }
`
