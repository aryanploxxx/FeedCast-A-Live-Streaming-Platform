const userVideo = document.getElementById("user-video")
const startButton = document.getElementById("start-btn")

const state = {media: null}
// Get access to media object globally

startButton.addEventListener('click', (e)=> {
    const mediaRecorder = new MediaRecorder(state.media, {
        audioBitsPerSecond: 128000, // 128 KBps
        videoBitsPerSecond: 2500000, // 250 KBps
        // High BitRate -> Nice Video but High Load on CPU
        // Low BitRate -> Slightly Laggy Video but Low Load on CPU
        framerate: 25
    })
    // MediaRecorder is a feature default available in browser

    mediaRecorder.ondataavailable = ev => {
        // ev is an event only
        console.log('Binary Stream Available', ev.data)
        // After clicking on start button, check the logs to see if binary data is being recorded
        // If successfull, pass this binary stream to the backed servers using sockets
        socket.emit('binarystream', ev.data)
    }

    mediaRecorder.start(25)
    // Start cpaturing at frame-rate 25
})

window.addEventListener('load', async (e)=> {
    const media = await navigator.mediaDevices.getUserMedia({ audio: true, video: true})
    state.media = media
    userVideo.srcObject = media
    // This will display the video stream inside the div tag with id:user-video
})