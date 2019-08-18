import { gql } from 'apollo-boost'

export const toggleDoneMutation = gql`
  mutation($id:ID, $done: Int) {
    toggleDone(id: $id, done: $done) {
      id
      name
      done
    }
  }
`

export const deleteTodoMutation = gql`
  mutation($id: ID){
    deleteTodo(id: $id) {
      id
      name
      done
    }
  }
`