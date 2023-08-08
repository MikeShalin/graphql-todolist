import { ApolloLink, DocumentNode } from 'apollo-link'

import { ApolloCache } from 'apollo-cache'

export type Todo = {
  id: string,
  name: string,
  done: number,
}

export type Todos = {
  todos: Array<Todo>
}

export interface DefaultOptions {
  watchQuery?: Partial<{}>,
  query?: Partial<{}>,
  mutate?: Partial<{}>,
}

export type ApolloClientOptions<TCacheShape> = {
  link?: ApolloLink,
  cache: ApolloCache<TCacheShape>,
  ssrForceFetchDelay?: number,
  ssrMode?: boolean,
  connectToDevTools?: boolean,
  queryDeduplication?: boolean,
  defaultOptions?: DefaultOptions,
  assumeImmutableResults?: boolean,
  name?: string,
  version?: string,
  readQuery: (value: { query: DocumentNode }) => { todos: Array<Todo> },
}
