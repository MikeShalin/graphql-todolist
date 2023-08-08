import React from 'react';

import renderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/react-testing';
import { ApolloProvider } from 'react-apollo';

import { client } from '../../App';
import { Loader } from '../Loader'
import { TodoListComposed as TodoList } from '.';

import { todosQuery } from './queries';

export const mocks = [
  {
    request: {
      query: todosQuery,
      variables: {},
    },
    result: {
      data: {
        todos: { id: '1', name: 'example for tests', done: 0 },
      },
    },
  },
];


it('should render without error', () => {
  renderer.create(
    <ApolloProvider client={client}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <TodoList />
      </MockedProvider>
    </ApolloProvider>,
  );
});

it('should render loading state initially', () => {
  const component = renderer.create(
    <ApolloProvider client={client}>
      <MockedProvider mocks={[]}>
        <TodoList />
      </MockedProvider>
    </ApolloProvider>,
  );
  
  const loader = renderer.create(<Loader />);
  
  const tree = component.toJSON();
  const loaderTree = loader.toJSON();
  expect(tree.children).toEqual(loaderTree.children);
});
