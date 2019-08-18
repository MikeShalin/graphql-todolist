import { compose } from 'recompose' //todo сделать на хуках
import { graphql } from 'react-apollo'

import { todosQuery } from './queries'

export const withHoc = compose(graphql(todosQuery))
