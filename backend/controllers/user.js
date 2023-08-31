import jwt from 'jsonwebtoken';
import { db } from '../connect.js';

export const getUser = (req, res) => {
  const token = req.cookies.accessToken;
  if(!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, 'secretKey', (err) => {
    // forbidden error
    if(err) return res.status(403).json("Token is not valid!");

    const q = `SELECT * FROM users WHERE id = ?`;

    db.query(q, [req.params.userId], (err, data) => {
      if(err) return res.status(500).json(err);

      // don't pass in password
      const { password, ...info } = data[0];
      return res.status(200).json(info);
    });
  });
}

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;

  if(!token) return res.status(401).json("Not logged in");

  // verify correct user
  jwt.verify(token, 'secretKey', (err, userInfo) => {
    if(err) return res.status(403).json("Token is not valid!");
    
    const userId = userInfo.id;
    const q = `
                UPDATE users 
                SET firstName=?, lastName=?, profilePic=?
                WHERE id=?
              `;
  
    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.profilePic,
      userId,
    ];
  
    db.query(q, [...values], (err, data) => {
      if(err) return res.status(500).json(err);
      if(data.affectedRows > 0) return res.status(200).json("Updated user!");
  
      return res.status(200).json("You can only update your profile!");
      
    });
  });
};