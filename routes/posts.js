var express = require('express');
const app = require('../app');
var router = express.Router();

router.get('/posts',(req,res) => {
    res.render('posts');
})

module.exports = router;