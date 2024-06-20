// // const express = require('express');
// // const multer = require('multer');
// // const path = require('path');

// // const app = express();

// // // Multer storage and file filter functions for images
// // const imageStorage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, 'uploads/images/');
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
// //   }
// // });

// // // const imageFileFilter = (req, file, cb) => {
// // //   if (file.mimetype.startsWith('image')) {
// // //     cb(null, true);
// // //   } else {
// // //     cb(new Error('Only images are allowed!'), false);
// // //   }
// // // };

// // //const imageUpload = multer({ storage: imageStorage, fileFilter: imageFileFilter });
// // const imageUpload = multer({ storage: imageStorage});

// // // Multer storage and file filter functions for videos
// // const videoStorage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, path.join(__dirname, 'uploads', 'videos'));
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
// //   }
// // });

// // const videoFileFilter = (req, file, cb) => {
// //   if (file.mimetype.startsWith('video')) {
// //     cb(null, true);
// //   } else {
// //     cb(new Error('Only videos are allowed!'), false);
// //   }
// // };

// // const videoUpload = multer({ storage: videoStorage, fileFilter: videoFileFilter });

// // // Multer storage and file filter functions for generic files
// // const fileStorage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, path.join(__dirname, 'uploads', 'files'));
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
// //   }
// // });

// // const fileUpload = multer({ storage: fileStorage });

// // module.exports = { imageUpload, videoUpload, fileUpload };
// const multer = require('multer');
// const path = require('path');

// // Configure storage for images
// const imageStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/images/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
//   }
// });

// // Configure storage for videos
// const videoStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/videos/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
//   }
// });

// // Configure storage for files
// const fileStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/files/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
//   }
// });

// const uploadMedia = multer({ 
    
//   storage: function (req, file, cb) {
//     const { mediaType } = req.body;
//     console.log(mediaType)
//     switch (mediaType) {
//       case 'image':
//         console.log(mediaType)
//         imageStorage(req, file, cb);
//         break;
//       case 'video':
//         videoStorage(req, file, cb);
//         break;
//       case 'file':
//         fileStorage(req, file, cb);
//         break;
//       default:
//         cb(new Error('Invalid media type'));
//     }
//   }
// });

// module.exports = { uploadMedia };
const multer = require('multer');
const path = require('path');

// Configure storage for images
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images/');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Configure storage for videos
const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/videos/');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Configure storage for files
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/files/');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Helper function to select storage based on media type
const selectStorage = (mediaType) => {
  switch (mediaType) {
    case 'image':
      return imageStorage;
    case 'video':
      return videoStorage;
    case 'file':
      return fileStorage;
    default:
      throw new Error('Invalid media type');
  }
};

// Middleware to handle file upload
const uploadMedia = (req, res, next) => {
  const  mediaType  = req.query.mediaType;
  console.log(mediaType)
  let storage;

  try {
    storage = selectStorage(mediaType);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  const upload = multer({ storage }).single('media');
  upload(req, res, function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

module.exports = { uploadMedia };
