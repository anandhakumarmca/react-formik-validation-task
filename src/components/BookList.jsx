import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/BookList.css"; // Import your CSS file
import BookForm from "./BookFrom"; 
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"; // Import icons

function BookList() {
  const [books, setBooks] = useState([]);
  const [showAddBookForm, setShowAddBookForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    axios.get("https://library-management-1qq4.onrender.com/books").then((response) => {
      setBooks(response.data);
    });
  }, []);

  const handleEdit = (book) => {
    setSelectedBook(book);
    setShowAddBookForm(true);
  };

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`https://library-management-1qq4.onrender.com/books/${bookId}`);
      setBooks(books.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="book-list">
      <h2>Books</h2>
      {showAddBookForm ? (
        <div className="book-card add-book-card full-width-card">
          <BookForm
            book={selectedBook}
            onSubmit={() => {
              setShowAddBookForm(false);
              setSelectedBook(null);
            }}
          />
        </div>
      ) : (
        <div className="book-list-container">
          <div
            className="book-card add-book-card"
            onClick={() => setShowAddBookForm(true)}
          >
            <FaPlus className="add-icon" /> Add Book
          </div>
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>ISBN: {book.isbn}</p>
              <p>Publication Date: {book.publicationDate}</p>
              <div className="book-actions">
                <FaEdit
                  className="edit-icon"
                  onClick={() => handleEdit(book)}
                />Edit
                <FaTrash
                  className="delete-icon"
                  onClick={() => handleDelete(book.id)}
                />Delete
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList;
