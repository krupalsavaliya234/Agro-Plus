import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import LoginHeader from "./LoginHeader";
import axios from "axios";
import API_URL from "../constants";
import toast, { Toaster } from 'react-hot-toast';

import "./styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [wait, setWait] = useState(false);

  const handleApi = async (e) => {
    e.preventDefault();
    setWait(true);
    const url = `${API_URL}/login`; // Ensure correct URL formation
    const data = { username, password };

    try {
      const res = await axios.post(url, data);

      if (res.data.token) { // Check for token to confirm successful login
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("userName", res.data.username);

        toast.success('🎉 Successfully Logged In!', { // Use toast.success for success message
          duration: 5000,
          position: 'top-center',
          style: { marginTop: "140px" },
          icon: '👏',
        });

        navigate("/");
      } else {
        toast.error('🙇 Please Try Again. Check Your Details!', { // Use toast.error for error message
          duration: 10000,
          position: 'top-center',
          style: { marginTop: "140px", width: "300px" },
          icon: '❌',
        });
      }
    } catch (err) {
      toast.error('🙇 Server Error. Please Try Again Later.', { // Use toast.error for error message
        duration: 5000,
        position: 'top-center',
        style: { marginTop: "140px" },
        icon: '🚨',
      });
      console.error('Error:', err); // Improved error logging
    } finally {
      setWait(false); // Ensure wait state is reset in all cases
    }
  };

  return (
    <div className="box3">
      <div className="loginHeader">
        <LoginHeader />
      </div>

      <div className="loginform3">
        <img className="logo3" src="Images/Secure login-bro.png" alt="Login Logo" />

        <h3 className="login-title3">Welcome to Login Page</h3>
        <br />
        <form className="login-form3" onSubmit={handleApi}>
          <label>Username*</label>
          <br />
          <input
            className="userinput3"
            type="text"
            placeholder="Your username"
            value={username}
            required
            title="Enter a valid username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br /><br />
          <label>Password*</label>
          <br />
          <input
            className="userinput3"
            type="password"
            placeholder="Your password"
            value={password}
            required
            title="Enter a valid password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="login-btn3" type="submit" disabled={wait}>
            {wait ? "PLEASE WAIT..." : "LOGIN"}
          </button>
          <br />
          <p className="newuser3">
            New User?{" "}
            <NavLink className="signup-link3" to="/signup">
              Sign Up
            </NavLink>
          </p>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default Login;
