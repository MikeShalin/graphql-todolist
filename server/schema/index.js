const Todo = require('../models/todo');

const { PubSub } = require('apollo-server');

const pubsub = new PubSub();

const typeDefs = `
type Todo {
  id: ID
  name: String
  done: Int
}

type Subscription {
  addedTodo(id: ID, done: Int, name: String): Todo
  deletedTodo(id: ID): Todo
  toggledDone(id: ID, done: Int): Todo
  updatedName(id: ID, done: Int, name: String): Todo
}

type Query {
  todo: Todo
  todos: [Todo]
}

type Mutation {
  toggleDone(id: ID, done: Int, name: String): Todo
  addTodo(name: String): Todo
  deleteTodo(id: ID): Todo
  todoUpdateName(id: ID, done: Int, name: String): Todo
}
`;

const TOGGLED_DONE = 'TOGGLED_DONE';
const UPDATED_NAME = 'UPDATED_NAME';
const ADDED_TODO = 'ADDED_TODO';
const DELETED_TODO = 'DELETED_TODO';

const resolvers = {
  Subscription: {
    addedTodo: {
      subscribe: () => pubsub.asyncIterator([ADDED_TODO]),
    },
    deletedTodo: {
      subscribe: () => pubsub.asyncIterator([DELETED_TODO]),
    },
    toggledDone: {
      subscribe: () => pubsub.asyncIterator([TOGGLED_DONE]),
    },
    updatedName: {
      subscribe: () => pubsub.asyncIterator([UPDATED_NAME]),
    },
  },
  Query: {
    todo: (_, { id }) => Todo.findById(id),
    todos: () => Todo.find({}),
  },
  Mutation: {
    toggleDone: (_, { id, done, name }) => {
      pubsub.publish(TOGGLED_DONE, { toggledDone: { id, done, name } })
      return Todo.findByIdAndUpdate(
        id,
        { $set: { done } },
        { new: true },
      );
    }
    ,

    addTodo: (_, { name }) => {
      const args = { name, done: 0 }
      const todo = new Todo(args);
      return todo.save((_,{ id }) => (
        pubsub.publish(ADDED_TODO, { addedTodo: { ...args, id } })
      ));

    },

    deleteTodo: (_, { id }) => {
      pubsub.publish(DELETED_TODO, { deletedTodo: { id } });
      return Todo.findByIdAndRemove(id);
    },

    todoUpdateName: (_, {
      id,
      name,
      done,
    }) => {
      pubsub.publish(UPDATED_NAME, {
        updatedName: {
          id,
          name,
          done,
        },
      });
      return Todo.findByIdAndUpdate(
        id,
        { $set: { name, done } },
        { new: true },
      );
    },
  },
};

module.exports = { typeDefs, resolvers };