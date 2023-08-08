const express = require('express');
const app = express();

app.use(express.static('client/build'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/build/index.html');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
