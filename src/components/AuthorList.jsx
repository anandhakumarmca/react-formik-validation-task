import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthorForm from "./AuthorForm";
import "../styles/AuthorList.css";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa"; // Import icons

function AuthorList() {
  const [authors, setAuthors] = useState([]);
  const [showAddAuthorForm, setShowAddAuthorForm] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/authors").then((response) => {
      setAuthors(response.data);
    });
  }, []);

  const handleEditAuthor = (author) => {
    setSelectedAuthor(author);
    setShowAddAuthorForm(true);
  };

  const handleDeleteAuthor = async (authorId) => {
    try {
      await axios.delete(`http://localhost:3001/authors/${authorId}`);
      setAuthors(authors.filter((author) => author.id !== authorId));
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };

  return (
    <div className="author-list">
      <h2>Authors</h2>
      {showAddAuthorForm ? (
        <div className="author-card add-author-card full-width-card">
          <AuthorForm
            author={selectedAuthor}
            onSubmit={() => {
              setSelectedAuthor(null);
              setShowAddAuthorForm(false);
            }}
          />
        </div>
      ) : (
        <div className="author-list-container">
          <div
            className="author-card add-author-card"
            onClick={() => setShowAddAuthorForm(true)}
          >
            <FaPlus className="add-icon" /> Add Author
          </div>
          {authors.map((author) => (
            <div key={author.id} className="author-card">
              <h3>{author.name}</h3>
              <p>Birth Date: {author.birthDate}</p>
              <p>Biography: {author.biography}</p>
              <div className="author-actions">
                <FaEdit
                  className="edit-icon"
                  onClick={() => handleEditAuthor(author)}
                />
                <FaTrash
                  className="delete-icon"
                  onClick={() => handleDeleteAuthor(author.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AuthorList;
