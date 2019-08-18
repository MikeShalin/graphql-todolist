import React from 'react'

//@ts-ignore
import map from 'lodash/map'
import { List, Segment } from 'semantic-ui-react'

import { Loader } from '../Loader'
import { TodoComposed as Todo } from '../Todo'

import { withHoc } from './withHoc'

type TTodo = { id: string, name: string, done: number }
type TProps = {
  data: {
    todos: void | Array<TTodo>,
    loading: boolean,
    error: Error,
  },
  toggleDone: ({ id, done }: { id: string, done: number }) => void
  deleteTodo: (id: string) => void
  handleDelete: (id: string) => void
  handlerAdd: ({ id, done }: { id: string, done: number }) => void
}

//todo добавить css для ховера

const TodoList = ({
                    data: {
                      todos,
                      loading,
                      error,
                    },
                  }: TProps) => {
  if (loading) return <Loader />
  if (error) return <span>error: {String(error)}</span>
  return (
    <Segment>
      <List divided relaxed verticalAlign='middle'>
        {
          map(todos, ({ id, name, done }: TTodo) =>(
            //@ts-ignore
            <Todo
              key={id}
              done={done}
              name={name}
              id={id}
            />
          ))
        }
      </List>
    </Segment>
  )
}

//@ts-ignore
export const TodoListComposed = withHoc(TodoList)
