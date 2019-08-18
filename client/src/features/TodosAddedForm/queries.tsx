import gql from 'graphql-tag'

export const getCacheQuery = gql`
  query getCache {
    updateTodoId @client
    updateTodoName @client
    updateTodoDone @client
  }
`
