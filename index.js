const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const port = 8080;

app.get('/', (req, res) => {
    // send plain HTML
  //res.send('<h1>Hello world</h1><br>hey hey!');
  // send the index.html file
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        // emit to all connected sockets
        io.emit('chat message', msg);
      });
  });

server.listen(port, () => {
  console.log('listening on *:' + port);
});