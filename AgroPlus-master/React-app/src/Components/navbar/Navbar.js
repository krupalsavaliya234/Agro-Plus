import React, { useState } from 'react';
import '../navbar/navbar.css';
import { IoListOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
function Navbar() {
    const [clicked, setClicked] = useState(false);

    const onClick = () => {
        setClicked(!clicked);
    };

    return (
        <div className='navbar9'>
            <div className='navbar9-logo'>
                <img className='navbar9-logo' src='Images/logo.png' alt="Logo" />

            </div>
            <div className={clicked ? 'navbar-cat clicked9' : 'navbar-cat9'}>
                <ul className="l1">
                    <li className='navbarli'><a className="navigation-link" href="#">Home</a></li>
                    <li className='navbarli'><a className="navigation-link" href="/contact-us">Contact us</a></li>
                   
                    <li className='navbarli'><a className="navigation-link" href="/About-us">About Us</a></li>

                </ul>
            </div>
            <Link to="/login" className="link-container">
                <div className='navbar-signin'><div >Get Started </div>
                </div></Link>
        </div>
    );
}

export default Navbar;
