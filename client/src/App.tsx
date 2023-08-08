import React from 'react'

import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'

import { ApolloClient } from 'apollo-client'

import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

import { TodoListComposed as TodoList } from './features/TodoList'
import { TodosAddedFormComposed as TodosAddedForm } from './features/TodosAddedForm'
import { AppWrapper } from './features/AppWrapper'

const httpLink = new HttpLink({
  uri: 'http://localhost:3005/graphql',
})

const wsLink = new WebSocketLink({
  uri: `ws://localhost:3005/graphql`,
  options: {
    reconnect: true,
  },
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink,
)


const cache = new InMemoryCache()

export const client = new ApolloClient({
  link,
  cache,
})

cache.writeData({
  data: {
    updateTodoId: null,
    updateTodoName: null,
    updateTodoDone: null,
  },
})

export const App: React.FC = () => (
  <ApolloProvider client={client}>
    <AppWrapper>
      <TodosAddedForm />
      <TodoList />
    </AppWrapper>
  </ApolloProvider>
)
