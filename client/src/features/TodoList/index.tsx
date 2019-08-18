import React from 'react'

//@ts-ignore
import map from 'lodash/map'
import { List, Button, Segment } from 'semantic-ui-react'

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
    <Segment>
      <List divided relaxed verticalAlign='middle'>
        {
          map(todos, ({ id, name, done }: TTodo) => (
            <List.Item
              key={id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  cursor: 'pointer'
                }}
                onClick={() => toggleDone({ id, done: Number(!done) })}
              >
                <Checkbox name={checkboxNames[done]} />
                <List.Content>{name}</List.Content>
              </span>
              <List.Content floated='right'>
                <Button color='red'>×</Button>
              </List.Content>
            </List.Item>
          ))
        }
      </List>
    </Segment>
  )
}

//@ts-ignore
export const TodoListComposed = withHoc(TodoList)
