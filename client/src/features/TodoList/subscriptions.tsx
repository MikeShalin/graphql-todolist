import gql from 'graphql-tag'

export const onToggledDone = gql`
  subscription toggledDone($id: ID, $done: Int){
    toggledDone(id: $id, done: $done){
      id
      name
      done
    }
  }
`

export const onUpdatedName = gql`
  subscription updatedName($id: ID, $done: Int, $name: String){
    updatedName(id: $id, done: $done, name: $name){
      id
      name
      done
    }
  }
`

export const onAddedTodo = gql`
  subscription addedTodo($id: ID, $done: Int, $name: String){
    addedTodo(id: $id, done: $done, name: $name){
      id
      name
      done
    }
  }
`

export const onDeletedTodo = gql`
  subscription deletedTodo($id: ID){
    deletedTodo(id: $id){
      id
      name
      done
    }
  }
`
