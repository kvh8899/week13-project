# CodeX

Website: [https://codexappaa.herokuapp.com/](https://codexappaa.herokuapp.com/)

## What is CodeX?

CodeX is an online publishing platform, inspired by Medium.com, for members of the tech industry. On it, you can write, read, and connect with others, on such topics as:
- software engineering
- computer science
- data science
- machine learning
- and more

### Did You Know?

The codex is the historical ancestor of the modern book, a bound collection of handwritten contents on non-paper materials. It also, conveniently, for our purposes, implies exchange of information, and computer code, a prominent feature of innovation and technology.

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

- Home page with stories
- User-authenticated home page with
	- stories from users you follow, and
	- recommended stories
- User registration and login (with demo account available)
- Story page
  - Comments section - authenticated users can add comments to a story
  - Follow / unfollow a user
  - Like / unlike
  	- Authenticated users can like or remove their like on the story
  	- Authenticated users can like or remove their like on comments
  - Live updates for comments, follows, and likes.
- Story creation page
  - Authenciated users can post new stories
  - Body text input supports Markdown

### Bonus Features

- Infinite scroll

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
