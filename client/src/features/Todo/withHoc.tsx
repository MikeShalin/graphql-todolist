import { compose, withHandlers, withState } from 'recompose' //todo сделать на
                                                             // хуках
import { graphql } from 'react-apollo'

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
  withState('isShow', 'toggleShow', false),
  graphql(todosQuery),
  withGraphqlChecked,
  withGraphqlDelete,
  //@ts-ignore
  withHandlers({
    handlerAdd: ({ toggleDone }) => ({ id, done }: { id: string, done: number }) => () => (
      toggleDone({ id, done })
    ),

    handleDelete: ({ deleteTodo }) => (id: string) => () => deleteTodo(id),

    handleToggleShow: ({ toggleShow }) => (isShow: boolean) => () => toggleShow(isShow),

    //@ts-ignore
    handleAddCacheData: () => (client) => (data) => () => {
      client.writeData({ data })
    },
  }),
)
