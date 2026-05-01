import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import gameRoutes from "./src/routes/gameRoutes";
import { getGameState } from "./src/store/gameStore";
import { getSocketEvent, setSocketServer } from "./src/sockets/socket";

const app = express();
const port = 4000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

setSocketServer(io);

app.use(cors());
app.use(express.json());
app.use("/", gameRoutes);

io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  socket.emit(getSocketEvent(), getGameState());

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
