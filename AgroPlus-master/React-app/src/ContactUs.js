import React from 'react';
import './contactus.css'; // Import your CSS file
import Navbar from './Components/navbar/Navbar'

const ContactUs = () => (<>
 
  <div className="contactus-wrapper">
    <form className="contactus-form">
      <div className="contactus-pageTitle contactus-title">Contact Us</div>
      <div className="contactus-secondaryTitle contactus-title">Please fill all the texts in the fields.</div>
      <input type="text" className="contactus-name contactus-formEntry" placeholder="Name" />
      <input type="text" className="contactus-email contactus-formEntry" placeholder="Email" />
      <textarea className="contactus-message contactus-formEntry" placeholder="Message"></textarea>
      <button className="contactus-submit contactus-formEntry">Submit</button>
    </form>
  </div></>
);

export default ContactUs;
