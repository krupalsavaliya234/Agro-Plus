import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../constants";
import toast, { Toaster } from 'react-hot-toast'; 
import "./styles/signup.css";
import LoginHeader from "./LoginHeader";

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [wait, setWait] = useState(false);

  const getotp = async (e) => {
    e.preventDefault();
    const url = `${API_URL}/signup`;
    const data = { mobile };
    try {
      const res = await axios.post(url, data);
      toast.success("OTP sent");
    } catch (err) {
      toast.error("Server error, please try again later.");
    }
  }

  const handleApi = async (e) => {
    e.preventDefault();
    setWait(true);
    const url = `${API_URL}/signup`;
    const data = { username, password, mobile, email };

    try {
      const res = await axios.post(url, data);
      setWait(false);

      if (res.status === 201) {
        toast.success('User Added Successfully 🎉', {
          duration: 5000,
          position: 'top-center',
          style: { marginTop: "140px" },
          icon: '👏',
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Shortened the delay
      } else if (res.status === 202) {
        toast('You already exist. Please log in.', {
          duration: 10000,
          position: 'top-center',
          style: { marginTop: "140px", width: "400px" },
          icon: '❗',
        });
      }
    } catch (err) {
      setWait(false);
      toast.error('Server error, please try again later.');
      console.error(err.message);
    }
  };

  return (
    <div className="box2">
      <div className="loginHeader">
        <LoginHeader />
      </div>
     
      <form className="loginform2" onSubmit={handleApi}>
        <img className="logo2 mb-2" src="Images/Sign up-amico.png" alt="Signup" />
        <h3 className="login-title2"> Welcome to Signup Page </h3>
        
        <label>Username</label>
        <input
          className="userinput2"
          type="text"
          required
          value={username}
          placeholder="your username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Mobile</label>
        <input
          className="userinput2"
          type="tel"
          required
          pattern="[0-9]{10}"
          placeholder="your mobile"
          title="Enter a 10-digit phone number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <label>Email</label>
        <input
          className="userinput2"
          type="email"
          required
          value={email}
          placeholder="your email"
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          title="Enter a valid email address"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          className="userinput2"
          type="password"
          required
          minLength="8"
          value={password}
          placeholder="your password"
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$"
          title="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn2" type="submit">
          {wait ? "PLEASE WAIT..." : "SIGNUP"}
        </button>

        <p className="newuser2">
          Already a user?{" "}
          <Link className="signup-link2" to="/login">
            {" "}
            Login{" "}
          </Link>
        </p>
      </form>

      <Toaster /> 
    </div>
  );
}

export default Signup;
