import { compose, withHandlers } from 'recompose' //todo сделать на хуках
import { graphql, withApollo } from 'react-apollo'

import { todosQuery } from '../TodoList/queries'
import { toggleDoneMutation, deleteTodoMutation } from './mutations'
import {
  TComponentProps,
  TTodo,
  TTodoOuter,
  TCommonParams,
} from './types'

const withGraphqlChecked = graphql(
  toggleDoneMutation,
  {
    props: ({ mutate }) => ({
      toggleDone: ({
                     id,
                     done,
                     name,
                   }: TCommonParams) => mutate && mutate({
        variables: {
          id,
          done,
          name,
        },
        refetchQueries: [{ query: todosQuery }],
      }),
    }),
  },
)

const withGraphqlDelete = graphql(
  deleteTodoMutation,
  {
    props: ({ mutate }) => ({
      deleteTodo: (id: number) => mutate && mutate({
        variables: { id },
        refetchQueries: [{ query: todosQuery }],
      }),
    }),
  },
)

export const withHoc = compose<TComponentProps, TTodoOuter>(
  withApollo,
  graphql(todosQuery),
  withGraphqlChecked,
  withGraphqlDelete,

  withHandlers({
    handlerAdd: ({ toggleDone }: TTodo) => (
      ({ id, done, name }: TCommonParams) => () => (
        toggleDone({ id, done, name })
      )
    ),

    handleDelete: ({ deleteTodo }: TTodo) => (id: string) => () => deleteTodo(id),

    handleAddCacheData: ({
                           client,
                           id,
                           name,
                           done,
                         }: TTodo) => () => {
      const data = {
        updateTodoId: id,
        updateTodoName: name,
        updateTodoDone: done,
      }

      client.writeData({ data })
    },
  }),
)
