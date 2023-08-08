import React from 'react'

import { List } from 'semantic-ui-react'

import { THandlerAdd } from '../Todo/types'

type TProps = {
  name: 'check square' | 'square outline',
  onClick: THandlerAdd,
}

export const Checkbox = (props: TProps) => (
  <List.Icon size='large' verticalAlign='middle' {...props} />
)
