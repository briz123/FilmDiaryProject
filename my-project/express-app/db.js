import mongoose from 'mongoose';
// import path from 'path';
const { Schema } = mongoose;
import './config.js';
// import express from 'express';
import dotenv from 'dotenv';
// import { fileURLToPath } from 'url';
dotenv.config();
import bcrypt from 'bcryptjs';
// import mongooseSlugPlugin from 'mongoose-slug-plugin';
// console.log("ENv"+process.env.DSN);

//console.log("MongoDB DSN:", process.env.DSN);
mongoose.connect(process.env.DSN);

//console.log("ENv"+process.env.DSN);






// mongoose.connect("mongodb+srv://bcb5360:Brizen13@final-project.xsqjn.mongodb.net/final-project?retryWrites=true&w=majority&appName=final-project");


//same as in Readme.md just in schema format
//using mongoose


// User Schema
const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  lists: [{ type: Schema.Types.ObjectId, ref: 'List' }]
});

// List Schema
const listSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  // "Watched", "Want to Watch", "Currently Watching"
  listname: { type: String, required: true }, 
  items: [{ type: Schema.Types.ObjectId, ref: 'item' }]
});

// (Movie/Show) Schema
const itemSchema = new Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  description: { type: String, required: true },
  genre: { type: String }, 
  rating: { type: Number, min: 0, max: 1 },
  reviewDescription: { type: String,required: true},
  listId: { type: Schema.Types.ObjectId, ref: 'List', required: true }
});

// Review Schema
// const reviewSchema = new Schema({
//   itemId: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
//   userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   reviewdescription: { type: String, required: true },
// });

const User = mongoose.model('User', userSchema);
const List = mongoose.model('List', listSchema);
const Item = mongoose.model('Item', itemSchema);
// const Review = mongoose.model('Review', reviewSchema);


export { User, List, Item};
