import React from 'react';
import "../section5/section5.css";
import { Link } from 'react-router-dom';
import { FaLongArrowAltRight } from "react-icons/fa";

function Section5() {
  return (
    <div className='section5-main'>
      <h3>Some other advanced facility.</h3>
      <p>Find out with Agroplus</p>
      <a href='/'>
      <Link to="/Home" className="link-container"><div className='section5-icon1'>More Features</div><div className=''><FaLongArrowAltRight className='section5-icon' /></div> </Link> </a>
    </div>
  );
}

export default Section5;
