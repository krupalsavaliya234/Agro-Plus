import React, { useState } from 'react';
import axios from 'axios';
import '../section3/section3.css';
import {
   createBrowserRouter,
   RouterProvider,
   Route,
   Link,
} from "react-router-dom";



function Section3() {
   const [result, setResult] = useState(null);

   const handlePlantDiseaseDetection = () => {

      window.open('http://127.0.0.1:5000');
   };
   const handlebot = () => {

      window.open('https://mediafiles.botpress.cloud/b95f0efe-db99-4214-b354-55b155f564f5/webchat/bot.html');
   };


   return (
      <div className='section3-main'>
         <div className='section3-hedding'>
            <p>Key Features</p>     
         </div>

         <div className='section3-group' >
            <div className='selection3-sub' onClick={handlePlantDiseaseDetection}><img className='section3-set' src='Images/o1.png' alt=''></img>
               <h2>Finding Plant Disease and Solutions</h2>
               <p>Incorporates advanced image recognition technology, enabling farmers to upload photos of diseased plants and crops.</p>
            </div>
            <div className='selection3-sub'>
               {
                  <Link to="/groupchat" className="link-container">
                     <img src='Images/Group.png' className="goverment-policies-img section3-set"></img>
                     <h2>Connect with Community</h2>
                     <p>Connecting with your community fosters mutual support, collaboration, and a sense of belonging, enriching both personal and collective experiences</p>
                  </Link>}
            </div>


            <div className='selection3-sub'>
               {
                  <Link to="/govenment-policies" className="link-container">
                     <img src='Images/Viewing-Government.png' className="goverment-policies-img section3-set"></img>
                     <h2>Government Policies and Benefits</h2>
                     <p>AgroPlus provides a dedicated section with up-to-date information on government agricultural policies, subsidies, and benefits.  </p>
                  </Link>}
            </div>

            <div className='selection3-sub'>
               {
                  <Link to="/Weather" className="link-container">
                     <img src='Images/Weather.png'></img>
                     <h2>Weather Integration</h2>
                     <p>Users can access current weather details, including temperature, rainfall, and forecasts, all within the app.</p>
                  </Link>}
            </div>

            <div className='selection3-sub'>
               {
                  <Link to="/maket-price" className="link-container">
                     <img className='section3-set' src='Images/market.png'></img>
                     <h2>APMC Market Price</h2>
                     <p>Show all apmc live market price, for useful to farmer know price of all crops of apmc.</p>
                  </Link>}
            </div>

            <div className='selection3-sub' onClick={handlebot}><img src='Images/robot.png' className="goverment-policies-img section3-set"></img>{ }
               <h2>Chatbot </h2>
               <p>Farmer-centric chatbot provides an intuitive and accessible platform, allowing farmers to instantly seek solutions to their queries.</p>
            </div>

         </div>
         {result && <div>{result}</div>}
      </div>
   );
}

export default Section3;
