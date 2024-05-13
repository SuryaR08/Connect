import { useContext, useEffect } from "react";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
 

function CreatePost() {
  const navigate = useNavigate();
  const initialValues = {
    title: "",
    postText: "",
    // username: "",
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required(),
    // username: Yup.string().min(3).max(15).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then((response) => {
      navigate("/");
    });
  };

  return (
    <div className="App">
      <div className="createPostPage">
        <div className="formContainer">
          <h2 className="formTitle">Create Post</h2>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="formField">
                  <label htmlFor="title">Title:</label>
                  <Field
                    type="text"
                    id="createPostPage"
                    name="title"
                    placeholder="Enter Title"
                    className={errors.title && touched.title ? "error" : ""}
                  />
                  {errors.title && touched.title && (
                    <div className="errorMessage">{errors.title}</div>
                  )}
                </div>
                <div className="formField">
                  <label htmlFor="postText">Post:</label>
                  <Field
                    as="textarea"
                    id="createPostPage"
                    name="postText"
                    placeholder="Enter Post"
                    className={
                      errors.postText && touched.postText ? "error" : ""
                    }
                  />
                  {errors.postText && touched.postText && (
                    <div className="errorMessage">{errors.postText}</div>
                  )}
                </div>
                {/* <div className="formField">
                  <label htmlFor="username">Username:</label>
                  <Field
                    type="text"
                    id="createPostPage"
                    name="username"
                    placeholder="Enter Username"
                    className={
                      errors.username && touched.username ? "error" : ""
                    }
                  />
                  {errors.username && touched.username && (
                    <div className="errorMessage">{errors.username}</div>
                  )}
                </div> */}
                <button type="submit">Create Post</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
