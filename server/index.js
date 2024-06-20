
// require('dotenv').config();
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const http = require('http');
// const { Server } = require('socket.io');
// const userRoutes = require('./Routes/UserRoute');
// const ProfileRoute = require('./Routes/ProfileRoute');
// const messageRoute =require('./Routes/messaegRoute')

// const app = express();
// app.use(cors());
// const port = process.env.PORT || 3000;

// app.use(bodyParser.json());
// app.use('/user', userRoutes);
// app.use('/profile', ProfileRoute);
// app.use('/message',messageRoute)

// // Create HTTP server and integrate with Socket.IO
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:3000', // Adjust this to your frontend's origin
//     methods: ['GET', 'POST'],
//   },
// });

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });

//   // Add your own events here
//   socket.on('message', (message) => {
//     console.log('Received message:', message);
//     socket.emit('response', 'Message received');
//   });
// });

// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// //this works fine
// // require('dotenv').config();
// // const express = require('express');
// // const bodyParser = require('body-parser');
// // const cors = require('cors');
// // const http = require('http');
// // const { Server } = require('socket.io');

// // const app = express();
// app.use(cors());
// const port = process.env.PORT || 3002;

// app.use(bodyParser.json());

// // Create HTTP server and integrate with Socket.IO
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: '*', // Allow any origin for development
//     methods: ['GET', 'POST'],
//   },
// });

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });

//   // Receive message from one client and broadcast to all others
//   socket.on('message', (message) => {
//     console.log('Received message from client:', message);
//     socket.broadcast.emit('message', message); // Broadcast to all other connected clients
//   });
// });

// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
// require('dotenv').config();
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const http = require('http');
// const { Server } = require('socket.io');
// const jwt = require('jsonwebtoken');
// const userRoutes = require('./Routes/UserRoute');
// const profileRoute = require('./Routes/ProfileRoute');
// const messageRoute = require('./Routes/messageRoute');
// const client = require('./utils/db');

// const app = express();
// app.use(cors());
// const port = process.env.PORT || 3000;

// app.use(bodyParser.json());
// app.use('/user', userRoutes);
// app.use('/profile', profileRoute);
// app.use('/message', messageRoute);

// // Create HTTP server and integrate with Socket.IO
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: '*', // Adjust this to your frontend's origin
//     methods: ['GET', 'POST'],
//   },
// });

// const users = new Map();

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('join', (token) => {
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const username = decoded.username;
//       users.set(username, socket.id);
//       console.log(`User ${username} connected with socket ID ${socket.id}`);
//     } catch (error) {
//       console.error('Invalid token');
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//     for (const [username, id] of users.entries()) {
//       if (id === socket.id) {
//         users.delete(username);
//         console.log(`User ${username} disconnected`);
//         break;
//       }
//     }
//   });

//   socket.on('message', async (messageData) => {
//     const { token, receiverUsername, message } = messageData;

//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const senderId = decoded.userId;

//       // Get receiver's user ID
//       const receiverQuery = 'SELECT id FROM users WHERE username = $1';
//       const receiverResult = await client.query(receiverQuery, [receiverUsername]);
//       const receiverId = receiverResult.rows[0].id;

//       // Insert the message into the database
//       const insertQuery = `
//         INSERT INTO messages (sender_id, receiver_id, message, created_at)
//         VALUES ($1, $2, $3, NOW())
//         RETURNING *;
//       `;
//       const insertValues = [senderId, receiverId, message];
//       const insertResult = await client.query(insertQuery, insertValues);
//       const newMessage = insertResult.rows[0];

//       // Get the receiver's socket ID
//       const receiverSocketId = users.get(receiverUsername);

//       if (receiverSocketId) {
//         io.to(receiverSocketId).emit('receive_message', newMessage);
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   });
// });

// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const userRoutes = require('./Routes/UserRoute');
const profileRoute = require('./Routes/ProfileRoute');
const messageRoute = require('./Routes/messageRoute');
const client = require('./utils/db');

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/profile', profileRoute);
app.use('/message', messageRoute);

// Create HTTP server and integrate with Socket.IO
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: '*', // Adjust this to your frontend's origin
//     methods: ['GET', 'POST'],
//   },
// });

// const users = new Map();

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('join', (token) => {
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const username = decoded.username;
//       users.set(username, socket.id);
//       console.log(`User ${username} connected with socket ID ${socket.id}`);
//     } catch (error) {
//       console.error('Invalid token');
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//     for (const [username, id] of users.entries()) {
//       if (id === socket.id) {
//         users.delete(username);
//         console.log(`User ${username} disconnected`);
//         break;
//       }
//     }
//   });

//   socket.on('message', async (messageData) => {
//     const { token, receiverUsername, message } = messageData;

//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const senderId = decoded.userId;

//       // Get receiver's user ID
//       const receiverQuery = 'SELECT id FROM users WHERE username = $1';
//       const receiverResult = await client.query(receiverQuery, [receiverUsername]);
//       const receiverId = receiverResult.rows[0].id;

//       // Insert the message into the database
//       const insertQuery = `
//         INSERT INTO messages (sender_id, receiver_id, message, created_at)
//         VALUES ($1, $2, $3, NOW())
//         RETURNING *;
//       `;
//       const insertValues = [senderId, receiverId, message];
//       const insertResult = await client.query(insertQuery, insertValues);
//       const newMessage = insertResult.rows[0];

//       // Get the receiver's socket ID
//       const receiverSocketId = users.get(receiverUsername);

//       if (receiverSocketId) {
//         io.to(receiverSocketId).emit('receive_message', newMessage);
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   });
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
// require('dotenv').config();
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const http = require('http');
// const { Server } = require('socket.io');
// const jwt = require('jsonwebtoken');
// const userRoutes = require('./Routes/UserRoute');
// const profileRoute = require('./Routes/ProfileRoute');
// const messageRoute = require('./Routes/messageRoute');
// const client = require('./utils/db');
// const socket =require('./services/socket')

