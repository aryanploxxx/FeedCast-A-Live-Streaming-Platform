# FeedCast

FeedCast is a live streaming platform that enables users to easily broadcast live video content to various social media platforms such as Twitch, YouTube and Facebook, along with custom RTMP destinations. It takes stream input from the user's camera, converts it into a binary stream, passes it to the backend via web sockets, and then pass it to the RTMP server using ffmpeg.

### Technologies Used
- **Node.js**: The server-side runtime for running the chat server.
- **Socket.io**: A JavaScript library that enables real-time, bidirectional, and event-based communication between the browser and the server.
- **Docker**
- **HTML, CSS**: The front-end structure and styling of the chat application.

### Installation

To install and run the project, follow these steps:
1. Ensure you have Docker installed on your system.
2. Clone the repository:
   
   ```bash
   $ git clone https://github.com/aryanploxxx/FeedCast-A-Live-Streaming-Platform.git
   $ npm i express nodemon socket.io
   $ docker compose up 

### Usage

1. After running the project, open a web browser and navigate to http://localhost:3000.
2. Enter the RTMP Server Address in the text box.
3. Click on the "Start Streaming" button to begin broadcasting your live stream.
4. Your live stream will now be broadcasted to the specified destinations.
