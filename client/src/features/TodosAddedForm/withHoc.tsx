import { graphql, withApollo } from 'react-apollo'
import {
  compose,
  withState,
  withHandlers,
  lifecycle,
} from 'recompose'

import { todosQuery } from '../TodoList/queries'

import { addTodoMutation, updateTodoMutation } from './mutations'
import { getCacheQuery } from './queries'

export const withGraphqlAddTodo = graphql(addTodoMutation, {
  props: ({ mutate }) => ({
    //@ts-ignore
    addTodo: (name: string) => mutate({
      variables: { name },
      refetchQueries: [{ query: todosQuery }],
    }),
  }),
})

// @ts-ignore
const withGraphqlUpdate = graphql(updateTodoMutation, {
  //@ts-ignore
  props: ({ mutate }) => ({
    // @ts-ignore
    updateTodo: ({ id, name, done }) => mutate({
      variables: { id, name, done },
      refetchQueries: [{ query: todosQuery }],
    }),
  }),
})


export const withHoc = compose(
  withState('inputValue', 'setInputValue', ''),
  withGraphqlAddTodo,
  withGraphqlUpdate,
  graphql(getCacheQuery),
  withApollo,
  //@ts-ignore
  withHandlers({
    // @ts-ignore
    onChange: ({ setInputValue }) => ({ target }) => {
      setInputValue(target.value)
    },

    onSubmit: ({
                 addTodo,
                 setInputValue,
                 inputValue: name,
                 updateTodo,
                 data: {
                   updateTodoId: id,
                   updateTodoDone: done,
                 },
                 client,
               }) => () => {
      if (id) {
        updateTodo({ id, name, done })
        setInputValue('')
        client.cache.writeData({
          data: {
            updateTodoId: null,
            updateTodoName: null,
            updateTodoDone: null,
          },
        })
        return false
      }
      addTodo(name)
      setInputValue('')
    },
  }),
  lifecycle({
    componentDidUpdate(prevProps) {
      const {
        // @ts-ignore
        data: {
          updateTodoName,
        },
        // @ts-ignore
        setInputValue,
      } = this.props
      // @ts-ignore
      if (updateTodoName !== prevProps.data.updateTodoName) {
        setInputValue(updateTodoName || '')
      }
    },
  }),
)
