const { Server } = require("socket.io");

const io = new Server({ cors:"http://localhost:3000" });

const onlineUsers=[]

io.on("connection", (socket) => {
  console.log("connection",socket.id)

  socket.on("addNewUser",(userid)=>{
    !onlineUsers.some((user)=> user.userid=== userid) &&
    onlineUsers.push({
        userid,
        socketId: socket.id
  })

  console.log("onlineuer",onlineUsers)
  })
  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    const user = onlineUsers.find((user) => user.userid === receiverId);
    if (user) {
      io.to(user.socketId).emit("getMessage", {
        senderId,
        message,
      });
    }
  });
  socket.on("sendAudioMessage", ({ senderId, receiverId, audioMessage }) => {
    const user = onlineUsers.find((user) => user.userid === receiverId);
    if (user) {
      io.to(user.socketId).emit("getAudioMessage", { senderId, audioMessage });
    }
  });

  socket.on("sendMediaMessage", ({ senderId, receiverId, mediaMessage }) => {
    const user = onlineUsers.find((user) => user.userid === receiverId);
    if (user) {
      io.to(user.socketId).emit("getMediaMessage", { senderId, mediaMessage });
    }
  });

//   socket.on("disconnect", () => {
//     onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
//     console.log("user disconnected", socket.id);
//   });
});

io.listen(3003);