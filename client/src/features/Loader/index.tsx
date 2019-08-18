import React from 'react'

import { Dimmer, Loader as LoaderUI } from 'semantic-ui-react'

import './loader.scss'

export const Loader = () => (
  <Dimmer active className='loader-wrapper'>
    <LoaderUI>Loading</LoaderUI>
  </Dimmer>
)
