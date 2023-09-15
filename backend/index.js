import express from 'express';
import dotenv from 'dotenv';
import uploadRoutes from './routes/uploads.js';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import projectRoutes from './routes/projects.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();
dotenv.config();

const DB_PORT = process.env.DB_PORT

// ****** Middleware *********
// need to add to be able to send JSON objects to client
app.use((req, res, next) => {
  // allow us to send cookies
  res.header('Access-Control-Allow-Credentials', true)
  
  next();
})
app.use(express.json()); // allows us to send json objects
app.use(cors({
  origin: `http://localhost:${process.env.PORT}`,
}));
app.use(cookieParser());


// // can create router for multer file upload stuff
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, `../client/public/upload`) // upload file destination. must add
//   },
//   filename: (req, file, cb) => {
//     // be careful with file keys. they're not camelCase
//     const fieldName = Date.now() + file.originalname;

//     cb(null, fieldName)
//   }
// })

// const upload = multer({ storage: storage });

// // TODO: change to multiple
// app.post("/api/upload", upload.single("file"), (req, res) => {
//   const file = req.file;
//   res.status(200).json(file.filename);
// })

// *******************

// ********** Routes *********
app.use('/api/upload', uploadRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/projects', projectRoutes);
// *******************

app.listen(DB_PORT, () => {
  console.log(`API listening at ${DB_PORT}`);
})