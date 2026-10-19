const Book = require("../models/Book");

exports.createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    let page = Number(req.query.page);
    let limit = Number(req.query.limit);

    if (!page || page < 1 || !Number.isInteger(page)) {
      page = 1;
    }

    if (!limit || limit < 1 || !Number.isInteger(limit)) {
      limit = 10;
    }

    if (limit > 100) {
      limit = 100;
    }

    const skip = (page - 1) * limit;

    const books = await Book.find().skip(skip).limit(limit);

    const totalBooks = await Book.countDocuments();

    res.status(200).json({
      success: true,
      currentPage: page,
      limit: limit,
      totalBooks: totalBooks,
      books: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ book });
  } catch (error) {
    res.status(400).json({ message: "Invalid book ID" });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return res.status(404).json({
        message: "Book Not Found",
      });
    }

    res.status(200).json({
      message: "Book Updated Successfully",
      book,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully", book });
  } catch (error) {
    res.status(400).json({ message: "Invalid book ID" });
  }
};
