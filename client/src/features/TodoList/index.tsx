import React from 'react'

import map from 'lodash/map'
import { List, Segment } from 'semantic-ui-react'

import { Loader } from '../Loader'
import { TodoComposed as Todo } from '../Todo'

import { withHoc } from './withHoc'
import { todosQuery } from './queries'
import { TTodo, TComponentProps } from './types'

const TodoList = ({
                    data: {
                      loading,
                      error,
                    },
                    client,
                  }: TComponentProps) => {
  if (loading) return <Loader />
  if (error) return <span>error: {String(error)}</span>
  const { todos } = client.readQuery({query: todosQuery})
    return (
    <Segment>
      <List
        verticalAlign='middle'
        divided
        relaxed
      >
        {
          todos.length
          ? map(todos, ({ id, name, done }: TTodo) => (
            <Todo
              key={id}
              done={done}
              name={name}
              id={id}
            />
          ))
          :(
            <List.Item className='list-wrapper'>
              <span className='content-wrapper'>
                <List.Content className='name-wrapper'>
                  Empty...
                </List.Content>
              </span>
            </List.Item>
            )
        }
      </List>
    </Segment>
  )
}

export const TodoListComposed = withHoc(TodoList)
