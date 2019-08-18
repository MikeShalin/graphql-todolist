import { graphql } from 'react-apollo'
import {
  compose,
  withState,
  withHandlers,
  lifecycle,
} from 'recompose'

import { todosQuery } from '../TodoList/queries'

import { addTodoMutation, updateTodoMutation } from './mutations'
import { getCacheQuery } from './queries'

//@ts-ignore
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
  props: ({ mutate }) => ({
    // @ts-ignore
    updateTodo: ({ id, name }) => mutate({
      variables: { id, name },
      refetchQueries: [{ query: todosQuery }],
    }),
  }),
})

// @ts-ignore
const withClientCache = graphql(getCacheQuery, {
  // @ts-ignore
  options: ({ data }) => data,
})

export const withHoc = compose(
  withState('inputValue', 'setInputValue', ''),
  withGraphqlAddTodo,
  withGraphqlUpdate,
  withClientCache,
  // ApolloConsumer,
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
                 // client,
               }) => () => {
      if (id) {
        updateTodo({ id, name, done })
        setInputValue('')
        return false //todo не убирается кеш после сабмита, нет чекбокса у тудушки которую апдейтнули
        // client.writeData()
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
      if (updateTodoName && !prevProps.data.updateTodoName) {
        setInputValue(updateTodoName)
      }
    },
  }),
)
