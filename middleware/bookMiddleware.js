const { body, validationResult } = require("express-validator");

const bookValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Book Title is Required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Title Must be 2-100 Characters"),

  body("author")
    .trim()
    .notEmpty()
    .withMessage("Author Name is Required")
    .isLength({ min: 2, max: 60 })
    .withMessage("Author Name Must be 2-60 Characters"),

  body("price")
    .notEmpty()
    .withMessage("Price is Required")
    .isFloat({ min: 0 })
    .withMessage("Price Must Be a Positive Number"),

  body("category").trim().notEmpty().withMessage("Category is Required"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description Must Be Text"),

  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock Must Be a Non-Negative Integer"),

  body("coverImage")
    .optional()
    .isString()
    .withMessage("Cover Image Must Be Text"),
];

const validationRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};

module.exports = {
  bookValidation,
  validationRequest,
};
