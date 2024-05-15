import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        navigate("/");
      }
    });
  };
  return (
    <div className="App">
      <div className="loginContainer">
          <h2 className="formTitle">Login</h2>
            <div className="loginField">
              <label>Username:</label>
              <input
                type="text"
                placeholder="Enter Username"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </div>
            <div className="loginField">
              <label>Password:</label>
              <input
                type="password"
                placeholder="Ente Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
            <button onClick={login}> Login </button> 
      </div>
      <div className="additional-info">
        <p>Created by Surya</p>
        <p>&copy; <span id="year"></span> Connect App. All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default Login;
