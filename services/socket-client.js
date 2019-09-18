const io = require('socket.io-client');

var socket = io('ws://192.168.3.209:3000/', {
    transports: ['websocket'],
  });
 
//Connect
connection = socket.connect();


socket.on('connect', () => {
    console.log('connectasded ')
});


console.log("TEST")

export default socket;