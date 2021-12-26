const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hi there, welcome to new env.');
});

app.listen(8080-9, () => {
  console.log('Listening on port 8080');
});
