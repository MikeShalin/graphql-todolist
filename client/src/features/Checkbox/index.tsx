import React from 'react'

import { List } from 'semantic-ui-react'

type TProps = { name: 'check square' | 'square outline'}

export const Checkbox = (props: TProps) => (
  <List.Icon size='large' verticalAlign='middle' {...props}/>
)
