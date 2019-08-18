import { compose, withHandlers } from 'recompose' //todo сделать на хуках
import { graphql, withApollo } from 'react-apollo'

import { todosQuery } from '../TodoList/queries'
import { toggleDoneMutation, deleteTodoMutation } from './mutations'

// @ts-ignore
const withGraphqlChecked = graphql(toggleDoneMutation, {
  props: ({ mutate }) => ({
    // @ts-ignore
    toggleDone: ({ id, done }) => mutate({
      variables: { id, done },
      refetchQueries: [{ query: todosQuery }],
    }),
  }),
})

// @ts-ignore
const withGraphqlDelete = graphql(deleteTodoMutation, {
  props: ({ mutate }) => ({
    // @ts-ignore
    deleteTodo: (id) => mutate({
      variables: { id },
      refetchQueries: [{ query: todosQuery }],
    }),
  }),
})

//@ts-ignore
export const withHoc = compose(
  withApollo,
  graphql(todosQuery),
  withGraphqlChecked,
  withGraphqlDelete,
  //@ts-ignore
  withHandlers({
    handlerAdd: ({ toggleDone }) => ({ id, done }: { id: string, done: number }) => () => (
      toggleDone({ id, done })
    ),

    handleDelete: ({ deleteTodo }) => (id: string) => () => deleteTodo(id),

    //@ts-ignore
    handleAddCacheData: ({
                           client,
                           id,
                           name,
                           done,
                         }) => () => {
      const data = {
        updateTodoId: id,
        updateTodoName: name,
        updateTodoDone: done,
      }
      client.writeData({ data })
    },
  }),
)
