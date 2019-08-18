import React from 'react'

import { Label } from 'semantic-ui-react'

import { styles } from './styles'

export const Tooltip = ({ children }: { children: string }) => (
  <Label basic color='red' pointing style={styles.label}>
    {children}
  </Label>
)
