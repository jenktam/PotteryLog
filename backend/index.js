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

const DB_PORT = process.env.DB_PORT;

// ****** Middleware *********
app.use((req, res, next) => {
  // for sendingn cookies
  res.header('Access-Control-Allow-Credentials', true);

  next();
});

app.use(express.json());
app.use(
  cors({
    origin: `http://localhost:${process.env.PORT}`,
  })
);
app.use(cookieParser());

// ********** Routes *********
app.use('/api/upload', uploadRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/projects', projectRoutes);

app.listen(DB_PORT, () => {
  console.log(`API listening at ${DB_PORT}`);
});
