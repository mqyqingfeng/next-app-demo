import { createServer } from "node:http";
import express from "express";
import next from "next";
import { Server } from "socket.io";
import schedule from 'node-schedule'

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {

  const server = express();
  const httpServer = createServer(server);
  const io = new Server(httpServer);
  const roomId = 'room';

  const job = schedule.scheduleJob("*/10 * * * * *", () => {
      io.in(roomId).emit("receive_msg", {
        user: 'bot',
        msg: 'Hello!'
      });
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    socket.join(roomId);
    
    socket.on("send_msg", (data) => {
      console.log(data, "DATA");
      io.in(roomId).emit("receive_msg", data);
    });
  });

  io.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });

  server.all('*', (req, res) => {
    return handler(req, res);
  });

  httpServer.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

});