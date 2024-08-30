import React from 'react';
import './contactus.css'; // Import your CSS file
import Navbar from './Components/navbar/Navbar';
import {Helmet} from "react-helmet"

const ContactUs = () => (
  <>
    <Navbar />
    
  <Helmet>
    <title>Contact Us</title>
    <meta name="description" content="Get in touch with us for any queries or support." />
  </Helmet>
 
    <div className="contactus-wrapper">
      <form className="contactus-form">
        <div className="contactus-pageTitle contactus-title">Contact Us</div>
        <div className="contactus-secondaryTitle contactus-title">Please fill all the fields.</div>
        <input type="text" className="contactus-name contactus-formEntry" placeholder="Name" />
        <input type="email" className="contactus-email contactus-formEntry" placeholder="Email" />
        <textarea className="contactus-message contactus-formEntry" placeholder="Message"></textarea>
        <button type="submit" className="contactus-submit contactus-formEntry">Submit</button>
      </form>
    </div>
  </>
);

export default ContactUs;