// const app = express();
// app.use(cors());
// const port = process.env.PORT || 3000;

// app.use(bodyParser.json());
// app.use('/user', userRoutes);
// app.use('/profile', profileRoute);
// app.use('/message', messageRoute);

// // Create HTTP server and integrate with Socket.IO
//  const server = http.createServer(app);
//  socket(server)
// //  const io = new Server(server,{
// //   cors: {
// //         origin: '*', // Adjust this to your frontend's origin
// //       },
// //  });
// //  io.on('connection',(socket)=>{
// //   console.log(`user connected wiht id ${socket.id}`)
// //  })
// //   cors: {
// //     origin: '*', // Adjust this to your frontend's origin
// //     methods: ['GET', 'POST'],
// //   },
// // });

// //const users = new Map();

// // io.on('connection', (socket) => {
// //   console.log('A user connected');

// //   socket.on('join', (token) => {
// //     try {
// //       const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //       const username = decoded.username;
// //       users.set(username, socket.id);
// //       console.log(`User ${username} connected with socket ID ${socket.id}`);
// //     } catch (error) {
// //       console.error('Invalid token');
// //     }
// //   });

// //   socket.on('disconnect', () => {
// //     console.log('User disconnected');
// //     for (const [username, id] of users.entries()) {
// //       if (id === socket.id) {
// //         users.delete(username);
// //         console.log(`User ${username} disconnected`);
// //         break;
// //       }
// //     }
// //   });

// //   socket.on('message', async (messageData) => {
// //     const { token, receiverUsername, message } = messageData;

// //     try {
// //       const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //       const senderId = decoded.userId;

// //       // Get receiver's user ID
// //       const receiverQuery = 'SELECT id FROM users WHERE username = $1';
// //       const receiverResult = await client.query(receiverQuery, [receiverUsername]);
// //       const receiverId = receiverResult.rows[0].id;

// //       // Insert the message into the database
// //       const insertQuery = `
// //         INSERT INTO messages (sender_id, receiver_id, message, created_at)
// //         VALUES ($1, $2, $3, NOW())
// //         RETURNING *;
// //       `;
// //       const insertValues = [senderId, receiverId, message];
// //       const insertResult = await client.query(insertQuery, insertValues);
// //       const newMessage = insertResult.rows[0];

// //       // Get the receiver's socket ID
// //       const receiverSocketId = users.get(receiverUsername);

// //       if (receiverSocketId) {
// //         io.to(receiverSocketId).emit('receive_message', newMessage);
// //       }
// //       // Emit the message to the sender as well
// //       socket.emit('receive_message', newMessage);
// //     } catch (error) {
// //       console.error('Error sending message:', error);
// //     }
// //   });
// // });

// server.listen(port, () => {
  
//   console.log(`Server running on port ${port}`);
// });
//encryptionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn
// require('dotenv').config();
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const http = require('http');
// const { Server } = require('socket.io');
// const jwt = require('jsonwebtoken');
// const userRoutes = require('./Routes/UserRoute');
// const profileRoute = require('./Routes/ProfileRoute');
// const messageRoute = require('./Routes/messageRoute');
// const client = require('./utils/db');
// const { encrypt, decrypt } = require('./utils/encrypt');

// const app = express();
// app.use(cors());
// const port = process.env.PORT || 3000;

// app.use(bodyParser.json());
// app.use('/user', userRoutes);
// app.use('/profile', profileRoute);
// app.use('/message', messageRoute);

// // Create HTTP server and integrate with Socket.IO
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST'],
//   },
// });

// const users = new Map();

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('join', (token) => {
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const username = decoded.username;
//       users.set(username, socket.id);
//       console.log(`User ${username} connected with socket ID ${socket.id}`);
//     } catch (error) {
//       console.error('Invalid token');
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//     for (const [username, id] of users.entries()) {
//       if (id === socket.id) {
//         users.delete(username);
//         console.log(`User ${username} disconnected`);
//         break;
//       }
//     }
//   });

//   socket.on('message', async (messageData) => {
//     const { token, receiverUsername, message } = messageData;

//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const senderId = decoded.userId;

//       // Encrypt the message
//       const encryptedMessage = encrypt(message);

//       // Get receiver's user ID
//       const receiverQuery = 'SELECT id FROM users WHERE username = $1';
//       const receiverResult = await client.query(receiverQuery, [receiverUsername]);
//       const receiverId = receiverResult.rows[0].id;

//       // Insert the encrypted message into the database
//       const insertQuery = `
//         INSERT INTO messages (sender_id, receiver_id, message, created_at)
//         VALUES ($1, $2, $3, NOW())
//         RETURNING *;
//       `;
//       const insertValues = [senderId, receiverId, encryptedMessage];
//       const insertResult = await client.query(insertQuery, insertValues);
//       const newMessage = insertResult.rows[0];

//       // Decrypt the message for broadcasting
//       newMessage.message = decrypt(newMessage.message);

//       // Get the receiver's socket ID
//       const receiverSocketId = users.get(receiverUsername);

//       if (receiverSocketId) {
//         io.to(receiverSocketId).emit('receive_message', newMessage);
//       }
//       // Emit the message to the sender as well
//       socket.emit('receive_message', newMessage);
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   });
// });

// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
