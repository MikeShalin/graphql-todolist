import React, { ReactFragment } from 'react'

import { Grid, Header, Image } from 'semantic-ui-react'

import './wrapper.scss'

export const AppWrapper = ({ children }: { children: ReactFragment }) => (
  <Grid textAlign='center' className='main-wrapper' verticalAlign='middle'>
    <Grid.Column className='column-wrapper'>
      <Header as='h2' color='teal' textAlign='center'>
        <Image src='/logo192.png' /> Graphql && Apollo todolist
      </Header>
      {children}
    </Grid.Column>
  </Grid>
)