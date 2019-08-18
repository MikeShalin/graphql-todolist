import React from 'react'

import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'

import { ApolloClient } from 'apollo-client'

import { TodoListComposed as TodoList } from './features/TodoList'
import { TodosAddedForm } from './features/TodosAddedForm'
import { AppWrapper } from './features/AppWrapper'

const httpLink = createHttpLink({
  uri: 'http://localhost:3005/graphql',
})

const cache = new InMemoryCache()

const client = new ApolloClient({
  link: httpLink,
  cache,
})

export const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <AppWrapper>
        <TodosAddedForm />
        <TodoList />
      </AppWrapper>
    </ApolloProvider>
  )
}
