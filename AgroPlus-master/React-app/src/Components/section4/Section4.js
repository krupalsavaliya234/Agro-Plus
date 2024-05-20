import React from 'react'
import "../section4/section4.css"
import {Link} from "react-router-dom"
import { FaArrowRight } from "react-icons/fa";
function Section4() {
  return (
    <div className='section4-main'>
        <div className='section4-part' id='section4-part1'>
            <h3>Read our story</h3>
            <p>Find out why thousands trust Agroplus to selling and buying product and other facility.</p>
            {/* <Link to={"/"}>About us </Link> */}
            <a href=''><div className='section4-about'><div>About us</div> <FaArrowRight className='arrows'/></div> </a>
        </div>

        <div className='section4-part' id='Section4-part2'>
          <h3>Help Center</h3>
          <p>Help topics, getting started guides and FAQs.</p>
          <a href='' className='section-a'>Visit help center</a>
        </div>
    </div>
  )
}

export default Section4