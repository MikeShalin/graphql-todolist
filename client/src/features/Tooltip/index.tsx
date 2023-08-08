import React from 'react'

import { Label } from 'semantic-ui-react'

type TProps = {
  children: string,
  className: string,
}

export const Tooltip = ({ children, className }: TProps) => (
  <Label basic color='red' pointing className={className} >
    {children}
  </Label>
)
