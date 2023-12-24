const multer = require('multer');
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadPath = 'uploads/'; 
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

const allowedFileExtensions = ['.jpg', '.jpeg', '.png'];

export const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedFileExtensions.includes(ext)) {
      cb(null, true);
    } else {
      // cb(new Error('Only jpg and png files are allowed'));
      return cb('Only jpg and png files are allowed') ;
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5MB
  },
});