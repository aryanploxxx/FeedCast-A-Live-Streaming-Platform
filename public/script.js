const userVideo = document.getElementById("user-video")
window.addEventListener('load', async (e)=> {
    const media = await navigator.mediaDevices.getUserMedia({ audio: true, video: true})
    userVideo.srcObject = media
    // This will display the video stream inside the div tag with id:user-video
})