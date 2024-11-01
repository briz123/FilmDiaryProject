The content below is an example project proposal / requirements document. Replace the text below the lines marked "__TODO__" with details specific to your project. Remove the "TODO" lines.


PROJECT NAME: FILM DIARY

# Shoppy Shoperson 

## Overview



I, like other people love watching movies. However, right now the only way I keep track of what I have watched and what I want to watch is by keeping a notes app in my phone. By now, its gotten really long but I think I have a solution for that.

I am going to create a web-app that is essentially a personal film diary. Users should be able to login add movies they are currently watching, have watched, and want to watch. They should also be able to add additional details such as year made, the desription and instead of a rating they should be able to put a thumbs up and thumbs down. They can write reviews as well. While similar to letterboxed there should be less pressure to follow/unfollow other users. I also want to add the ability to download a pdf of a users lists which they can then share if they ever need to.


## Data Model


The application will store Users, Lists, Reviews

* users can have multiple lists (via references)
* each user can have multiple reviews (by embedding)
* each list can have multiple items (by embedding)
* each item can have multiple reviews (by embedding)


(sample documents:)

An Example User:

```javascript
{
  username: "shannonshopper",
  userid: //string
  photourl: //string
  hash: // a password hash,
  lists: // an array of references 
}
```



```javascript
{
  userid: // a reference to a User object
  listname: "string",
  listid:"string",
  items: [
    { itemid,"string"}
  ],
  createdAt: // timestamp
}
```
```javascript
//movie/film
{
  itemid: // a reference to a list object
  title: "string",
  year:"string",
  description:"string",
  genre:"id",
  rating:"number", //0 for thumbs up,1 for thumbs down
  reviews: [
    { reviewid: "string"}
  ],
  

}
```
```javascript
//review
{
  reviewid: "string"
  itemid: "string",
  userid:"string",
  reviewdescription:"string",
  createdAt: // timestamp
  

}
```


## [Link to Commented First Draft Schema](db.mjs) 

(__TODO__: create a first draft of your Schemas in db.mjs and link to it)

## Wireframes

(__TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc.)

/list/create - page for creating a new shopping list

![list create](documentation/list-create.png)

/list - page for showing all shopping lists

![list](documentation/list.png)

/list/slug - page for showing specific shopping list

![list](documentation/list-slug.png)

## Site map

(__TODO__: draw out a site map that shows how pages are related to each other)

Here's a [complex example from wikipedia](https://upload.wikimedia.org/wikipedia/commons/2/20/Sitemap_google.jpg), but you can create one without the screenshots, drop shadows, etc. ... just names of pages and where they flow to.

## User Stories or Use Cases

(__TODO__: write out how your application will be used through [user stories](http://en.wikipedia.org/wiki/User_story#Format) and / or [use cases](https://en.wikipedia.org/wiki/Use_case))

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new grocery list
4. as a user, I can view all of the grocery lists I've created in a single list
5. as a user, I can add items to an existing grocery list
6. as a user, I can cross off items in an existing grocery list

## Research Topics

(__TODO__: the research topics that you're planning on working on along with their point values... and the total points of research topics listed)

* (5 points) Integrate user authentication
    * I'm going to be using passport for user authentication
    * And account has been made for testing; I'll email you the password
    * see <code>cs.nyu.edu/~jversoza/ait-final/register</code> for register page
    * see <code>cs.nyu.edu/~jversoza/ait-final/login</code> for login page
* (4 points) Perform client side form validation using a JavaScript library
    * see <code>cs.nyu.edu/~jversoza/ait-final/my-form</code>
    * if you put in a number that's greater than 5, an error message will appear in the dom
* (5 points) vue.js
    * used vue.js as the frontend framework; it's a challenging library to learn, so I've assigned it 5 points

10 points total out of 8 required points (___TODO__: addtional points will __not__ count for extra credit)


## [Link to Initial Main Project File](app.mjs) 

(__TODO__: create a skeleton Express application with a package.json, app.mjs, views folder, etc. ... and link to your initial app.mjs)

## Annotations / References Used

(__TODO__: list any tutorials/references/etc. that you've based your code off of)

1. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)
2. [tutorial on vue.js](https://vuejs.org/v2/guide/) - (add link to source code that was based on this)

