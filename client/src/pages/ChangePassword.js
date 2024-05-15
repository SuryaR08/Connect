import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigate function from useNavigate hook

  const changePassword = () => {
    axios
      .put(
        "http://localhost:3001/auth/changepassword",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data && response.data.error) {
          setErrorMessage(response.data.error);
        } else {
          setErrorMessage("");
          localStorage.removeItem("accessToken");
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error changing password:", error);
        setErrorMessage("An error occurred while changing password.");
      });
  };

  return (
    <div className="App">
      <div className="loginContainer">
        <h2 className="formTitle">Change Password</h2>
        <div className="loginField">
          <label>Old Password:</label>
          <input
            type="password"
            onChange={(event) => {
              setOldPassword(event.target.value);
            }}
          />
        </div>
        <div className="loginField">
          <label>New Password:</label>
          <input
            type="password"
            onChange={(event) => {
              setNewPassword(event.target.value);
            }}
          />
        </div>
        <button onClick={changePassword}> Save </button>
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
      <div className="additional-info">
        <p>Created by Surya</p>
        <p>
          &copy; <span id="year"></span> Connect App. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

export default ChangePassword;
