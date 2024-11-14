const http = require('http');
const express = require('express');
const {Server} = require('socket.io');
const app = express();
const path = require('path');

const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket)=>{
    
    console.log("user connected", socket.id);
    socket.on("message", (message) => {
      console.log("a new user message", message);
      io.emit("message", message);
    });
})
// middlewares 
const PORT = 9000;
app.use(express.static("./public"));

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "index.html"));

})

server.listen(PORT, ()=>{
    console.log("server is listening on port", PORT);
})

