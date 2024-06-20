// // middlewares/upload.js
// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// const upload = multer({ storage });

// module.exports = {
//     upload
// };
// middleware/audioUploads.js

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/audios/'); 
    // Specify the directory where audio files should be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(`${file.originalname}.mp3`);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext); // Generate unique filenames
  }
});

const upload = multer({ storage });

module.exports = {
  upload
};
