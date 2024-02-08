import React from 'react'

import { Button, Form, Segment } from 'semantic-ui-react'

import { withHoc } from './withHoc'
import { TComponentProps } from './types'

const TodosAddedForm = ({
                          onChange,
                          inputValue,
                          onSubmit,
                        }: TComponentProps) => (
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
      <Button
        color='teal'
        size='large'
        disabled={!inputValue}
        fluid
      >
        Add todo
      </Button>
    </Segment>
  </Form>
)
// @ts-ignore
export const TodosAddedFormComposed = withHoc(TodosAddedForm)