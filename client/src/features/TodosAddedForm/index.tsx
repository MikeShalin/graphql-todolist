import React from 'react'

import { Button, Form, Segment } from 'semantic-ui-react'

import { withHoc } from './withHoc'

type TProps = {
  onChange: ({ target: { value } }: { target: { value: string } }) => void,
  inputValue: string,
  onSubmit: () => void,
}

// @ts-ignore
export const TodosAddedForm = withHoc(({
                                         onChange,
                                         inputValue,
                                         onSubmit,
                                       }: TProps) => (
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
  ),
)
