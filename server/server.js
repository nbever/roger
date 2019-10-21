const express = require('express');
const ws = require('express-ws');
const path = require('path');

const port = 8000;

const server = new express();
const serverWs = ws(server);

server.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')));

server.get('/api', (req, resp) => {
  resp.send('good to go');
});

server.get('*', (req, resp) => {
  resp.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'));
});

server.listen(port, () => {
  console.log(`Roger server running on ${port}`);
});
