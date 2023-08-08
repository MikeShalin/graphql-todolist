export type TComponentProps = {
  done: number,
  name: string,
  id: string,
  handleDelete: (id: string) => () => void,
  handlerAdd: ({ id, done, name }: { id: string, done: number, name: string }) => () => () => void,
  handleAddCacheData: () => void,
}

export type TCommonParams = {
  id: number,
  done: number,
  name: string,
}

export type THandlerAdd = (params: TCommonParams) => () => void

export type TTodoOuter = {
  id: string,
  name: string,
  done: number,
}

export type TTodoInner = {
  client: {
    writeData: ({ data: {}}) => void,
  },
  deleteTodo: (id: string) => void,
  handlerAdd: THandlerAdd,
  handleAddCacheData: () => void,
  handleDelete: (id: string) => () => void,
  toggleDone: (params: TCommonParams) => void,
}

export type TTodo = TTodoInner & TTodoOuter
