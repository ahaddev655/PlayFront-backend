import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import createUserTable from "./database/user_table.js";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

app.use(cors());
app.use(express.json());

// Tables
createUserTable();

// Socket.io
io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);
  socket.on("disconnect", () =>
    console.log("🔴 Socket disconnected:", socket.id),
  );
});

const port = process.env.PORT || 9000;
server.listen(port, () => console.log(`🚀 Server running on port ${port}`));
