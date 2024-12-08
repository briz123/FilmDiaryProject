The content below is an example project proposal / requirements document. Replace the text below the lines marked "__TODO__" with details specific to your project. Remove the "TODO" lines.


PROJECT NAME: FILM DIARY

# Film Diary

## Overview



I, like other people love watching movies. However, right now the only way I keep track of what I have watched and what I want to watch is by keeping a notes app in my phone. By now, its gotten really long but I think I have a solution for that.

I am going to create a web-app that is essentially a personal film diary. Users should be able to login add movies they are currently watching, have watched, and want to watch. They should also be able to add additional details such as year made, the desription and instead of a rating they should be able to put a thumbs up(1) and thumbs down(0) based on a number they enter. They can write reviews as well. While similar to letterboxed there should be less pressure to follow/unfollow other users, however people can view reviews on one of the home pages.


## Data Model


The application will store Users, Lists, Reviews

* users can have multiple lists (via references)
* each item can have a rating,review,description etc
* each list can have multiple items (by embedding)



(sample documents rough draft:)

An Example User:
They would have a username and password 
```javascript
{
  username: "shannonshopper",
  // photourl: //string
  password: // a password hash,
  lists: // an array of references 
}
```

This is for the actual list themselves
an example of a list name would be Watched, Watching,Want to watch

```javascript
{
  userid: // a reference to a User object
  listname: "string",
  items: [
    { itemid,"string"}
  ],
  // createdAt: // timestamp
}
```
```javascript
The Movie or Show that is being added to a list
{
  itemid: // a reference to a list object
  title: "string",
  year:"string",
  description:"string",
  genre:"id",
  rating:"number", //0 for thumbs up,1 for thumbs down
  review: [
    { reviewid: "string"}
  ],
  

}
```
```javascript

```
```
FROM ACTUAL db.mjs
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
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
});

// (Movie/Show) Schema
const itemSchema = new Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  description: { type: String, required: true },
  genre: { type: String }, 
  rating: { type: Number, min: 0, max: 1 },
  reviews: { type: String}
});

```
## [Link to Commented First Draft Schema](db.mjs) 

![Schema](db.mjs?raw=true "db")

## Wireframes

![Wireframe](documentation/WireframeFilmDiary.png?raw=true "Wireframe")
Am no longer using all the attributes of this wireframe as i have chosen to go much simpler for now

## Site map

https://app.mural.co/t/internet5512/m/internet5512/1730492131996/2c731ede10ba9a88072313a956d2230011d8965d?sender=ud5b94119bfeaba9559bf4117
Am no longer using all the attributes of this sitemap as i have chosen to go much simpler for now

## User Stories or Use Cases


1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new list
4. as a user, I can view all of the lists I've created 
5. as a user, I can add items to an existing list
8. as a user, I can logout of the site
9. as a user, I can write a review
10. as a user, I can view the home page after i login and my reviews


## Research Topics

Possible/planned research topics


* (6 points) Use a front-end framework
    * use react.js as the frontend framework
    * its a JavaScript library used for building user interfaces
    * I want to use it becuase I heard its really popular for webapps
    * I know that it is really useful for its components which will come in handy especially for things like the navbar and getting the reviews organized
* (4 points) Use a CSS framework or UI toolkit, use a reasonable of customization of the framework (don't just use stock Bootstrap - minimally configure a theme):
  * I would like to explore using Muix
  * Its a package to make components
  * I want to use it because its quicker than manually making buttons and components
  * It has a simple clean aesthetic compared to others I have seen

* (4 points) Perform client side form validation using a JavaScript library
    <!-- * see <code>cs.nyu.edu/~jversoza/ait-final/my-form</code> -->
    * if you put in a number that's greater than 1, an error message will appear in the dom
    * I am also considereing using validator.js which is supposed to be simple and lightweight for my purposes
    * I can make sure passwords, usernames arent too long or too short
    * I want to have error messages where users can go back in and correct their mistakes


## [Link to Initial Main Project File](app.mjs) 

![Express App File](index.mjs?raw=true "index.mjs")
## Annotations / References Used
































