import {
  ApolloClientOptions,
  Todo,
  Todos,
} from '../../types'
import { ChildDataProps } from 'react-apollo'

export type TTodo = { id: string, name: string, done: number }
export type TComponentProps = {
  data: {
    todos: void | Array<TTodo>,
    loading: boolean,
    error: Error,
  },
  toggleDone: (todo: { id: string, done: number }) => void,
  deleteTodo: (id: string) => void,
  handleDelete: (id: string) => void,
  handlerAdd: ({ id, done }: { id: string, done: number }) => void,
  client: ApolloClientOptions<{}>,
}

export type TAddedInputProps =  {
  client: ApolloClientOptions<{}>,
  data: Todos
}

export type TDeletedInputProps =  {
  client: ApolloClientOptions<{}>,
  data: Todos
}

export type TAddedResponse = { addedTodo?: Todo }

export type TDeletedResponse = { deletedTodo?: Todo }

export type TAddedChildProps = ChildDataProps<TAddedResponse, Response, {}> | undefined | null | false;

export type TDeletedChildProps = ChildDataProps<TDeletedResponse, Response, {}> | undefined | null | false;
