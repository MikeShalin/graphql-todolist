const express = require('express');
const grapqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const { createServer } = require('http');
const { schema } = require('./schema');
const {
  USER,
  PASS,
  URI_DB,
  NAME_DB,
  CONNECTION_PARAMS,
} = require('./config');

const PORT = 3005;

const appWS = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});

appWS.listen(PORT, () => {
  console.log(`Websocket listening on port 5000`)
});

const app = express();
const subscriptionsEndpoint = 'subscriptions';

mongoose.connect(`mongodb+srv://${USER}:${PASS}@${URI_DB}/${NAME_DB}`, CONNECTION_PARAMS)

app.use(cors())

app.use('/graphql', grapqlHTTP({
  schema,
  graphiql: true,
  subscriptionsEndpoint: `ws://localhost:5000/${subscriptionsEndpoint}`,
  endpointURL: '/graphql',
  query: 'query { messages }'
}));

const dbConnection = mongoose.connection;

dbConnection.on('error', err => console.error(`Connection error: ${err}`))
dbConnection.once('open', () => console.warn('Connection to db'))


app.listen(4000, () => {
  console.log(`Server listening on port 5060`);
});
