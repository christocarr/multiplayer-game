const http = require('http');
const express = require('express');

const app = express();

app.use(express.static(`${__dirname}/../public`));

const server = http.createServer(app);

server.on('error', (err) => {
  console.error(err);
});

server.listen(8080, () => {
  console.log('server is ready');
});
