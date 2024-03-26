const http = require('http')
// To use Web Sockets in the project
const express = require('express')
const path = require('path')
const SocketIO = require('socket.io').Server;
// Imports the Server Class as SocketIO from the package socket.io

const app = express()
const server = http.createServer(app)

const io = new SocketIO(server)
// We passed our server instance in it
// Now we can use this 'io' to handle our socket events

app.use(express.static(path.resolve('./public')))
// This will allow us to keep all our HTML, CSS and JS files int the Public Folders

io.on('connection', socket => {
    console.log("Socekt Connected: ", socket.id)
    socket.on('binarystream', stream => {
        console.log('Binary Stream Incoming!')
    })
    // We have recieved this stream on backend, now we just have to throw it on ffmpeg
})

server.listen(3000, () => console.log("Server is running on port 3000!"))