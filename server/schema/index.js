const graphql = require('graphql');
const Todo = require('../models/todo');
const { PubSub } = require('graphql-subscriptions');
const { makeExecutableSchema } = require ('graphql-tools');

const pubsub = new PubSub();

const typeDefs = `
type Todo {
  id: ID
  name: String
  done: Int
}

type Query {
  todo: Todo
  todos: [Todo]
}
type Mutation {
  addMessage(message: String!, broadcast: Boolean!): [String!]!
}
type Subscription {
  newMessage(userId: Int!): String!
}
`;

const resolvers = {
  Query: {
    todo(parent, args) {
      return Todo.findById(args.id);
    },
    todos() {
      return Todo.find({});
    },
  },
  Mutation: {
    toggleDone(parent, args) {
      pubsub.publish('newMessage', { entry: args, });
      return Todo.findByIdAndUpdate(
        args.id,
        { $set: { done: args.done } },
        { new: true },
      )
    },

    addTodo(parent, { name }) {
      const todo = new Todo({ name, done: 0 })
      return todo.save()
    },

    deleteTodo(parent, args) {
      return Todo.findByIdAndRemove(args.id)
    },

    todoUpdateName(parent, args) {
      return Todo.findByIdAndUpdate(
        args.id,
        { $set: { name: args.name, done: args.done } },
        { new: true },
      )
    },
  },
  Subscription: {
    newMessage(message, variables, context, subscription) {
      console.log(`Serving subscription for user ${variables.userId}`, { message, variables });
      return message.entry;
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = { pubsub, schema, resolvers };