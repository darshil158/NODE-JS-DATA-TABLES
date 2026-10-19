const {
  bookValidation,
  validationRequest,
} = require("../middleware/bookMiddleware");

const express = require("express");

const router = express.Router();

const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

router.post("/", createBook);

router.get("/", getBooks);

router.get("/:id", getBookById);

router.put("/:id", updateBook);

router.delete("/:id", deleteBook);

router.post("/", bookValidation, validationRequest, createBook);

router.put("/:id", bookValidation, validationRequest, updateBook);

module.exports = router;
