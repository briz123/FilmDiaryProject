import express from 'express';
import { User } from './db.js'; // Make sure your database model is imported correctly
import validator from 'validator';

const router = express.Router();


router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  let message;

  
  if (!username || !password) {
    message = 'Username and password are required';
    return res.status(400).json({message });
  }
  //used validator.js
  if (!validator.isAlphanumeric(username)) {
    message = 'Username must be alphanumeric';
    return res.status(400).json({message });
  }
  if (!validator.isAlphanumeric(password)) {
    message = 'Password must be alphanumeric';
    return res.status(400).json({message });
  }

  if (password.length < 6) {
    message = 'Password must be at least 6 characters';
    return res.status(400).json({message });
  }

  try {
    //existing user as in other homework
    const existingUser = await User.findOne({  username });
    if (existingUser) {
      message = 'Username is already taken';
      return res.status(400).json({message });
    }

    // will use hash later but for now its not needed
    const user = new User({ username,  password });
    await user.save();

    // console.log('User registered successfully:', user);  

    return res.status(201).json({ message: 'Registration successful', userId: user._id });
  } catch (err) {
    console.log('Error during registration:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  let message;

  // Validate input
  if (!username || !password) {
    message = 'Username and password are required';
    console.log(message);
    return res.status(400).json({ message });
  }

  if (!validator.isAlphanumeric(username)) {
    message = 'Username must be alphanumeric';
    console.log(message);
    return res.status(400).json({ message });
  }

  if (password.length < 6) {
    message = 'Password must be at least 6 characters';
    console.log(message);
    return res.status(400).json({ message });
  }

  try {
    //find using username
    const user = await User.findOne({ username });
    if (!user) {
      message = 'Cannot find user';
      console.log(message);
      return res.status(400).json({ message });
    }


    // compare passowords
    if (password !== user.password) {
      message = 'Invalid username or password';
      console.log(message);
      return res.status(400).json({ message });
    }
    //match:
    return res.json({ message: 'Login successful', userId: user._id });
  } catch (err) {
    console.log('Error during login:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
