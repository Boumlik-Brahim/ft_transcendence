const io = require('socket.io-client');

// Connect to the server
const socket = io('http://localhost:3000'); // Replace the URL with your server's URL

// Receive message from the server
socket.on('', (msg) => {
  console.log('Received message:', msg);
});

// Send message to the server
function sendMessage(message) {
  socket.emit('createGame', message);
}

// Example usage: sending a message to the server
sendMessage('Hello, server!');