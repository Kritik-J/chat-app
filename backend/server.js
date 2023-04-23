import app from "./src/app.js";
import chalk from "chalk";
import connectDB from "./src/config/connectDB.js";
import { Server } from "socket.io";

connectDB();

// Handling uncaught error
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(
    `\nStarted Server on port ${process.env.PORT}\n\n${chalk.blue(
      `http://localhost:${process.env.PORT}`
    )}\n`
  );
});

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

global.users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  // add user and socketId to users array

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);   
    
    io.emit("getUsers", users);
  });

  socket.on("getUserById", (userId, otherUserId) => {
    const user = getUser(userId);
    const otherUser = getUser(otherUserId);

    if (user) {
      io.to(user.socketId).emit("getOtherUser", otherUser);
    }
  });

  // send and get message

  socket.on("sendMessage", ({ text, chatId, senderId, senderDisplayName, receiverId }) => {
    const user = getUser(receiverId);

    if(!user) return;

    io.to(user.socketId).emit("getMessage", {
      text,
      chat : chatId,
      sender: {
        _id: senderId,
        displayName: senderDisplayName,
      },
      createdAt: new Date(),
    });
  });

  // disconnect

  socket.on("disconnect", () => {
    // remove user and socketId from users array and send all users
    removeUser(socket.id);

    io.emit("getUsers", users);
  });
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// SIGTERM is a signal that is sent to a process to tell it to terminate.
process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
