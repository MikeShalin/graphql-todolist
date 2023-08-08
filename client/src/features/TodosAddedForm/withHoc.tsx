import React from 'react'
import { graphql, withApollo } from 'react-apollo'
import {
  compose,
  withState,
  withHandlers,
  lifecycle,
} from 'recompose'
import isNil from 'lodash/isNil'

import { todosQuery } from '../TodoList/queries'

import { addTodoMutation, updateTodoMutation } from './mutations'
import { getCacheQuery } from './queries'
import {
  TComponentProps,
  TArgsUpdate,
  TClientProps,
} from './types'

export const withGraphqlAddTodo = graphql(addTodoMutation, {
  props: ({ mutate }) => ({
    addTodo: (name: string) => mutate && mutate({
      variables: { name },
      refetchQueries: [{ query: todosQuery }],
    }),
  }),
})

const withGraphqlUpdate = graphql(updateTodoMutation, {
  props: ({ mutate }) => ({
    updateTodo: ({ id, name, done }: TArgsUpdate) => mutate && mutate({
      variables: { id, name, done },
      refetchQueries: [{ query: todosQuery }],
    }),
  }),
})


export const withHoc = compose<TComponentProps, {}>(
  withState('inputValue', 'setInputValue', ''),
  withGraphqlAddTodo,
  withGraphqlUpdate,
  graphql(getCacheQuery),
  withApollo,
  withHandlers<TClientProps, {}>({
    onChange: ({ setInputValue }) => ({ target }: React.ChangeEvent<HTMLInputElement>) => {
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
      if (id && !isNil(done)) {
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
  lifecycle<TClientProps, {}>({
    componentDidUpdate(prevProps) {
      const {
        data: {
          updateTodoName,
        },
        setInputValue,
      } = this.props
      if (updateTodoName !== prevProps.data.updateTodoName) {
        setInputValue(updateTodoName || '')
      }
    },
  }),
)
