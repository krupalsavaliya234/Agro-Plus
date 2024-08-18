import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../constants";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
// import "./CSS/signUp.css"
import toast, { Toaster } from 'react-hot-toast'; 
import "./styles/signup.css";
import LoginHeader from "./LoginHeader";

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [wait,setWait]=useState(false);
 

  const getotp = async (e) => {
    e.preventDefault();
    const url = API_URL + "/signup";
    const data = { mobile };
    axios
      .post(url, data)
      .then((res) => {
        toast.success("otp sent");

        if (res.data.message) {
          // console.log(res.data)
        }
      })
      .catch((err) => {
        toast.error("SERVER ERR");
      });
  }
  const handleApi = (e) => {
    setWait(true);
    e.preventDefault();
    const url = API_URL + "/signup";
    const data = { username, password, mobile, email };
    axios
      .post(url, data)
      .then((res) => {
        
       setWait(false)
        if (res.status==201) {
          // console.log(res.data)
          toast('|            User Added Sucessfully            |', {
            duration: 10000,
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
          });
        }
        else if(res.status==202)
        {
          toast('  You are alraddy Exists. 🙇Please LOGIN.       ', {
            duration: 10000,
            position: 'top-center',
          
            // Styling
            style: {marginTop:"140px",width:"400px"},
            className: '',
          
            // Custom Icon
            icon: '',
          
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
          });
        }
        setTimeout(() => {
          
          navigate("/login")
        }, 10000);
      })

      .catch((err) => {
        console.log(err.message)
        toast('Please Try again later 🙇', {
          duration: 4000,
          position: 'top-center',
        
          // Styling
          style: {},
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
        });
      });
  };

  return (
    <div className="box2">
      <div className="loginHeader">
        <LoginHeader />
      </div>
     
        <form className="loginform2" onSubmit={handleApi}>
      
            <img
              className="logo2 mb-2"
              src="Images/Sign up-amico.png"
             
            ></img>
            <h3 className="login-title2"> Welcome to Signup Page </h3>
            Username
            <br></br>
            <input
              className="userinput2"
              type="text"
              required
              value={username}
              placeholder="your username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <br></br>
            <br></br>
            Mobile
            <br></br>
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
           
            <br></br>
            <br></br>
            Email
            <br></br>
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
            <br></br>
            <br></br>
            Password
            <br></br>
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
            <br></br>
            <br></br>
            
            
            <br></br>
            <button className="login-btn2" type="submit">
              {" "}
             {wait?"PLEASE WAIT..." :"SIGNUP" } {" "}
            </button>
            <p className="newuser2">
              New User ?{" "}
              <Link className="signup-link2" to="/login">
                {" "}
                Login{" "}
              </Link>
            </p>
        
        </form>
        <Toaster /> 
        {/* <ToastContainer /> */}
      </div>
    
  );
}

export default Signup;
