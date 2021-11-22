# CodeX

Website: [https://codexappaa.herokuapp.com/](https://codexappaa.herokuapp.com/)

## What is CodeX?

CodeX is an online publishing platform, for members of the tech industry, inspired by [Medium.com](https://medium.com/). On it, you can write, read, and connect with others, on such topics as:
- software engineering
- computer science
- data science
- machine learning
- and more.

### Did You Know?

The codex, a bound collection of handwritten contents on non-paper materials, is the historical ancestor of the modern book. Conveniently, for our purposes, its pronunciation and spelling imply e**x**change of information, and echo computer **code**, a prominent feature of innovation and technology.

## Technologies Used

- JavaScript
- Express
- Pug
- CSS
- BCrypt
- Heroku
- Sequelize
- PostgreSQL

## Features

### Home Page with Stories

![Home Page](https://github.com/kvh8899/week13-project/blob/readme/public/images/screens-readme/homepage.png)

### User-Authenticated Home Page

![Home Page - User Authenticated](https://github.com/kvh8899/week13-project/blob/readme/public/images/screens-readme/homepage-user_auth.png)

*The feed features stories from users that you follow, and recommended stories.*
	
### User Registration and Login

![Login](https://github.com/kvh8899/week13-project/blob/readme/public/images/screens-readme/login.png)

*Demo account also available*

### Story Page

![Story - comments popover](https://github.com/kvh8899/week13-project/blob/readme/public/images/screens-readme/story-comments_and_likes.png)

- Comments section - authenticated users can add comments to a story
- Follow / unfollow a user
- Like / unlike
	- Authenticated users can like or remove their like on the story
	- Authenticated users can like or remove their like on comments
- Live updates for comments, follows, and likes.

### Story Creation Page

![Story Creation](https://github.com/kvh8899/week13-project/blob/readme/public/images/screens-readme/story-edit_with_markdown.png)

*Authenciated users can post new stories. Body text input supports Markdown*

![Story Edit](https://github.com/kvh8899/week13-project/blob/readme/public/images/screens-readme/story-edit.png)

*The authenticated user can also edit stories*

### Bonus Features

- Infinite scroll
```
let offset = 6;
    //Infinite scroll
    const bottomObserver = new IntersectionObserver( async (entries,observer) => {
        
        entries.forEach(async(entry) => {
            let url = '/api/stories?offset=' + offset;
            if(entry.isIntersecting ){
                let getPosts =  await fetch(url).then(res => res.json());
                offset += 6;
                constructPost(getPosts,'.pContainer');
            }
        })
    },{threshold:1})
    /*
        makes sure the element being observed exists
    */
    if(background) observer.observe(background);
    if(bottom) bottomObserver.observe(bottom);
    ```
*Quite cool, isn't it?*

### Upcoming Features

- Category tags
- Infinite scroll implementation for comments
- Recommended follows algorithm
  - based on current follows
  - using breadth-first search
- Search bar
- Trending stories
- User profile pages

## Installation

### Install necessary packages for node.js 

```npm install```

### Create the database

  1. Install postgres
  2. Create a database called ```codex_app```
  3. Set password as 'password' or any password. *Note: make sure it is the same password as the one in the .env file variables*
  4. Create a new env file. Use .env.example as a reference.
  5. Run migrations: ``` npx dotenv sequelize db:migrate ```
  6. Run seed data for testing: ```npx dotenv sequelize db:seed:all ```
  7. Start the server: ```npm start```

## Contributors

- [Justin Russo](https://github.com/justinrusso)
- [Ken Julian](https://github.com/kenjulian)
- [Kyle Huang](https://github.com/kvh8899)
- [Ricky Thang](https://github.com/rickythewriter)
