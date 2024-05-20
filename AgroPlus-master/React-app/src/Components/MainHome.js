import React from 'react'
import Navbar from './navbar/Navbar'
import Section from './section/Section'
import Section6 from './section6/Section6'
import Section3 from './section3/Section3'
import Section4 from './section4/Section4'
import Section5 from './section5/Section5'
import Footer from './footer/Footer'
import "./mainhome.css"

function MainHome() {
  return (
    <div>
      <div><Navbar /></div>
      <div><Section /></div>
      <div><Section6/></div>  
      <div><Section3 /></div> 
      {/* <div><Section5 /></div> */}
      {/* <div><Section4 /></div> */}
      <div><Footer /></div>
    </div>
  )
}

export default MainHome;