// src/components/BookList.js
import React, { useEffect, useState, useCallback, lazy, Suspense } from "react";
import axios from "axios";

const BookCard = lazy(() => import("./BookCard"));

function BookList() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Fetch books from backend with response destructuring
  const fetchBooks = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      console.log("✅ API response:", res.data);

      if (res.data && Array.isArray(res.data.books)) {
        setBooks(res.data.books); // take books array from response
      } else {
        console.error("❌ Unexpected response:", res.data);
        setBooks([]); // fallback
      }
    } catch (error) {
      console.error("❌ Error fetching books:", error.message);
      setBooks([]); // fallback
    }
  }, []);

  // ✅ Fetch on mount
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // ✅ Delete and refetch
  const handleDelete = useCallback(
    async (id) => {
      try {
        await axios.delete(`http://localhost:5000/api/books/${id}`);
        fetchBooks();
      } catch (err) {
        console.error("❌ Failed to delete book:", err.message);
      }
    },
    [fetchBooks]
  );

  // ✅ Safe filter with optional chaining
  const filteredBooks = Array.isArray(books)
    ? books.filter(
        (book) =>
          book?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book?.author?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div>
      {/* 🔍 Search bar */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by title or author"
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* 📚 Book Cards with lazy loading */}
      <Suspense fallback={<div style={{ textAlign: "center" }}>Loading books...</div>}>
        <div className="book-list">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <BookCard key={book._id} book={book} onDelete={handleDelete} />
            ))
          ) : (
            <p style={{ textAlign: "center" }}>No books found.</p>
          )}
        </div>
      </Suspense>
    </div>
  );
}

export default BookList;
