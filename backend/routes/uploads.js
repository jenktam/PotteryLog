import express from 'express';
import multer from 'multer';
import { getUploads } from '../controllers/upload.js';

const router = express.Router();

// can create router for multer file upload stuff
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `../client/public/upload`) // upload file destination. must add
  },
  filename: (req, file, cb) => {
    console.log('file: ', file);
    // be careful with file keys. they're not camelCase
    const fieldName = Date.now() + file.originalname;

    cb(null, fieldName)
  }
})

const upload = multer({ storage: storage });

// // upload one file
router.post('/one', upload.single("file"), getUploads);

// upload multiple files
router.post('/', 
  upload.array("files"), 
  getUploads, 
  (error, req, res) => {
    res.status(400).send({ error: error.message })
  },
  );

export default router;