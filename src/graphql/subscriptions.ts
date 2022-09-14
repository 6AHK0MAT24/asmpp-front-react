import { gql } from '@apollo/client'

export const USERS_SUBSCRIPTION = gql`
  subscription SubUsers {
    subUsers {
      user {
        id
        username
        roles {
          name
        }
      }
      action
    }
  }
`
