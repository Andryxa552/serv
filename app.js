const express = require('express');
const {ExpressPeerServer} = require('peer');
const cors = require('cors')
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = 8878;
const {Server} = require("socket.io");

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});


const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: '/myapp'
});

app.use(cors())
app.use('/peerjs', peerServer);

io.on('connection', (socket) => {
    socket.on('message', (message) => {
        console.log(message)
        io.emit('message', message)
    })
});

server.listen(process.env.PORT || port);