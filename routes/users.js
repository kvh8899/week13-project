const bcrypt = require('bcryptjs');
const express = require('express');
const { check } = require('express-validator');
const { Op } = require('sequelize');

const { loginUser, restoreUser } = require('../auth');
const { User } = require('../db/models')
const { asyncHandler, csrfProtection } = require('./utils');

const router = express.Router();

const validateEmailAndPass = [
  check('email')
  .exists({checkFalsey: true})
  .withMessage('Please provide an email address.')
  .isLength({max: 255})
  .withMessage('Email address must not be more than 255 characters long.')
  .isEmail().withMessage('Email address is invalid.'),

  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password")
    .isLength({ min: 8 })
    .withMessage("Password must be more than 8 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "g")
    .withMessage(
      'Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'
    ),
   
];

const signupValidator = [
  check('username')
  .exists({checkFalsey: true})
  .withMessage('Please provide an username.')
  .isLength({max: 50})
  .withMessage('Username must be less than or equal to 50 characters.'),

  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Confirm Password")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm Password does not match Password");
      }
      return true;
    }),

  check(['username', 'email']).custom(([username, email]) => {
    return User.findOne({
      where: {[Op.or]: {username, email}}
    })
    .then(user => {
      if (user) {
        if (user.username === username) {
          return Promise.reject('The provided username is already in use.')

        } else if (user.email === email) {
          return Promise.reject('The provided email is already in use.')

        }
          
      }
    })

  }) 
]

router.get('/login', csrfProtection, restoreUser, function(req, res) {
  if (res.locals && res.locals.authenticated) {
    return res.redirect('/')
  }
  res.render('login', { csrfToken: req.csrfToken() });
});

router.post('/login', csrfProtection, validateEmailAndPass, asyncHandler(async (req, res) => {
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

router.post('/signup',csrfProtection, validateEmailAndPass, signupValidator, async function(req,res){
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
