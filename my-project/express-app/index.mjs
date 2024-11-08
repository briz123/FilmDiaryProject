import dotenv from 'dotenv';
dotenv.config();
// import mongoose from 'mongoose';
import './config.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import './db.js';
import {User, List} from './db.js';
import cors from 'cors';

// import mongoose from 'mongoose';
// import sanitize from 'mongo-sanitize';


const app = express();
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname,'dist'); 
// console.log(distPath);
// app.use(express.static(distPath));
//app.use(express.static(path.join(__dirname,'dist')));
const PORT = process.env.PORT ?? 23399;
console.log('Using port:', PORT);
//need to use cors to run both at the same time
app.use(cors({origin: 'http://linserv1.cims.nyu.edu:12153',}));

// app.listen(process.env.PORT ?? 3000);
//make new list

//Create a new list
app.post('/api/lists', async (req, res) => {
  const { userId, listname } = req.body;

  // Find the user by userId
  const user = await User.findById(userId);
  //no user
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  // Create a new list and save it
  const list = new List({ userId, listname });
  await list.save();

  // Add the list to the user's list
  user.lists.push(list._id);
  await user.save();
 //success
  res.status(200).json(list);
});

// Get all lists for a user
app.get('/api/lists/:userId', async (req, res) => {
  const { userId } = req.params;
  
  const user = await User.findById(userId).populate('lists');
  //no user
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json(user.lists); 
});
  //
  app.get('*',(req,res)=>{
    //res.sendFile(path.join(distPath, 'index.html'));
    console.log('Serving index from:',path.join(distPath, 'index.html')); 
    res.sendFile(path.join(distPath, 'index.html'));
    // res.sendFile('./index.html');
  });

  // app.listen(process.env.PORT || 12154);
  app.listen(PORT, () => {
    console.log(`Server is running at http://linserv1.cims.nyu.edu:${PORT}`);
  });