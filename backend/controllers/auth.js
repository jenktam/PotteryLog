import { db } from '../connect.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

export const register = (req, res) => {
  // check if user exists
  const q = "SELECT * FROM users WHERE username=?";

  db.query(q, [req.body.username], (err, data) => {
    if(err) return res.status(500).json(err);

    // if db returns data, means the user already exists and return error
    if(data.length) return res.status(409).json('User already exists')
  });

  // if not, create new user and hash password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  const query = "INSERT INTO users (`username`, `email`, `password`, `firstName`, `lastName`) VALUE (?)";

  const { username, email, firstName, lastName } = req.body;

  const values = [username, email, hashedPassword, firstName, lastName];

  db.query(query, [values], (err, data) => {
    if(err) return res.status(500).json(err);
    return res.status(200).json('User has been created');
  });
};

export const insertResetToken = (email,tokenValue, createdAt, expiredAt, used, userId) => {
  const insertedAt = new Date(Date.now());

  return new Promise((resolve, reject) => {
    const q = "INSERT INTO resetPasswordToken (`email`, `tokenValue` ,`createdAt`, `expiredAt`, `used`, `insertedAt`, `userId`) VALUE (?)";
  

    const values = [email, tokenValue ,createdAt, expiredAt, used, insertedAt, userId]
    db.query(q, [values], (err, data) => {
      if(err) return reject(err);

      return resolve(data.insertId);
      
    })
  })

}

async function sendEmail({ to, subject, html, from = process.env.EMAIL_FROM }) {
  // generate here: https://ethereal.email/create
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: process.env.ETHEREAL_USER, // generated ethereal user
      pass: process.env.ETHEREAL_PASS // generated ethereal password
    }
  })

  await transporter.sendMail({ from, to, subject, html });
  console.log("email sent sucessfully");
  };


async function sendPasswordResetEmail(email, resetToken, origin) {
  let message;
   
  if (origin) {
      const resetUrl = `${origin}/reset-password?token=${resetToken}&email=${email}`;
      message = `<p>Please click the below link to reset your password, the following link will be valid for only 1 hour:</p>
                 <p><a href="${resetUrl}">${resetUrl}</a></p>`;
  } else {
      message = `<p>Please use the below token to reset your password with the <code>/reset-password</code> api route:</p>
                 <p><code>${resetToken}</code></p>`;
  }

  await sendEmail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: ' Reset your Password',
      html: `<h4>Reset Password</h4>
             ${message}`
  });
}

// old code doesn't have validation. User can change password if know username
// TODO: add temp code for authorization to change password
// export const resetPassword = (req, res) => {
//   const q = "SELECT * FROM users WHERE username=?";

//   db.query(q, [req.body.username], (err, data) => {
//     if(err) return res.status(500).json(err);
//     if (data.length === 0) return res.status(409).json("User not found!")

//     const salt = bcrypt.genSaltSync(10);
//     const hashedPassword = bcrypt.hashSync(req.body.password, salt);

//     const query = "UPDATE users SET `password` = ? WHERE `username` = ?";

//     const values = [
//       hashedPassword,
//       req.body.username,
//     ];

//     db.query(query, values, (err, data) => {
//       if(err) return res.status(500).json(err);
//       return res.status(200).json('Password has been updated.');
//     })
//   })
// }


const getUserByEmail = (email) => {
  return new Promise((resolve, reject)=>{
    let q = 'SELECT * FROM users WHERE email = ?';
      db.query(q, [email], (error, users)=>{
          if(error){
              return reject(error);
          }
          return resolve(users[0]);
           
      });
  });
};

export const expireOldTokens = (email, used) =>{
  return new Promise((resolve, reject)=>{
    let q = "UPDATE resetPasswordToken SET used = ? WHERE email = ?"
      db.query(q, [used, email], (error)=>{
          if(error){
              return reject(error);
          }
            return resolve();
      });
  });
}

export const resetPassword = async(req, res, next) => {
  try {
    const newPassword = req.body.password;
    const email = req.body.email;

    if(!newPassword) {
      return res.status(400).json("You must create a new password.");
    }

    const user = await getUserByEmail(email);

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    // update user password
    const q = `UPDATE users 
                SET password=?
                WHERE id = ?
                `;

    const values = [hashedPassword, user.id]; 
    
    db.query(q, [...values], (err, data) => {
      if(err) return res.status(500).json(err);

      return res.status(200).json("Password reset successful. You can now login with your new password.");
    });
  } catch(err) {
    console.log(err);
  }
};

export const forgotPassword = async(req, res, next) => {
  try{
    const email = req.body.email;
    console.log(email);
     
    const origin = req.header('Origin'); // we are  getting the request origin from  the HOST header
    const user = await getUserByEmail(email);
     
    if(!user){
        // here we always return ok response to prevent email enumeration
       return res.status(404).json("User not found. Try a different email address.");
    }

    // Get all the tokens that were previously set for this user and set used to 1. This will prevent old and expired tokens from being used. 
    await expireOldTokens(email, 1);

    // create reset token that expires after 1 hours
    const resetToken = crypto.randomBytes(40).toString('hex');
    const resetTokenExpires = new Date(Date.now() + 60*60*1000);
    const createdAt = new Date(Date.now());
    const expiredAt = resetTokenExpires;
    const userId = user.id;

    //insert the new token into resetPasswordToken table
    await insertResetToken(email, resetToken,createdAt, expiredAt, 0, userId);

    // send email
    await sendPasswordResetEmail(email,resetToken, origin);
    res.status(200).json({ message: 'Please check your email for a new password. The code is valid for 1 hour.' });
     

    } catch(e){
        console.log(e);
    }
}

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if(err) return res.status(500).json(err);
    // if 0, means don't have a user
    if(data.length === 0) return res.status(404).json('User not found. Please try again.');

    // IF USER IN DB, CHECK PASSWORD IS CORRECT
    const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)

    // if no password, wrong inputs
    if(!checkPassword) return res.status(400).json('Wrong password or username!');

    const token = jwt.sign({ id: data[0].id }, "secretKey");

    const { password, ...others } = data[0];

    // set accessToken cookie for user
    res.cookie('accessToken', token, {
      httpOnly: true,
    }).status(200).json(others);
  })
}
export const logout = (req, res) => {
  // don't need to pass in username when make API request bc already have cookie
  res.clearCookie("accessToken", () => ({
    secure: true,
    sameSite: 'none', // port for backend on 8800 and client on 3000 so not on same site
  })).status(200).json("User has been logged out.");
}