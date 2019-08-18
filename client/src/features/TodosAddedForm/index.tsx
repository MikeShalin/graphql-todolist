// @ts-ignore
import React from 'react'

import { Button, Form, Segment } from 'semantic-ui-react'

import { withHoc } from './withHoc'

type TProps = {
  addTodo: ({ name }: { name: string }) => void,
  inputValue: string,
  onChange: ({ target: { value } }: { target: { value: string } }) => void,
  clearInput: () => void,
  onSubmit: () => void,
  data: {
    updateTodoId: null | string,
    updateTodoName: null | string,
    updateTodoDone: null | number,
  }
}

//todo добавить загрузку
// @ts-ignore
export const TodosAddedForm = withHoc(({
                                         onChange,
                                         inputValue,
                                         onSubmit,
                                         data: {
                                           //   updateTodoId,
                                           updateTodoName,
                                           //   updateTodoDone,
                                         },
                                       }: TProps) => {
  return (
    <Form size='large' onSubmit={onSubmit}>
      <Segment>
        <Form.Input
          icon='idea'
          iconPosition='left'
          placeholder='Write there, please'
          onChange={onChange}
          value={inputValue}
          fluid
        />
        <Button color='teal' fluid size='large'>
          Add todo
        </Button>
      </Segment>
    </Form>
  )
})
