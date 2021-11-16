const csrf = require("csurf");
const { validationResult } = require("express-validator");

const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res, next).catch(next);

const csrfProtection = csrf({ cookie: true });

const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    res.locals.errors = validationErrors.array().map((error) => error.msg);
  }

  next();
};

module.exports = {
  asyncHandler,
  csrfProtection,
  handleValidationErrors,
};
