import React from 'react'

import { Dimmer, Loader as LoaderUI } from 'semantic-ui-react'

export const Loader = () => (
  <Dimmer active style={{
    position: 'fixed', //todo придумать как сделать - styled components or..
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
  }}>
    <LoaderUI>Loading</LoaderUI>
  </Dimmer>
)
