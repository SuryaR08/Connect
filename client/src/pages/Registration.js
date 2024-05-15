import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

function Registration() {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {
      console.log(data);
    });
  };

  return (
    <div className="App">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="loginContainer">
          <h2 className="formTitle">Register</h2>
          <div className="loginField">
            <label>Username: </label>
            <ErrorMessage name="username" component="span" />
            <Field
              autocomplete="off"
              type="text"
              id="createPostPage"
              name="username"
              placeholder="Enter Username"
            />
          </div>
          <div className="loginField">
            <label htmlFor="title">Password: </label>
            <ErrorMessage name="password" component="span" />
            <Field
              autocomplete="off"
              type="text"
              id="createPostPage"
              name="password"
              placeholder="Enter Password"
            />
          </div>
          <button type="submit">Register</button>
        </Form>
      </Formik>
      <div className="additional-info">
        <p>Created by Surya</p>
        <p>
          &copy; <span id="year"></span> Connect App. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

export default Registration;
