import { gql } from 'apollo-boost'

export const addTodo = gql`
  mutation($name: String!){
    addTodo(name: $name) {
      id
      name
      done
  }
}
`