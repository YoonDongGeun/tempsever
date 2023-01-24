import express from 'express';
import http from 'http';
import WebSocket from 'ws';
const app = express();

// app.set("view engine", "pug");
// app.set("views", __dirname + "/views");
// app.use("/public", express.static(__dirname + "/public"));
// app.get("/api", (req, res) => res.json({one : 1, two : 2, three : 3}));
// server.get("/api", (req, res) => res.redirect('/abc'));
// server.get('/abc', (req,res) => res.json({"hello":"world"}));
// app.get("/api", (req, res) => res.json({ "users": ["userOne", "userTwo", "userThree"]}));

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

const sockets = []

wss.on("connection",(socket)=>{
  // 시작하면 받는다.(1번만 실행되니까)
  sockets.push(socket);
  console.log('Connected to the browser✅')
  socket.on("close", () => {
    console.log('Disconnected from the Browser❌')
  })
  socket.on("message", (message) => {
    // socket.send(message.toString())
    console.log(message.data)
    console.log(message)
    sockets.forEach((aSocket) => {aSocket.send(message)})

  });
  // socket.send("서버에서 데이터 보냈다! 받았니?");
})

// 현재 서버 주소의 5000번 포트로 받아오기.
server.listen(5000, () => { 
  console.log("server started💨")

})
// app.listen(5000, handleListen)