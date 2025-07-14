const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 3000 });

let clients = [];

server.on('connection', (socket) => {
  clients.push(socket);

  socket.on('message', (message) => {
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  socket.on('close', () => {
    clients = clients.filter(c => c !== socket);
  });
});

console.log("✅ WebSocket server running at ws://localhost:3000");
