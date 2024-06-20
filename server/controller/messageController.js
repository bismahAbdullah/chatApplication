
const client = require('../utils/db');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { imageUpload, videoUpload, fileUpload } = require('../middleware/mediaUploads');


const sendMessage = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiverUsername, message } = req.body;

    
    const receiverQuery = 'SELECT id FROM users WHERE username = $1';
    const receiverResult = await client.query(receiverQuery, [receiverUsername]);
    const receiverId = receiverResult.rows[0].id;

    
    const insertQuery = `
      INSERT INTO messages (sender_id, receiver_id, message, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING *;
    `;
    const insertValues = [senderId, receiverId, message];
    const result = await client.query(insertQuery, insertValues);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getMessages = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiverUsername } = req.params;

   
    const receiverQuery = 'SELECT id FROM users WHERE username = $1';
    const receiverResult = await client.query(receiverQuery, [receiverUsername]);
    const receiverId = receiverResult.rows[0].id;

   
    const messagesQuery = `
      SELECT * FROM messages
      WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)
      ORDER BY created_at ASC;
    `;
    const messagesResult = await client.query(messagesQuery, [senderId, receiverId]);
    const messages = messagesResult.rows;

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



const sendAudioMessage = async (req, res) => {
  try {
    const senderId = req.user.id;
   // const { receiverUsername, audioUrl } = req.body; 
   
   const { receiverUsername } = req.body;
  // const audioUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  const audioUrl = `${req.protocol}://${req.get('host')}/uploads/audios/${req.file.filename}`;
  console.log(audioUrl)
    
  // Get receiver's user ID
    const receiverQuery = 'SELECT id FROM users WHERE username = $1';
    const receiverResult = await client.query(receiverQuery, [receiverUsername]);
    if (receiverResult.rows.length === 0) {
      return res.status(404).json({ error: 'Receiver not found' });
    }
    const receiverId = receiverResult.rows[0].id;

   
    const insertQuery = `
      INSERT INTO audio_messages (sender_id, receiver_id, file_path, created_at)
      VALUES ($1, $2, $3, NOW())
      RETURNING *;
    `;
    const insertValues = [senderId, receiverId, audioUrl];
    const result = await client.query(insertQuery, insertValues);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error sending audio message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



const getAudioMessages = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiverUsername } = req.params;
   

    // Get receiver's user ID
    const receiverQuery = 'SELECT id FROM users WHERE username = $1';
    const receiverResult = await client.query(receiverQuery, [receiverUsername]);
    if (receiverResult.rows.length === 0) {
      return res.status(404).json({ error: 'Receiver not found' });
    }
    const receiverId = receiverResult.rows[0].id;

   
    const messagesQuery = `
      SELECT * FROM audio_messages
      WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)
      ORDER BY created_at ASC;
    `;
    const messagesResult = await client.query(messagesQuery, [senderId, receiverId]);
    const messages = messagesResult.rows;

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching audio messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const sendMedia=async(req,res)=>{
 
    // const { mediaType, receiverUsername } = req.body;
    // const senderId = req.user.id; 
    // console.log(mediaType,receiverUsername)
    
  
    // try {
      
    //   const receiverQuery = 'SELECT id FROM users WHERE username = $1';
    //   const receiverResult = await client.query(receiverQuery, [receiverUsername]);
    //   if (receiverResult.rows.length === 0) {
    //     return res.status(404).json({ error: 'Receiver not found' });
    //   }
    //   const receiverId = receiverResult.rows[0].id;
    //   console.log(req.file)
  
    //   switch (mediaType) {
    //     case 'image':
    //       // imageUpload.single('media')(req, res, async (err) => {
    //       //   if (err) {
    //       //     return res.status(400).json({ error: err.message });
    //       //   }
    //         const imagePath = `/uploads/images/${req.file.filename}`;
  
           
    //         const insertQuery = `
    //           INSERT INTO media_files (sender_id, receiver_id, file_path, created_at)
    //           VALUES ($1, $2, $3, NOW())
    //           RETURNING *;
    //         `;
    //         const insertValues = [senderId, receiverId, imagePath];
    //         const result = await client.query(insertQuery, insertValues);
  
    //         return res.status(201).json({ imageUrl: `${req.protocol}://${req.get('host')}${imagePath}` });
    //      // });
    //       break;
    //     case 'video':
    //       videoUpload.single('media')(req, res, async (err) => {
    //         if (err) {
    //           return res.status(400).json({ error: err.message });
    //         }
    //         const videoPath = `/uploads/videos/${req.file.filename}`;
  
          
    //         const insertQuery = `
    //           INSERT INTO media_files (sender_id, receiver_id, file_path, created_at)
    //           VALUES ($1, $2, $3, NOW())
    //           RETURNING *;
    //         `;
    //         const insertValues = [senderId, receiverId, videoPath];
    //         const result = await client.query(insertQuery, insertValues);
  
    //         return res.status(201).json({ videoUrl: `${req.protocol}://${req.get('host')}${videoPath}` });
    //       });
    //       break;
    //     case 'file':
    //       fileUpload.single('media')(req, res, async (err) => {
    //         if (err) {
    //           return res.status(400).json({ error: err.message });
    //         }
    //         const filePath = `/uploads/files/${req.file.filename}`;
  
          
    //         const insertQuery = `
    //           INSERT INTO media_files (sender_id, receiver_id, file_path, created_at)
    //           VALUES ($1, $2, $3, NOW())
    //           RETURNING *;
    //         `;
    //         const insertValues = [senderId, receiverId, filePath];
    //         const result = await client.query(insertQuery, insertValues);
  
    //         return res.status(201).json({ fileUrl: `${req.protocol}://${req.get('host')}${filePath}` });
    //       });
    //       break;
    //     default:
    //       return res.status(400).json({ error: 'Invalid media type specified' });
    //   }
    // } catch (error) {
    //   console.error('Error uploading media:', error);
    //   return res.status(500).json({ error: 'Internal server error' });
    // }
    const {  receiverUsername } = req.body;
    const  mediaType  = req.query.mediaType;
  const senderId = req.user.id;
  
  try {
    const receiverQuery = 'SELECT id FROM users WHERE username = $1';
    const receiverResult = await client.query(receiverQuery, [receiverUsername]);
    if (receiverResult.rows.length === 0) {
      return res.status(404).json({ error: 'Receiver not found' });
    }
    const receiverId = receiverResult.rows[0].id;

    let mediaPath;

    switch (mediaType) {
      case 'image':
        mediaPath = `${req.protocol}://${req.get('host')}/uploads/images/${req.file.filename}`;
        break;
      case 'video':
        mediaPath = `${req.protocol}://${req.get('host')}/uploads/videos/${req.file.filename}`;
        break;
      case 'file':
        mediaPath = `${req.protocol}://${req.get('host')}/uploads/files/${req.file.filename}`;
        break;
      default:
        return res.status(400).json({ error: 'Invalid media type specified' });
    }

    const insertQuery = `
      INSERT INTO media_files (sender_id, receiver_id, file_path, media_type, created_at)
      VALUES ($1, $2, $3,$4, NOW())
      RETURNING *;
    `;
    const insertValues = [senderId, receiverId, mediaPath,mediaType];
    const result = await client.query(insertQuery, insertValues);

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error uploading media:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
  
}

const getMedia = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiverUsername } = req.params;

    // Get receiver's user ID
    const receiverQuery = 'SELECT id FROM users WHERE username = $1';
    const receiverResult = await client.query(receiverQuery, [receiverUsername]);
    if (receiverResult.rows.length === 0) {
      return res.status(404).json({ error: 'Receiver not found' });
    }
    const receiverId = receiverResult.rows[0].id;

   
    const messagesQuery = `
      SELECT * FROM media_files
      WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)
      ORDER BY created_at ASC;
    `;
    const messagesResult = await client.query(messagesQuery, [senderId, receiverId]);
    const messages = messagesResult.rows;

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching media files:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  sendMessage,
  getMessages,
  sendAudioMessage,
  getAudioMessages,
  sendMedia,
  getMedia
};
