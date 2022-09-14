import { setContext } from '@apollo/client/link/context'
import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  ServerError,
  split,
} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { onError } from '@apollo/client/link/error'
import apiEndpoints from 'services/apiEndpoints'
import store from 'store'
import { notification } from 'antd'

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('jwt') || '',
    },
  }
})

const httpLink = new HttpLink({
  uri: apiEndpoints.graphqlUrl,
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: apiEndpoints.subscriptionsWsUrl,
    retryAttempts: 5,
    connectionParams: {
      Authorization: localStorage.getItem('jwt'),
    },
  })
)

const errorLink = onError(({ networkError }) => {
  if ((networkError as ServerError)?.statusCode === 401) {
    store.api.setLoggedOut()
  }
  if ((networkError as ServerError)?.statusCode === 500) {
    notification.error({
      message: 'Ошибка сервера',
      description: `Что-то пошло не так`,
    })
  }
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  link: from([errorLink, splitLink]),
  cache: new InMemoryCache(),
})

export default client
