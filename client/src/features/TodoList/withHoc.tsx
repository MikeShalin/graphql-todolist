import { compose } from 'recompose' //todo сделать на хуках
import { graphql, withApollo } from 'react-apollo'
import get from 'lodash/get'
import filter from 'lodash/filter'
import isNil from 'lodash/isNil'
import some from 'lodash/some'

import { todosQuery } from './queries'
import { subscription as options } from './config'
import {
  onToggledDone,
  onUpdatedName,
  onAddedTodo,
  onDeletedTodo,
} from './subscriptions'
import {
  TDeletedInputProps,
  TDeletedResponse,
  TComponentProps,
  TAddedInputProps,
  TAddedChildProps,
  TDeletedChildProps,
} from './types'

const onToggleDoneSubscriptions = graphql(onToggledDone, options)

const onTodoUpdateNameSubscriptions = graphql(onUpdatedName, options)

const onAddedTodoSubscriptions = graphql<
  TAddedInputProps,
  Response,
  {},
  TAddedChildProps
  >(onAddedTodo, {
  props: ({ ownProps: { client, data }, ...inputProps }) => {
    if (!data.todos) return false

    const addedTodo = get(inputProps, ['data', 'addedTodo'])
    let { todos } = client.readQuery({query: todosQuery})

    if (isNil(todos)) return null
    if (isNil(addedTodo)) return null
    if (some(todos, ['id', addedTodo.id])) return null

    todos = [...todos, addedTodo]
    client.cache.writeData({ data: { todos } })
  },
})

const onDeletedTodoSubscriptions = graphql<
  TDeletedInputProps,
  TDeletedResponse,
  {},
  TDeletedChildProps
  >(onDeletedTodo, {
  props: ({ownProps: { client, data }, ...inputProps }) => {
    if (!data.todos) return false

    const deletedTodo = get(inputProps, ['data', 'deletedTodo'])
    const deletedId = get(deletedTodo, 'id')

    let { todos } = client.readQuery({ query: todosQuery })

    if (isNil(deletedId)) return null

    todos = filter(todos, ({ id }: { id: string }) => id !== deletedId)
    client.cache.writeData({ data: { todos } })
  },
})

export const withHoc = compose<TComponentProps, {}>(
  withApollo,
  graphql(todosQuery),
  onToggleDoneSubscriptions,
  onTodoUpdateNameSubscriptions,
  onAddedTodoSubscriptions,
  onDeletedTodoSubscriptions,
)
