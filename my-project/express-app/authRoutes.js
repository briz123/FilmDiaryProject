import express from 'express';
import bcrypt from 'bcryptjs';
import { User } from './db.js';
import validator from 'validator';
import './db.js';
const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  let message;
  // validator.js
  if (!username || !password) {
    message= 'Username and password are required';
    return res.status(400).json({ message});
  }

  if (!validator.isAlphanumeric(username)) {
    message = 'Username must be alphanumeric';
    return res.status(400).json({ message });
  }

  if (password.length < 6) {
    message = 'Password must be at least 6 characters';
    return res.status(400).json({ message });
  }

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
        message = 'Cannot find User';
      return res.status(400).json({ message });
    }
    //from earlier authentication homework
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        message  = 'Invalid username or password' ;
        return res.json({message});
    }

    return res.json({ message: 'Login successful', userId: user._id });
  } catch (err) {
    console.log(err);
  }
});

export default router;
