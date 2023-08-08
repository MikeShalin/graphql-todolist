import React from 'react';
import renderer from 'react-test-renderer';

import { ApolloProvider } from 'react-apollo';

import { TodoComposed as Todo } from './index';
import { client } from '../../App';

it('should render without error', () => {
  const props = {
    done: 1,
    name: 'example for tests',
    id: '1',
  };
  
  renderer.create(
    <ApolloProvider client={client}>
      <Todo {...props} />
    </ApolloProvider>,
  );
});
