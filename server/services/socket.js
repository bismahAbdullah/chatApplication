// // // const socket=require('socket.io')

// // // const socketInit=(server)=>{
// // //     const io = socket(server,{
// // //           cors: {
// // //                 origin: 'http://localhost:3000', // Adjust this to your frontend's origin
// // //               },
// // //          });
// // //          io.on('connection',(socket)=>{
// // //           console.log(`user connected wiht id ${socket.id}`)
        
// // //          })

// // // }

// // // module.exports=socketInit
// // const socket = require('socket.io');

// // const socketInit = (server) => {
// //   const io = socket(server, {
// //     cors: {
// //       origin: 'http://localhost:3000', // Adjust this to your frontend's origin
// //     },
// //   });

// //   io.on('connection', (socket) => {
// //     console.log(`User connected with ID ${socket.id}`);

// //     socket.on('joinPrivate', ({ roomId }) => {
// //       socket.join(roomId);
// //       console.log(`User joined private room: ${roomId}`);
// //     });

// //     socket.on('joinGroup', ({ groupId }) => {
// //       socket.join(groupId);
// //       console.log(`User joined group room: ${groupId}`);
// //     });

// //     socket.on('privateMessage', ({ roomId, message }) => {
// //       io.to(roomId).emit('privateMessage', message);
// //     });

// //     socket.on('groupMessage', ({ groupId, message }) => {
// //       io.to(groupId).emit('groupMessage', message);
// //     });

// //     socket.on('disconnect', () => {
// //       console.log(`User disconnected with ID ${socket.id}`);
// //     });
// //   });
// // };

// // module.exports = socketInit;
// const socket = require('socket.io');
// const jwt = require('jsonwebtoken');

// const socketInit = (server) => {
//     const io = socket(server, {
//         cors: {
//           origin: 'http://localhost:3000', // Replace with your frontend URL
//           methods: ['GET', 'POST'],
//         },
//       });
      
//       io.on('connection', (socket) => {
//         console.log('New client connected', socket.id);
      
//         // Listen for incoming messages
//         socket.on('message', (message) => {
//           console.log('Received message from client:', message);
//           // Broadcast the message to all connected clients
//           io.emit('message', message);
//         });
      
//         socket.on('disconnect', () => {
//           console.log('Client disconnected', socket.id);
//         });
//       });
// //   const io = socket(server, {
// //     cors: {
// //       origin: 'http://localhost:3000', // Adjust this to your frontend's origin
// //     },
// //   });

// //   io.use((socket, next) => {
// //     if (socket.handshake.query && socket.handshake.query.token) {
// //       jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET, (err, decoded) => {
// //         if (err) return next(new Error('Authentication error'));
// //         socket.user = decoded.user;
// //         next();
// //       });
// //     } else {
// //       next(new Error('Authentication error'));
// //     }
// //   }).on('connection', (socket) => {
// //     console.log(`User connected with id ${socket.id}`);

// //     socket.on('join_private', (room) => {
// //       socket.join(room);
// //     });

// //     socket.on('join_group', (group) => {
// //       socket.join(group);
// //     });

// //     socket.on('private_message', (data) => {
// //       const { room, message } = data;
// //       io.to(room).emit('private_message', message);
// //     });

// //     socket.on('group_message', (data) => {
// //       const { group, message } = data;
// //       io.to(group).emit('group_message', message);
// //     });

// //     socket.on('disconnect', () => {
// //       console.log(`User disconnected with id ${socket.id}`);
// //     });
// //   });
// };

// module.exports = socketInit;
const socket = require('socket.io');

const socketInit = (server) => {
  const io = socket(server, {
    cors: {
      origin: 'http://localhost:3000', // Adjust this to your frontend's origin
    },
  });

  io.on('connection', (socket) => {
    console.log(`User connected with ID ${socket.id}`);

    socket.on('joinPrivate', ({ roomId }) => {
      socket.join(roomId);
      console.log(`User joined private room: ${roomId}`);
    });

    socket.on('joinGroup', ({ groupId }) => {
      socket.join(groupId);
      console.log(`User joined group room: ${groupId}`);
    });

    socket.on('privateMessage', ({ roomId, message, timestamp }) => {
      io.to(roomId).emit('privateMessage', { message, sender_id: socket.id, timestamp });
    });

    socket.on('groupMessage', ({ groupId, message, timestamp }) => {
      io.to(groupId).emit('groupMessage', { message, sender_id: socket.id, timestamp });
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected with ID ${socket.id}`);
    });
  });
};

module.exports = socketInit;
