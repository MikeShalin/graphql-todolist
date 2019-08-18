// @ts-ignore
import React, { ReactFragment } from 'react'

import { Grid, Header, Image } from 'semantic-ui-react'

export const AppWrapper = ({ children }: { children: ReactFragment }) => (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        <Image src='/logo192.png' /> Graphql && Apollo todolist
      </Header>
      {children}
    </Grid.Column>
  </Grid>
)