const mongose = require('mongoose');
const Schema = mongose.Schema;

const todoSchema = new Schema({
  name: String,
  done: Number,
});

module.exports = mongose.model('Todo', todoSchema);