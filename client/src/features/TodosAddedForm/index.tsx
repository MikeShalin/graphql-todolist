// @ts-ignore
import React from 'react'

import { Button, Form, Segment } from 'semantic-ui-react'

export const TodosAddedForm = () => (
  <Form size='large'>
    <Segment>
      <Form.Input
        icon='idea'
        iconPosition='left'
        placeholder='Write there, please'
        fluid
      />
      <Button color='teal' fluid size='large'>
        Add todo
      </Button>
    </Segment>
  </Form>
)
