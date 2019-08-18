import React from 'react'

import { List } from 'semantic-ui-react'

type TProps = {
  name: 'check square' | 'square outline',
  onClick: ({ id, done }: { id: string, done: number }) => () => void,
}

export const Checkbox = (props: TProps) => (
  <List.Icon size='large' verticalAlign='middle' {...props} />
)
