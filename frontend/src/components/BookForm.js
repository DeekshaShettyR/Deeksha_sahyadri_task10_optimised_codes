import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const BookForm = () => {
  const [book, setBook] = useState({ title: '', author: '', genre: '', price: '', year: '' });

  const handleChange = e => setBook({ ...book, [e.target.name]: e.target.value });

  const addBook = async () => {
    try {
      await axios.post('http://localhost:5000/api/books', book);
      toast.success("Book added!");
      setBook({ title: '', author: '', genre: '', price: '', year: '' });
    } catch {
      toast.error("Failed to add book");
    }
  };

  return (
    <div className="form">
      {['title', 'author', 'genre', 'price', 'year'].map(field => (
        <input
          key={field}
          name={field}
          value={book[field]}
          onChange={handleChange}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
        />
      ))}
      <button onClick={addBook}>Add Book</button>
    </div>
  );
};

export default BookForm;
