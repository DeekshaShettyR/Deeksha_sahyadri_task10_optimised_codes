import React from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="app">
      <h1><i className="fas fa-book-reader"></i> Book Management System</h1>
      <BookForm />
      <BookList />
      <ToastContainer />
    </div>
  );
}

export default App;
