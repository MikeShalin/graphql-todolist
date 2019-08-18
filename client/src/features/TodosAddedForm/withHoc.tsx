import { compose, withStateHandlers, withHandlers } from 'recompose'
import { graphql } from 'react-apollo'

import { addTodo } from './mutations'
import { todosQuery } from '../TodoList/queries'

//@ts-ignore
export const withGraphqlAddTodo = graphql(addTodo, {
  props: ({ mutate }) => ({
    //@ts-ignore
    addTodo: (name: string) => mutate({
      variables: { name },
      refetchQueries: [{ query: todosQuery }],
    }),
  }),
})

export const withHoc = compose(
  withStateHandlers(() => ({
      inputValue: '',
    }),
    {
      onChange: () => ({ target }) => ({
        inputValue: target.value,
      }),
      clearInput: () => () => ({
        inputValue: '',
      }),
    },
  ),
  withGraphqlAddTodo,
  //@ts-ignore
  withHandlers({
    onSubmit: ({ addTodo, clearInput, inputValue }) => () => {
      addTodo(inputValue)
      clearInput()
    },
  }),
)
