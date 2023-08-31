import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../styles/AuthorForm.css"
import { FaArrowLeft } from "react-icons/fa";

const AuthorForm = ({ author, onSubmit }) => {
  const initialValues = {
    name: author ? author.name : "",
    birthDate: author ? author.birthDate : "",
    biography: author ? author.biography : "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    birthDate: Yup.date().required("Birth Date is required"),
    biography: Yup.string().required("Biography is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      if (author) {
        // If author exists, perform an update (PUT) request
        await axios.put(`https://library-management-1qq4.onrender.com/authors/${author.id}`, values);
      } else {
        // If author doesn't exist, perform a create (POST) request
        await axios.post("https://library-management-1qq4.onrender.com/authors", values);
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
    <div className="author-form">
      <h2>
        <FaArrowLeft onClick={handleBack} />
        {author ? " Edit Author" : " Add Author"}
      </h2>
      <div className="form-container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="form-field">
              <label>Name</label>
              <Field type="text" name="name" />
              <ErrorMessage
                name="name"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-field">
              <label>Birth Date</label>
              <Field type="date" name="birthDate" />
              <ErrorMessage
                name="birthDate"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-field">
              <label>Biography</label>
              <Field as="textarea" name="biography" />
              <ErrorMessage
                name="biography"
                component="div"
                className="error-message"
              />
            </div>

            <button type="submit" className="submit-button">
              {author ? "Update" : "Submit"}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AuthorForm;
