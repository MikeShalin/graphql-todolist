import { compose, withHandlers } from 'recompose' //todo сделать на хуках
import { graphql, withApollo } from 'react-apollo'

import { todosQuery } from '../TodoList/queries'
import { toggleDoneMutation, deleteTodoMutation } from './mutations'

type VariablesTVariables = { id: number, done: number }

const withGraphqlChecked = graphql<{}, Response, VariablesTVariables, {}>(
  toggleDoneMutation, {
    props: ({ mutate }) => ({
      //@ts-ignore
      toggleDone: ({ id, done }: VariablesTVariables) => mutate({
        variables: { id, done },
        refetchQueries: [{ query: todosQuery }],
      }),
    }),
  },
)

type VariablesTDelete = { id: number }

const withGraphqlDelete = graphql<{}, Response, VariablesTDelete, {}>(
  deleteTodoMutation, {
    props: ({ mutate }) => ({
      //@ts-ignore
      deleteTodo: (id: number) => mutate({
        variables: { id },
        refetchQueries: [{ query: todosQuery }],
      }),
    }),
  },
)

type TArgs = { id: string, done: number }

export const withHoc = compose(
  withApollo,
  graphql(todosQuery),
  withGraphqlChecked,
  withGraphqlDelete,
  //@ts-ignore
  withHandlers({
    handlerAdd: ({ toggleDone }) => ({ id, done }: TArgs) => () => (
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
