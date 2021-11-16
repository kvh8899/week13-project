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
  req.session.auth = { userId: user.id };
};

module.exports = {
  loginUser,
  restoreUser,
};
