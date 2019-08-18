const graphql = require('graphql');
const Todo = require('../models/todo');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql

const TodoType = new GraphQLObjectType({
  name: 'todo',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    done: { type: GraphQLInt },
  }),
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    todo: {
      type: TodoType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Todo.findById(args.id);
      },
    },
    todos: {
      type: new GraphQLList(TodoType),
      resolve() {
        return Todo.find({});
      },
    },
  },
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    toggleDone: {
      type: TodoType,
      args: {
        id: { type: GraphQLID },
        done: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return Todo.findByIdAndUpdate(
          args.id,
          { $set: { done: args.done } },
          { new: true },
        )
      },
    },

    addTodo: {
      type: TodoType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, { name }) {
        const todo = new Todo({ name, done: 0 })
        return todo.save()
      },
    },

    deleteTodo: {
      type: TodoType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Todo.findByIdAndRemove(args.id)
      }
    }
  },
})

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
})
