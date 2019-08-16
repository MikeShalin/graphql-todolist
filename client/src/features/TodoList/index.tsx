import React from 'react'

//@ts-ignore
import map from 'lodash/map'
//@ts-ignore
import { compose } from 'recompose' //todo сделать на хуках
import { graphql } from 'react-apollo'
import { List, Container } from 'semantic-ui-react'

import { Loader } from '../Loader'
import { Checkbox } from '../Checkbox'
import { todosQuery } from './queries'
import { checkboxNames } from './config'

type TTodo = { id: string, name: string, done: number }
type TProps = {
  data: {
    todos: void | Array<TTodo>,
    loading: boolean,
    error: Error,
  }
}

const TodoList = ({ data: { todos, loading, error } }: TProps) => {
  if (loading) return <Loader />
  if (error) return <span>error: {String(error)}</span>
  return (
    <Container>
      <List divided relaxed>
        {
          map(todos, ({ id, name, done }: TTodo) => (
            <List.Item key={id}>
              <Checkbox name={checkboxNames[done]}/>
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
export const TodoListComposed = compose(graphql(todosQuery))(TodoList)
