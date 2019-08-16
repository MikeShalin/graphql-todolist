import React from 'react'

//@ts-ignore
import map from 'lodash/map'
import { List, Container } from 'semantic-ui-react'

import { Loader } from '../Loader'
import { Checkbox } from '../Checkbox'
import { withHoc } from './withHoc'
import { checkboxNames } from './config'

type TTodo = { id: string, name: string, done: number }
type TProps = {
  data: {
    todos: void | Array<TTodo>,
    loading: boolean,
    error: Error,
  },
  toggleDone: ({ id, done }: { id: string, done: number }) => void
}

const TodoList = ({ data: { todos, loading, error }, toggleDone }: TProps) => {
  if (loading) return <Loader />
  if (error) return <span>error: {String(error)}</span>
  return (
    <Container>
      <List divided relaxed>
        {
          map(todos, ({ id, name, done }: TTodo) => (
            <List.Item key={id} onClick={() => toggleDone({ id, done: Number(!done) })}>
              <Checkbox name={checkboxNames[done]} />
              <List.Content>
                <List.Header as='a'>{name}</List.Header>
              </List.Content>
            </List.Item>
          ))
        }
      </List>
    </Container>
  )
}

//@ts-ignore
export const TodoListComposed = withHoc(TodoList)
