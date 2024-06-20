// // routes/messageRoutes.js
// const express = require('express');
// const messageRoute = express.Router();
// const { authenticate } = require('../middleware/auth');
// const { sendMessage, getMessages } = require('../controller/messageController');

// // Route to send a message
// messageRoute.post('/send', authenticate, sendMessage);

// // Route to get messages between the authenticated user and a specific recipient
// messageRoute.get('/receive/:receiverUsername', authenticate, getMessages);

// module.exports = messageRoute;
const { upload} =require('../middleware/audioUploads')
const {uploadMedia}=require('../middleware/mediaUploads')

const express = require('express');
const { 
    sendMessage, 
    getMessages ,
    sendAudioMessage,
    getAudioMessages,
    sendMedia,
    getMedia
} = require('../controller/messageController');
const { authenticate } = require('../middleware/auth');


const messageRouter = express.Router();

// Use authenticate middleware for all routes
messageRouter.use(authenticate);

messageRouter.post('/sendMessages', sendMessage);
messageRouter.get('/receiveMessages/:receiverUsername', getMessages);
messageRouter.post('/sendAudio',upload.single('audio'),sendAudioMessage)
messageRouter.get('/getAudio/:receiverUsername',getAudioMessages)
messageRouter.post('/sendMedia',uploadMedia,sendMedia)
messageRouter.get('/getMedia/:receiverUsername',getMedia)

module.exports = messageRouter;
