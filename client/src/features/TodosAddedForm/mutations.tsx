import { gql } from 'apollo-boost'

export const addTodoMutation = gql`
  mutation($name: String!){
    addTodo(name: $name) {
      id
      name
      done
    }
  }
`
export const updateTodoMutation = gql`
  mutation($id: ID, $name: String, $done: Int){
    todoUpdateName(id: $id, name: $name, done: $done) {
      id
      name
      done
    }
  }
`
