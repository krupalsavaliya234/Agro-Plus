import React from 'react'
import "../footer/footer.css"
import { IoRemoveOutline } from "react-icons/io5";
function Footer() {
  return (
	
    <div className='footer-main'>
    <footer class="footer1">
  	 <div class="container">
  	 	<div class="row">
  	 		<div class="footer-col">
  	 			<h4>company</h4>
  	 			<ul>
  	 				<li><a href="#">about us</a></li>
  	 				<li><a href="#">our services</a></li>
  	 				<li><a href="#">privacy policy</a></li>
  	 				<li><a href="#">affiliate program</a></li>
  	 			</ul>
  	 		</div>
  	 		<div class="footer-col">
  	 			<h4>get help</h4>
  	 			<ul>
  	 				<li><a href="#">FAQ</a></li>
  	 				<li><a href="#">shipping</a></li>
  	 				<li><a href="#">returns</a></li>
  	 				<li><a href="#">order status</a></li>
  	 				<li><a href="#">payment options</a></li>
  	 			</ul>
  	 		</div>
  	
  	 		<div class="footer-col">
  	 			<h5>follow us</h5>
  	 			<div class="social-links ">
  	 				<a classname="Footer-Icon" href="#"><i className="fab fa-facebook-f m-2"></i></a>
  	 				<a classname="Footer-Icon"  href="#"><i className="fab fa-twitter m-2"></i></a>
  	 				<a classname="Footer-Icon"  href="#"><i className="fab fa-instagram m-2"></i></a>
  	 				<a classname="Footer-Icon"  href="#"><i className="fab fa-linkedin-in m-2"></i></a>
  	 			</div>
				
  	 		</div>
  	 	</div>
  	 </div>
  </footer>
    </div>
  )
}

export default Footer;