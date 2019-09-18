var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');const port = new SerialPort('/dev/tty.usbserial-1420', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));// Read the port data
port.on("open", () => {
  console.log('serial port open');
});parser.on('data', data =>{
    io.emit("ev",data);
    console.log("tet", data);
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });

http.listen(3000, function(){
console.log('listening on *:3000');
});

