const express = require('express');
const expressSession = require('express-session');
const ws = require('express-ws');
const path = require('path');
const fs = require('fs');
const isNil = require('lodash/isNil');
const moment = require('moment');

const port = 8000;

const server = new express();
const serverWs = ws(server);
let wsResp = null;

const authDomain = JSON.parse(fs.readFileSync(
  path.resolve(__dirname, 'data', 'credentials.json')
));

const calls = JSON.parse(fs.readFileSync(
  path.resolve(__dirname, 'data', 'calls.json')
));

server.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')));
server.use(express.json());
server.use(expressSession({name: 'userSesson', secret: 'SPD', saveUninitialized: false, resave: false}));

const sortCalls = (a, b) => {

  const mA = moment(a.date);
  const mB = moment(b.date);

  return mA.isBefore(mB) ?
    1
    :
    mA.isAfter(mB) ?
      -1
      :
      0;
};

server.get('/api', (req, resp) => {
  resp.send('good to go');
});

server.post('/api/login', (req, resp) => {
  const user = authDomain.users.find((user) => {
    return req.body.username === user.username
  });

  if (isNil(user) || user.password !== req.body.password) {
    resp.status(401).send('Unauthorized');
    return;
  }

  const {password, ...noPass} = user;
  req.session.auth = user;
  resp.send(JSON.stringify(noPass));
});

server.put('/api/logout', (req, resp) => {
  req.session.auth = null;
  resp.send('OK');
});

server.get('/api/calls', (req, resp) => {
  calls.calls.sort(sortCalls);
  resp.send(JSON.stringify(calls));
});

server.post('/api/call', (req, resp) => {
  calls.calls.sort(sortCalls);
  const nextCallId = calls.calls.length > 0 ?
    parseInt(calls.calls[calls.calls.length - 1].callId) + 1
    :
    1;

  const call = req.body;
  call.callId = nextCallId;
  call.status = 'OPEN';
  calls.calls.push(call);
  resp.send('OK');

  serverWs.getWss().clients.forEach((client) => {
    client.send(JSON.stringify({action: 'NEW', call}));
  });
})

server.put('/api/call/:callId', (req, resp) => {
  const callIndex = calls.calls.findIndex((pCall) => {
    return pCall.id = parseInt(req.params.callId);
  });

  if (callIndex === -1) {
    resp.status(400).send('Call ID does not exist');
    return;
  }

  calls.calls[callIndex] = req.body;
  resp.send('OK');
});

server.put('/api/assign/:user/:callId', (req, resp) => {

  const user = authDomain.users.find((user) => {
    return user.username === req.params.user;
  });

  const call = calls.calls.find((pCall) => {
    return pCall.id === parseInt(req.params.callId);
  });

  if (isNil(user)) {
    console.log(`User ${req.params.user} not found.`);
    resp.status(400).send('Call is unassignable');
    return;
  }

  if (isNil(call)) {
    console.log(`Call ${req.params.callId} not found.`);
    resp.status(400).send('Call is unassignable');
    return;
  }

  call.assignee = req.params.user;
  resp.send(JSON.stringify(call));
});

server.delete('/api/call/:callId', (req, resp) => {
  const newCalls = calls.calls.filter((pCall) => {
    return pCall.callId !== parseInt(req.params.callId);
  });

  calls.calls = newCalls;
  resp.send('OK');
});

server.ws('/ws', (ws, req) => {
  wsResp = ws;

  ws.on('message', (msg) => {
    console.log(msg);
  });
});

server.get('*', (req, resp) => {
  resp.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'));
});

server.listen(port, () => {
  console.log(`Roger server running on ${port}`);
});

process.on('SIGINT', () => {
  fs.writeFileSync(path.resolve(__dirname, 'data', 'calls.json'),
    JSON.stringify(calls), {flag: 'w'});

  process.exit();
});
