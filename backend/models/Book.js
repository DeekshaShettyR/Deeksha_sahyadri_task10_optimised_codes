const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  price: Number,
  year: Number,
});
// In models/Book.js (Mongoose Schema)
bookSchema.index({ title: 1 });
bookSchema.index({ author: 1 });


module.exports = mongoose.model('Book', bookSchema);
