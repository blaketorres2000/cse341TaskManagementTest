const { body, validationResult } = require("express-validator");

const userValidation = [
  body("username").optional().isString().trim().escape(),
  body("displayName").optional().isString().trim().escape(),
  body("firstName").optional().isString().trim().escape(),
  body("lastName").optional().isString().trim().escape(),
  body("userRole").optional().isString().trim().escape(),
  body("email").optional().isEmail().normalizeEmail(),
  body("password").optional().isString().trim().escape(),
  body("profilePic").optional().isString(),
];

const validateUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { userValidation, validateUser };