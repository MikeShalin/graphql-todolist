import React from 'react'

import { Dimmer, Loader as LoaderUI } from 'semantic-ui-react'

export const Loader = () => (
  <Dimmer active>
    <LoaderUI>Loading</LoaderUI>
  </Dimmer>
)
