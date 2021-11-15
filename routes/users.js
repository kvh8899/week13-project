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

router.get('/signup', function(req, res, next) {
  res.send('respond with a signup page');
});

module.exports = router;
