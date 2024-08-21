import express from 'express';
import multer from 'multer';
import { getUploads } from '../controllers/upload.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `../client/public/upload`); // TODO: upload file destination. must add
  },
  filename: (req, file, cb) => {
    const fieldName = Date.now() + file.originalname;

    cb(null, fieldName);
  },
});

const upload = multer({ storage: storage });

// Upload one file
router.post('/one', upload.single('file'), getUploads);

// Upload multiple files
router.post('/', upload.array('files'), getUploads, (error, req, res) => {
  res.status(400).send({ error: error.message });
});

export default router;
