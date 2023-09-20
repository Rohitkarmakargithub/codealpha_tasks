const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3030 });

server.on('connection', (socket) => {
  console.log('A new client connected');

  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Broadcast the message to all connected clients
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  socket.on('close', () => {
    console.log('A client disconnected');
  });
});
