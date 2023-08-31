import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../styles/BookForm.css";

const BookForm = ({ book, onSubmit }) => {
  const initialValues = {
    title: book ? book.title : "",
    author: book ? book.author : "",
    isbn: book ? book.isbn : "",
    publicationDate: book ? book.publicationDate : "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    isbn: Yup.string().required("ISBN is required"),
    publicationDate: Yup.date().required("Publication Date is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      if (book) {
        // If editing an existing book
        await axios.put(
          `https://library-management-1qq4.onrender.com/books/${book.id}`,
          values
        );
      } else {
        // If adding a new book
        await axios.post(
          "https://library-management-1qq4.onrender.com/books",
          values
        );
      }

      resetForm();
      onSubmit(); // Notify the parent component of the submission
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleBack = () => {
    onSubmit(); // Notify the parent component that the form is closed
  };

  return (
    <div className="book-form">
      <h2>{book ? " Edit Book" : " Add Book"}</h2>
      <div className="form-container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="form-field">
              <label>Title</label>
              <Field type="text" name="title" />
              <ErrorMessage
                name="title"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-field">
              <label>Author</label>
              <Field type="text" name="author" />
              <ErrorMessage
                name="author"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-field">
              <label>ISBN</label>
              <Field type="text" name="isbn" />
              <ErrorMessage
                name="isbn"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-field">
              <label>Publication Date</label>
              <Field type="date" name="publicationDate" />
              <ErrorMessage
                name="publicationDate"
                component="div"
                className="error-message"
              />
            </div>
            <div className="button-group">
              <button type="submit" className="submit-button">
                {book ? "Update" : "Submit"}
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={handleBack}
              >
                cancel
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default BookForm;
