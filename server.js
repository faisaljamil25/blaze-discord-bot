const express = require('express');

const server = express();

server.all('/', (req, res) => {
  res.send('Blaze is flying...');
});

const PORT = process.env.PORT || 8000;

function keepAlive() {
  server.listen(PORT, () => {
    console.log('Server is ready');
  });
}

module.exports = keepAlive;
