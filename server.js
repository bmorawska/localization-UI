var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log('My socket server is running on http://127.0.0.1:3000.')

var io = socket(server, {
    cors: {
        origin: "http://127.0.0.1:3000",
        methods: ["GET", "POST"],
        credentials: true,
    },
});


io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log('new connection: ' + socket.id);

    socket.on('position', tagMsg);
    function tagMsg(data) {
        socket.broadcast.emit('position', data);
        console.log(data);
    }

    socket.on('anchors', anchorMsg);
    function anchorMsg(data) {
        socket.broadcast.emit('anchors', data);
        console.log("ANCHORS:")
        console.log(data);
    }

    socket.on('frame', imgMsg);
    function imgMsg(data) {
        const frame = Buffer.from(data, 'base64').toString()
        socket.broadcast.emit('frame', frame);
    }

    socket.on('error', errorMsg);
    function errorMsg(data) {
        socket.broadcast.emit('error', data);
        console.log(data);
    }   
}
