const bcrypt = require("bcryptjs");
const express = require("express");
const { check } = require("express-validator");
const { Op } = require("sequelize");

const { loginUser, restoreUser } = require("../auth");
const { User } = require("../db/models");
const {
  asyncHandler,
  csrfProtection,
  handleValidationErrors,
} = require("./utils");

const router = express.Router();

const validateEmailAndPass = [
  check("email")
    .exists({ checkFalsey: true })
    .withMessage("Please provide an email address.")
    .isLength({ max: 255 })
    .withMessage("Email address must not be more than 255 characters long.")
    .isEmail()
    .withMessage("Email address is invalid."),

  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password"),
];

const signupValidator = [
  check("username")
    .exists({ checkFalsey: true })
    .withMessage("Please provide an username.")
    .isLength({ max: 50 })
    .withMessage("Username must be less than or equal to 50 characters."),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be more than 8 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "g")
    .withMessage(
      'Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'
    ),

  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Confirm Password")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm Password does not match Password");
      }
      return true;
    }),

  check(["username", "email"]).custom(([username, email]) => {
    return User.findOne({
      where: { [Op.or]: { username, email } },
    }).then((user) => {
      if (user) {
        if (user.username === username) {
          return Promise.reject("The provided username is already in use.");
        } else if (user.email === email) {
          return Promise.reject("The provided email is already in use.");
        }
      }
    });
  }),
];

router.get("/login", csrfProtection, restoreUser, function (req, res) {
  if (res.locals && res.locals.authenticated) {
    return res.redirect("/");
  }
  res.render("login", { csrfToken: req.csrfToken() });
});

const failedLogin = (req, res) => {
  const { email } = req.body;

  console.log(res.locals.errors);

  res.render("login", {
    csrfToken: req.csrfToken(),
    user: { email },
  });
};

router.post(
  "/login",
  csrfProtection,
  validateEmailAndPass,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (res.locals.errors) {
      return failedLogin(req, res);
    }

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      res.locals.errors = ["Email or Password is incorrect."];
      return failedLogin(req, res);
    }

    const matches = await bcrypt.compare(password, user.password.toString());

    if (matches) {
      loginUser(req, user);
      res.redirect("/");
      return;
    }
    res.locals.errors = ["Email or Password is incorrect."];
    return failedLogin(req, res);
  })
);

router.get("/signup", csrfProtection, restoreUser, async function (req, res) {
  if (res.locals && res.locals.authenticated) {
    return res.redirect("/");
  }
  res.render("signup", {
    csrfToken: req.csrfToken(),
  });
});

router.post(
  "/signup",
  csrfProtection,
  validateEmailAndPass,
  signupValidator,
  handleValidationErrors,
  async function (req, res, next) {
    const { password, email, username } = req.body;

    if (res.locals.errors) {
      res.render("signup", {
        csrfToken: req.csrfToken(),
        user: {
          email,
          username,
        },
      });
    }

    try {
      const hashedPass = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        username,
        password: hashedPass,
      });
      loginUser(req, user);
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  }
);

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
