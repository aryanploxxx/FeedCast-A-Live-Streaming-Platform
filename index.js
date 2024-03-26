const http = require('http')
// To use Web Sockets in the project
const express = require('express')
const path = require('path')
const SocketIO = require('socket.io').Server;
// Imports the Server Class as SocketIO from the package socket.io
const { spawn } = require('child_process');
// Import a child process for ffmpeg

const app = express()
const server = http.createServer(app)

const io = new SocketIO(server)
// We passed our server instance in it
// Now we can use this 'io' to handle our socket events

// These options we have provided to ffmpeg and set all the required values like framerate and bitrate
const options = [
    '-i',
    '-',
    '-c:v', 'libx264',
    '-preset', 'ultrafast',
    '-tune', 'zerolatency',
    '-r', `${25}`,
    '-g', `${25 * 2}`,
    '-keyint_min', 25,
    '-crf', '25',
    '-pix_fmt', 'yuv420p',
    '-sc_threshold', '0',
    '-profile:v', 'main',
    '-level', '3.1',
    '-c:a', 'aac',
    '-b:a', '128k', // audio codec
    '-ar', 128000 / 4, //bitrate
    '-f', 'flv',
    `rtmp://live.twitch.tv/app/live_1057675567_LZWYi7Ia6mWqr8zMGASvYqrCyf3gG9`,
    // Here we will provide the link of the RTMP server
    // We can also provide a path to a file if in case we want to record the video stream
];

/*
    const ffmpegProcess = spawn('ffmpeg', options)
    -> If we run this command directly, we get an error stating that ffmpeg is not installed on our computer
       Which makes sense because we are going to run it using Docker
    -> Therefore, We will run this command using docker-compose
    -> After building docker image, we can run this command freely
    -> After this process, we need to inject the stream in ffmpeg
*/

const ffmpegProcess = spawn('ffmpeg', options);

ffmpegProcess.stdout.on('data', (data) => {
    console.log(`ffmpeg stdout: ${data}`);
});
// To check the output of ffmpegprocess

ffmpegProcess.stderr.on('data', (data) => {
    console.error(`ffmpeg stderr: ${data}`);
});
// To check for any errors

ffmpegProcess.on('close', (code) => {
    console.log(`ffmpeg process exited with code ${code}`);
});


app.use(express.static(path.resolve('./public')))
// This will allow us to keep all our HTML, CSS and JS files int the Public Folders

io.on('connection', socket => {
    console.log('Socket Connected', socket.id);
    socket.on('binarystream', stream => {
        console.log('Binary Stream Incommming...')
        ffmpegProcess.stdin.write(stream, (err) => {
            console.log('Err', err)
        })
        // Injecting the stream in the ffmpegProcess we spawned above
    })
    // We have recieved this stream on backend, now we just have to throw it on ffmpeg
    /*
        Setting up ffmpeg on local pc is a hassle, so to avoid that situation we will use docker
    */
})

server.listen(3000, () => console.log(`HTTP Server is runnning on PORT 3000`))