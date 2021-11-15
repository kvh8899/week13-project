const bcrypt = require('bcryptjs');
const express = require('express');

const { loginUser, restoreUser } = require('../auth');
const { User } = require('../db/models')
const { asyncHandler, csrfProtection } = require('./utils');

const router = express.Router();

router.get('/login', csrfProtection, restoreUser, function(req, res) {
  if (res.locals && res.locals.authenticated) {
    return res.redirect('/')
  }
  res.render('login', { csrfToken: req.csrfToken() });
});

router.post('/login', csrfProtection, asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email
    }
  })

  if (!user) {
    res.render('login', {
      csrfToken: req.csrfToken(),
      errors: [
        "Email or Password is incorrect."
      ]
    })
  }

  const matches = await bcrypt.compare(password, user.password.toString());

  if (matches) {
    loginUser(req, user)
    res.redirect('/');
    return;
  }

  res.render('login', {
    csrfToken: req.csrfToken(),
    errors: [
      "Email or Password is incorrect."
    ]
  })
}))

router.get('/signup',csrfProtection,restoreUser, async function(req, res, next) {
  if (res.locals && res.locals.authenticated) {
    return res.redirect('/');
  }
  res.render("signup",{
    csrfToken:req.csrfToken()
  });
});

router.post('/signup',csrfProtection, async function(req,res){
  const {password,confirmPassword,email,username} = req.body
 
 try{
   const hashedPass = await bcrypt.hash(password,10);
    const user = await User.create({
      email,
      username,
      password: hashedPass
    })
    loginUser(req,user);
    res.redirect('/');
 }catch(e){
    //render errors on the page
    console.log('invalid input')
    res.render('signup',{csrfToken:req.csrfToken()});
 }
});

router.post('/logout', (req,res) => {
  
  req.session.destroy(() => {
    res.redirect('/');
  })
  
})

module.exports = router;
