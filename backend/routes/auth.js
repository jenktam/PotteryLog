
import express from 'express';
import { db } from '../connect.js';
import { login, register, forgotPassword, resetPassword, logout } from '../controllers/auth.js';

const router = express.Router();


// AUTH MIDDLEWARES
// get email and token. Then, verify that the token is valid for the user.
const validateResetToken = async(req, res, next) => {
  const email = req.body.email || req.params.email;
  const resetToken = req.body.token || req.params.token;

  if(!resetToken || !email) {
    return res.status(400).json("Bad request. Client passed malformed request syntax. Please try again.");
  }

  // then verify if resetToken exists in the resetPasswordToken table
  const currentTime = new Date(Date.now());

  const token = await findValidToken(resetToken, email, currentTime);

  if(!token) {
    return res.status(404).json('Invalid token. Please try again!');
  }

  // if token is valid, execute next middleware in stack, which is resestPassword
  next();
}

const findValidToken = (token, email, currentTime) => {
  return new Promise((resolve, reject)=> {
    let q = `SELECT * 
            FROM resetPasswordToken 
            WHERE (email = ? AND tokenValue = ? AND expiredAt > ?)`;

    let values = [email, token, currentTime];
    db.query(q, [...values], (error, tokens)=>{
        if(error){
            return reject(error);
        }
        return resolve(tokens[0]);
    });
  });
};

// AUTH ROUTES
router.post('/login', login);
router.post('/register', register);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', validateResetToken, resetPassword);
router.post('/logout', logout);

export default router;