import { compose } from 'recompose' //todo сделать на хуках
import { graphql } from 'react-apollo'

import { todosQuery } from './queries'
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
const withGraphqldelete = graphql(deleteTodoMutation, {
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
  graphql(todosQuery),
  withGraphqlChecked,
  withGraphqldelete,
)
