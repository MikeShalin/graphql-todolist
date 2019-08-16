const express = require('express');
const grapqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');

const schema = require('./schema');
const {
  USER,
  PASS,
  URI_DB,
  NAME_DB,
  CONNECTION_PARAMS,
} = require('./config');

const app = express();
const PORT = 3005;

mongoose.connect(`mongodb+srv://${USER}:${PASS}@${URI_DB}/${NAME_DB}`, CONNECTION_PARAMS)

app.use(cors())

app.use('/graphql', grapqlHTTP({
  schema,
  graphiql: true,
}))

const dbConnection = mongoose.connection;

dbConnection.on('error', err => console.error(`Connection error: ${err}`))
dbConnection.once('open', () => console.warn('Connection to db'))

app.listen(PORT, err => {
  err ? console.error(err) : console.log('server started!');
})