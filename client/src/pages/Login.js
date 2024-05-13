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
      <div className="createPostPage">
        <div className="formContainer">
          <h2 className="formTitle">Login</h2>
          <div className="loginContainer">
            <div className="formField">
              <label>Username:</label>
              <input
                type="text"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </div>
            <div className="formField">
              <label>Password:</label>
              <input
                type="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
            <button onClick={login}> Login </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
