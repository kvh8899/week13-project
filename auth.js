const createHttpError = require("http-errors");

const { User } = require("./db/models");

const restoreUser = async (req, res, next) => {
  if (!req.session.auth || !req.session.auth.userId) {
    res.locals.authenticated = false;
    return next();
  }
  const { userId } = req.session.auth;

  try {
    const user = await User.findByPk(userId);
    if (user) {
      res.locals.authenticated = true;
      res.locals.user = user;
      next();
    } else {
      res.locals.authenticated = false;
      next();
    }
  } catch (error) {
    res.locals.authenticated = false;
    next(error);
  }
};

/**
 * Adds the user ID to an `auth` object on `req.session`
 * @param {*} req
 * @param {*} user
 */
const loginUser = (req, user) => {
  return new Promise((resolve, reject) => {
    req.session.auth = { userId: user.id };
    req.session.save((err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};

const redirectUnauthedToLogin = async (req, res, next) => {
  if (res.locals.authenticated && res.locals.user) {
    return next();
  }
  return res.redirect("/login");
};

const requireAuth = [restoreUser, redirectUnauthedToLogin];

// API middlewares to require auth
const requireAuthApi = [
  restoreUser,

  (req, res, next) => {
    if (!res.locals.authenticated) {
      return next(createHttpError(401));
    }
    next();
  },
];

module.exports = {
  loginUser,
  requireAuth,
  requireAuthApi,
  restoreUser,
};
