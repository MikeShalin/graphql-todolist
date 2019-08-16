const graphql = require('graphql');
const Todos = require('../models/todo');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
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
      resolve(parent, args ) {
        return Todos.findById(args.id);
      },
    },
    todos: {
      type: new GraphQLList(TodoType),
      resolve() {
        return Todos.find({});
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: Query,
})
