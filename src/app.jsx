import './config.jsx';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import './db.jsx';
import {User, List, Item} from './db.jsx';

import mongoose from 'mongoose';
import sanitize from 'mongo-sanitize';


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.listen(process.env.PORT ?? 3000);
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
