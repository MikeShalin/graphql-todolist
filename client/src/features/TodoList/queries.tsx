import { gql } from 'apollo-boost'

export const todosQuery = gql`
  query {
    todos {
      id
      name
      done
    }
  }
`