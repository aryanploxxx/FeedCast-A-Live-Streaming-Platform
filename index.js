const http = require('http')
// To use Web Sockets in the project
const express = require('express')
const path = require('path')
const SocketIO = require('socket.io').Server;
// Imports the Server Class as SocketIO from the package socket.io

const app = express()
const server = http.createServer(app)

app.use(express.static(path.resolve('./public')))
// This will allow us to keep all our HTML, CSS and JS files int the Public Folders

server.listen(3000, () => console.log("Server is running on port 3000!"))