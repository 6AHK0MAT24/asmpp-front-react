import { gql } from '@apollo/client'

export const CREATE_USER = gql`
  mutation CreateUser($input: UserDto!) {
    createUser(input: $input) {
      id
      username
      roles {
        name
      }
    }
  }
`
export const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      id
      roles {
        name
      }
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UserDto!) {
    updateUser(id: $id, input: $input) {
      id
      username
      roles {
        name
      }
    }
  }
`

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUserById(id: $id)
  }
`
