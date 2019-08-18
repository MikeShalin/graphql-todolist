import React from 'react'

import { ApolloConsumer } from 'react-apollo' //todo в withHoc

import { Button, List } from 'semantic-ui-react'

import { Checkbox } from '../Checkbox'
import { Tooltip } from '../Tooltip'

import { withHoc } from './withHoc'
import { styles } from './styles'
import { checkboxNames } from './config'

type TProps = {
  done: number,
  name: string,
  id: string,
  toggleDone: ({ id, done }: { id: string, done: number }) => void
  deleteTodo: (id: string) => void
  handleDelete: (id: string) => void
  handlerAdd: ({ id, done }: { id: string, done: number }) => void
  toggleShow: (isShow: boolean) => void,
  handleToggleShow: (isShow: boolean) => void,
  isShow: boolean,
}

//todo добавить css для ховера

const Todo = ({
                handlerAdd,
                handleDelete,
                done,
                name,
                handleToggleShow,
                isShow,
                id,
                //@ts-ignore
                handleAddCacheData,
              }: TProps) => (
  <ApolloConsumer>
    {
      client => {
        const data = {
          updateTodoId: id,
          updateTodoName: name,
          updateTodoDone: done,
        }
        return (
          <List.Item style={styles.list}>
          <span style={styles.content}>
            <Checkbox
              name={checkboxNames[done]}
              // @ts-ignore
              onClick={handlerAdd({ id, done: Number(!done) })}
            />
            <List.Content
              style={styles.name}
              onMouseEnter={handleToggleShow(true)}
              onMouseLeave={handleToggleShow(false)}
              onClick={handleAddCacheData(client)(data)}
            >
              {name}
              {
                isShow && (
                  <Tooltip>
                    Click to update
                  </Tooltip>
                )
              }
            </List.Content>
          </span>
            <List.Content floated='right'>
              {
                /**
                 //@ts-ignore **/}
              <Button color='red' onClick={handleDelete(id)}>×</Button>
            </List.Content>
          </List.Item>
        )
      }
    }
  </ApolloConsumer>
)

//@ts-ignore
export const TodoComposed = withHoc(Todo)
