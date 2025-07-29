const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// 📘 GET all books with pagination and .lean() for performance
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const books = await Book.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const totalBooks = await Book.countDocuments();

    res.json({
      books,
      totalPages: Math.ceil(totalBooks / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
});

// 📝 POST a new book
router.post('/', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const saved = await newBook.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Error saving book', error });
  }
});

// ❌ DELETE a book by ID
router.delete('/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: 'Error deleting book', error });
  }
});

module.exports = router;
