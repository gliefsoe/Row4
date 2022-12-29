const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = 8080;
// store the connection Count
var connectionCount = 0;
// store the WebSocket objects for each client
const clients = {};

app.get('/', (req, res) => {
    // send plain HTML
  //res.send('<h1>Hello world</h1><br>hey hey!');
  // send the index.html file
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    
    // increment the connection count
    connectionCount++;
    // assign a unique identifier to the client
    const clientId = socket.id
    // store the client's WebSocket object
    clients[clientId] = socket;
    console.log('a user connected: ' + clientId + ' count: ' + connectionCount);

    socket.on('disconnect', () => {
      
      connectionCount--;
      console.log('user disconnected: ' + clientId + ' count: ' + connectionCount);
    });
    socket.on('chat message', (msg) => {
        console.log('message from: ' + clientId + ' : ' + msg);
        // emit to all connected sockets
        io.emit('chat message', '(' + clientId + ') : ' + msg);
      });
    socket.on('401 message', (msg) => {
        console.log('401 message from: ' + clientId + ' : ' + msg);
        // emit to all connected sockets
        io.emit('401 message', msg);
      });
  });

server.listen(port, () => {
  console.log('listening on *:' + port);
});