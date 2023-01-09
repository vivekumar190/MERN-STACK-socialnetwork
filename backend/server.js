const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnect = require("./config/DB/dbConnect");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users/userRoutes");
const postRoutes = require("./routes/posts/postRoutes");
const societyRoutes = require("./routes/Society/SocietyRoutes");
const categoryRoutes = require("./routes/category/categoryRoutes");
const commentRoutes = require("./routes/comments/commentRoutes");
const { errorHandler, notFound } = require("./middleware/error/errorHandler");
const path = require("path");
// const notFound=require('./middleware/error/errorHandler');
const http = require("http");
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
// socket io
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

dotenv.config();

dbConnect();

app.use(express.json());
//cors
app.use(cors());

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//custom middle ware if any

//User middleware
app.use("/api/users", userRoutes);
//post mideele ware
app.use("/api/posts", postRoutes);
//comment middleware
app.use("/api/comments", commentRoutes);
//category routes
app.use("/api/category", categoryRoutes);
//society routes
app.use("/api/society", societyRoutes);
app.use(notFound);
//err handler

// socket event
io.on("connection", (socket) => {
  console.log("New Socket connected");
  socket.emit("message", "Welcome to chat");
  socket.broadcast.emit("message", "New User Joined");
  socket.on("chatMessage", (msg) => {
    socket.broadcast.emit("message", msg);
    console.log(msg);
  });
});
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, console.log(`server is running ON ${PORT}`));
