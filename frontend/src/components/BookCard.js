// src/components/BookCard.js
import React, { memo } from "react";
import "./BookCard.css";
import { FaTrash } from "react-icons/fa";

const genreColors = {
  Fiction: "#f39c12",
  "Self-Help": "#16a085",
  Technology: "#2980b9",
  LITERATURE: "#8e44ad",
  NOVEL: "#c0392b",
  novel: "#c0392b",
  ghi: "#2c3e50",
};

function BookCard({ book, onDelete }) {
  const { title, author, genre, price, year, _id } = book;

  return (
    <div className="book-card">
      <div className="book-header">
        <h3>{title}</h3>
        <button onClick={() => onDelete(_id)} className="delete-btn" title="Delete">
          <FaTrash />
        </button>
      </div>
      <p><strong>Author:</strong> {author}</p>
      <p><strong>Price:</strong> ₹{price}</p>
      <p><strong>Year:</strong> {year}</p>
      <span
        className="genre-badge"
        style={{ backgroundColor: genreColors[genre] || "#7f8c8d" }}
      >
        {genre}
      </span>
    </div>
  );
}

export default memo(BookCard);
