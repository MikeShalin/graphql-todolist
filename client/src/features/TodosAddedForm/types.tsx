import React from 'react'
import { ApolloClientOptions } from '../../types'

export type TComponentProps = {
  onChange: ({ target: { value } }: { target: { value: string } }) => void,
  inputValue: string,
  onSubmit: () => void,
}

export type TArgsUpdate = { id: string, name: string, done: number }

export type TClientProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  setInputValue: (value: string) => void,
  addTodo: (name: string) => void,
  inputValue: string,
  updateTodo:  (value: TArgsUpdate) => void,
  data: {
    updateTodoId: null | string,
    updateTodoDone: null | number,
    updateTodoName: null | string,
  },
  client: ApolloClientOptions<{}>,
  onSubmit: () => void,
}
