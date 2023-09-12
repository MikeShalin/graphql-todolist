const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');

const { typeDefs, resolvers } = require('./schema');
const {
  USER,
  PASS,
  URI_DB,
  NAME_DB,
  CONNECTION_PARAMS,
} = require('./config');

mongoose.connect(`mongodb+srv://${USER}:${PASS}@${URI_DB}/${NAME_DB}`, CONNECTION_PARAMS)

const dbConnection = mongoose.connection;

dbConnection.on('error', err => console.error(`Connection error: ${err}`))
dbConnection.once('open', () => console.warn('Connection to db'))

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: process.env.PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
