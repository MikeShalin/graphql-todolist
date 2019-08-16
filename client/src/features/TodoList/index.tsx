import React from 'react'

//@ts-ignore
import map from 'lodash/map'
//@ts-ignore
import { compose } from 'recompose' //todo сделать на хуках
import { graphql } from 'react-apollo'

import { todosQuery } from './queries'

type TTodo = { id: string, name: string, done: number }
type TProps = {
  data: {
    todos: void | Array<TTodo>,
    loading: boolean,
    error: Error,
  }
}

const TodoList = ({ data: { todos, loading, error } }: TProps) => {
  if (loading) return <span>...loading</span>
  if (error) return <span>error: {String(error)}</span>
  return (
    <ul>
      {
        map(todos, ({ id, name, done }: TTodo) => (
          <li key={id}>
            <h3>{name}</h3>
            <h3>done: {String(!!done)}</h3>
          </li>
        ))
      }
    </ul>
  )
}

//@ts-ignore
export const TodoListComposed = compose(graphql(todosQuery))(TodoList)
