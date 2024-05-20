import { Link, NavLink, useNavigate } from "react-router-dom";
import "./styles/loginheader.css";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

function LoginHeader(props) {
  const [loc, setLoc] = useState("");

  const [showOver, setshowOver] = useState(false);
  // const [showOver, setshowOver] = useState(false)

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  let locations = [
    {
      latitude: 28.6139,
      longitude: 77.209,
      placeName: "New Delhi, Delhi",
    },
    {
      latitude: 19.076,
      longitude: 72.8777,
      placeName: "Mumbai, Maharashtra",
    },
  ];

  return (
    <div className="header-container">
      <div className="header">
        <Link className="links" to="/">
          {" "}
          <img src="/Images/logo.png" />
        </Link>
        <select
          className="login-select"
          value={loc}
          onChange={(e) => {
            localStorage.setItem("userLoc", e.target.value);
            setLoc(e.target.value);
          }}
        >
          {locations.map((item, index) => (
            <option key={index} value={`${item.latitude},${item.longitude}`}>
              {item.placeName}
            </option>
          ))}
        </select>
        {props.data?
          <div >
                <div className='user-container login-header-box'
                    onClick={() => {
                        setshowOver(!showOver)
                    }}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: '#008575',
                        width: '40px',
                        height: '40px',
                        color: '#fff',
                        fontSize: '14px',
                        borderRadius: '50%',
                        cursor:'pointer',
                       
                    }}> 
                    <img src="/images/man.png" className="login-header-image" style={{
                        height:'40px',
                        width:'40px',
                        float:"right"

                    }

                    }/>
                    </div>

                {showOver && <div style={{
                    minHeight: '100px',
                    width: '200px',
                    background: '#eee',
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    zIndex: 1,
                    marginTop: '50px',
                    marginRight: '50px',
                    color: 'red',
                    fontSize: '14px',
                    background: '#002f34',
                    borderRadius: '7px'
                }}>
                    <div>
                        {!!localStorage.getItem('token') &&
                            <Link to="/add-product">
                                <button className="logout-btn">ADD PRODUCT  </button>
                            </Link>}
                    </div>
                    <div>
                        {!!localStorage.getItem('token') &&
                            <Link to="/liked-products">
                                <button className="logout-btn"> FAVOURITES  </button>
                            </Link>}
                    </div>
                    <div>
                        {!!localStorage.getItem('token') &&
                            <Link to="/my-products">
                                <button className="logout-btn">MY PRODUCTS </button>
                            </Link>}
                    </div>
                    <div>
                        {!!localStorage.getItem('token') &&
                            <Link to="/sold-product">
                                <button className="logout-btn"> SOLD PRODUCTS </button>
                            </Link>}
                    </div>
                    <div>
                        {!localStorage.getItem('token') ?
                            <Link to="/login">  LOGIN </Link> :
                            <button className='logout-btn' onClick={handleLogout}> LOGOUT </button>}
                    </div>

                </div>}
            </div>:
        <div className="navlink-container">
          <NavLink className="loginbtn" to="/login">Login</NavLink>
          <NavLink className="signupbtn" to="/signup">
            SignUp{" "}
          </NavLink>
        </div>}
      </div>
    </div>
  );
}

export default LoginHeader;
