const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = 8080;

app.get('/', (req, res) => {
    // send plain HTML
  //res.send('<h1>Hello world</h1><br>hey hey!');
  // send the index.html file
  res.sendFile(__dirname + '/index.html');
});

server.listen(port, () => {
  console.log('listening on *:' + port);
});