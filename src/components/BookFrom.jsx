import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import '../styles/BookForm.css';

const BookForm = ({ initialValues, onSubmit }) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    author: Yup.string().required("Required"),
    isbn: Yup.string().required("Required"),
    publicationDate: Yup.date().required("Required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
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
          <ErrorMessage name="isbn" component="div" className="error-message" />
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

        <button type="submit" className="submit-button">
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default BookForm;
