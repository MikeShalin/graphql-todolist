import './todo.scss'

import React from 'react'

import { Button, List } from 'semantic-ui-react'

import { Checkbox } from '../Checkbox'
import { Tooltip } from '../Tooltip'

import { withHoc } from './withHoc'
import { checkboxNames } from './config'


type TProps = {
  done: number,
  name: string,
  id: string,
  handleDelete: (id: string) => () => void,
  handlerAdd: ({ id, done }: { id: string, done: number }) => () => () => void,
  handleAddCacheData: () => void
}

const Todo = ({
                handlerAdd,
                handleDelete,
                done,
                name,
                id,
                handleAddCacheData,
              }: TProps) => (
  <List.Item className='list-wrapper'>
    <span className='content-wrapper'>
      <Checkbox
        name={checkboxNames[done]}
        onClick={handlerAdd({ id, done: Number(!done) })}
      />
      <List.Content
        className='name-wrapper'
        onClick={handleAddCacheData}
      >
        {name}
        <Tooltip className='tooltip-wrapper'>
          Click to update
        </Tooltip>
      </List.Content>
     </span>
    <List.Content floated='right'>
      <Button color='red' onClick={handleDelete(id)}>×</Button>
    </List.Content>
  </List.Item>
)

//@ts-ignore
export const TodoComposed = withHoc(Todo)
