import dotenv from 'dotenv';
dotenv.config();
// import mongoose from 'mongoose';
import './config.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import './db.js';
import {User, List, Item} from './db.js';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import authRoutes from './authRoutes.js';

// import mongoose from 'mongoose';
// import sanitize from 'mongo-sanitize';

const app = express();
//app.options('/api/*', cors(corsOptions)); 
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
app.use(cors());
//app.use(cors({origin: ['http://localhost:12153', 'http://linserv1.cims.nyu.edu:12153']})); 


// app.listen(process.env.PORT ?? 3000);
//authentication
//Using a Router
app.use('/api/auth', authRoutes);
//make new list

//Create a new list
app.post('/api/lists', async (req, res) => {
  const { userId, listName } = req.body;

  // find the user by userId
  const user = await User.findById(userId);
  //no user
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  // create a new list and save it
  const list = new List({ userId, listname: listName });
  await list.save();

  // Add the list to the user's list
  user.lists.push(list._id);
  await user.save();
 //success
  res.status(200).json(list);
});

// get all lists for a user
app.get('/api/lists/:userId', async (req, res) => {
  const { userId } = req.params;

  // Check if the user exists
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Fetch lists associated with the user
  const lists = await List.find({ userId });
  res.json(lists);

  //res.status(200).json(user.lists); 
});
  //
  // app.get('*',(req,res)=>{
  //   //res.sendFile(path.join(distPath, 'index.html'));
  //   console.log('Serving index from:',path.join(distPath, 'index.html')); 
  //   res.sendFile(path.join(distPath, 'index.html'));
  //   // res.sendFile('./index.html');
  // });

  app.post('/api/items', async (req, res) => {
    const { listId, title, year, description, genre, rating,reviewDescription } = req.body;
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }
    //new show/movie
    const item = new Item({
      listId,
      title,
      year,
      description,
      genre,
      rating,
      reviewDescription,
    });
    await item.save();
    //save and then add
    list.items.push(item._id);
    await list.save();
    res.status(200).json(item);
  });
  
  app.get('/api/items/:listId', async (req, res) => {
    const { listId } = req.params;
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ error: 'List not found' });
    }

    const items = await Item.find({ listId });
    res.json(items); 
  });
  app.get('/api/items/user/:userId',async(req,res)=>{
    const { userId } = req.params;
    //console.log(`Items? ${userId}`);
    const lists = await List.find({userId});
    //console.log('lists found:', lists);
    //used AI tool for this because kept getting errors when retrieving
    const items = await Item.find({listId: { $in: lists.map(list => list._id) } });
    //console.log('items found:', items);
  res.json(items);
  });

  // app.listen(process.env.PORT || 12154);
  app.listen(PORT, () => {
    console.log(`Server is running at http://linserv1.cims.nyu.edu:${PORT}`);
  });