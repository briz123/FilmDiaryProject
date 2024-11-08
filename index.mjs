import dotenv from 'dotenv';
dotenv.config();

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
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname,'dist'); 
// console.log(distPath);
// app.use(express.static(distPath));
//app.use(express.static(path.join(__dirname,'dist')));
const PORT = process.env.PORT ?? 12154;
console.log('Using port:', PORT);
app.use(cors({
  //origin: "http://linserv1.cims.nyu.edu:12153",
  origin: "http://localhost:12154",
}));

// app.listen(process.env.PORT ?? 3000);
//make new list

app.post('/api/lists',async(req,res)=>{
    const {userId, listname} = req.body;
    const user = await User.findbyID(userId);
    //user doenst sexist
    if(!user){
        return res.status(400).send("User not Found");
    }
    const list = new List({
        userId,
        listname,
        items:[],
    });

    await list.save();
    //add to reference
    user.lists.push(list._id);
    await user.save();
    res.send(list);
});
//delete old one
app.delete('/api/lists/:id',async (req,res)=>{
    const {id} = req.params;
    
    const list = await List.findByIdAndDelete(id);

    const user = await User.findById(list.userId);

    if (user) {
      user.lists = user.lists.filter((listId) => listId.toString() !== id);
      await user.save();
    }

    res.status(204).send();
});

app.get('/api/lists/:userId', async (req, res) => {
    const { userId } = req.params;

    const user = await User.findById(userId).populate('lists');

    // if (!user) {
    // return res.status(404).json({ error: 'User not found' });
    // }

    res.status(200).send(user.lists); 

    
  });

  app.get('*',(req,res)=>{
    //res.sendFile(path.join(distPath, 'index.html'));
    console.log('Serving index from:',path.join(distPath, 'index.html')); 
    res.sendFile(path.join(distPath, 'index.html'));
    // res.sendFile('./index.html');
  });

  // app.listen(process.env.PORT || 12154);
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });