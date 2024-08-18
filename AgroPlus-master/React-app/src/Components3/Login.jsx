import React, { useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import LoginHeader from "./LoginHeader";
import axios from "axios";
import API_URL from "../constants";
// import { ToastContainer, toast } from "react-toastify";
import toast, { Toaster } from 'react-hot-toast'; 

import "./styles/login.css";
function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
const [wait,setWait]=useState(false)
  const handleApi = (e) => {
    setWait(true)
    e.preventDefault();
    const url = API_URL + "/login";
    const data = { username, password };
    axios
      .post(url, data)
      .then((res) => {
        if (res.data.message && res.data.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userId", res.data.userId);
          localStorage.setItem("userName", res.data.username);
  
          toast('|           Sucessfully Login 🎉           |', {
            duration: 5000,
            position: 'top-center',
          
            // Styling
            style: {marginTop:"140px"},
            className: '',
          
            // Custom Icon
            icon: '👏',
          
            // Change colors of success/error/loading icon
            iconTheme: {
              primary: '#000',
              secondary: '#fff',
            },
          
            // Aria
            ariaProps: {
              role: 'status',
              'aria-live': 'polite',
            },
            onclose:{
              
            }
          });
          setWait(false)
        navigate("/")
        
        } else {
          toast('          Please Try again 🙇 , Check your details.!!           ', {
            duration: 10000,
            position: 'top-center',
          
            // Styling
            style: {marginTop:"140px",width:"300px"},
            className: '',
          
            // Custom Icon
            icon: '👏',
          
            // Change colors of success/error/loading icon
            iconTheme: {
              primary: '#000d',
              secondary: '#fff',
            },
          
            // Aria
            ariaProps: {
              role: 'status',
              'aria-live': 'polite',
            },
            onclose:{
              
            }
          });

        }
        setWait(false)

        // navigate("/")
      })
      .catch((err) => {
        toast('|         Try again later .🙇 Server error        |', {
          duration: 5000,
          position: 'top-center',
        
          // Styling
          style: {marginTop:"140px"},
          className: '',
        
          // Custom Icon
          icon: '👏',
        
          // Change colors of success/error/loading icon
          iconTheme: {
            primary: '#000',
            secondary: '#fff',
          },
        
          // Aria
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
          onclose:{
            
          }
        });
        console.log(err)
        setWait(false)

      });
  };
  

  return (
    <div className="box3">
      <div className="loginHeader">
        <LoginHeader />
      </div>

      <div className="loginform3">
        <img className="logo3" src="Images/Secure login-bro.png" />

        <h3 className="login-title3"> Welcome to Login Page </h3>
        <br></br>
        <form className="login-form3" onSubmit={handleApi}>
          Username*
          <br></br>
          <input
            className="userinput3"
            type="text"
            placeholder="your username"
            value={username}
            required
            title="Enter valid username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <br></br>
          <br></br>Password*<br></br>
          <input
            className="userinput3"
            type="password"
            placeholder="your password"
            value={password}
            required
            title="Enter valid password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br></br>
          <button className="login-btn3" type="submit">
            {" "}
           {wait? "PLEASE WAIT...":"LOGIN"} {" "}
          </button>
          <br></br>
          <p className="newuser3">
            New User ?{" "}
            <NavLink className="signup-link3" to="/signup">
              SignUp{" "}
            </NavLink>
          </p>
        </form>
      </div>
      <Toaster></Toaster>
    </div>
  );
}

export default Login;
