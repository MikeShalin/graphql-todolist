import React from 'react'

import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo';

import { TodoListComposed as TodoList } from './features/TodoList'
import { ApolloClient } from 'apollo-client'

const httpLink = createHttpLink({
  uri: 'http://localhost:3005/graphql',
})

const cache = new InMemoryCache()

const client = new ApolloClient({
  link: httpLink,
  cache,
})

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <TodoList />
    </ApolloProvider>
  )
}

export default App
