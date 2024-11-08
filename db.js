import mongoose from 'mongoose';

const { Schema } = mongoose;

// import mongooseSlugPlugin from 'mongoose-slug-plugin';

import dotenv from 'dotenv';
dotenv.config();
//console.log("MongoDB DSN:", process.env.DSN);
//mongoose.connect('mongodb://localhost/hw05');
console.log(process.env.DSN);






mongoose.connect(process.env.DSN);


//same as in Readme.md just in schema format
//using mongoose


// User Schema
const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profilePhotoUrl: { type: String, default: '' },
  lists: [{ type: Schema.Types.ObjectId, ref: 'List' }]
});

// List Schema
const listSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  // "Watched", "Want to Watch", "Currently Watching"
  listname: { type: String, required: true }, 
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
});

// (Movie/Show) Schema
const itemSchema = new Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  description: { type: String, required: true },
  genre: { type: String }, 
  rating: { type: Number, min: 0, max: 1 },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
});

// Review Schema
const reviewSchema = new Schema({
  itemId: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  reviewdescription: { type: String, required: true },
 
});

const User = mongoose.model('User', userSchema);
const List = mongoose.model('List', listSchema);
const Item = mongoose.model('Item', itemSchema);
const Review = mongoose.model('Review', reviewSchema);


export { User, List, Item, Review };
