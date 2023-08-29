import React, { useState } from "react";
import "../styles/BookList.css"; // Import your CSS file
import BookForm from "./BookFrom";

function BookList() {
  const [books, setBooks] = useState([]);

  const addBook = (book) => {
    setBooks([...books, book]);
  };

  return (
    <div className="book-list">
      <h2>Books</h2>
      <BookForm
        onSubmit={addBook}
        initialValues={{ title: "", author: "", isbn: "", publicationDate: "" }}
      />
      <div className="book-list-container">
        {books.map((book, index) => (
          <div key={index} className="book-card">
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>ISBN: {book.isbn}</p>
            <p>Publication Date: {book.publicationDate}</p>
            {/* You can add more details here */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;
