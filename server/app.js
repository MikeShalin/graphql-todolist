const express = require('express');

const app = express();
const PORT = 3005;

app.listen(PORT, err => {
  err ? console.error(err) : console.log('server started!');
})