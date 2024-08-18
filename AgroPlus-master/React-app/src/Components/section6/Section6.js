import React from 'react';
import "../section5/section5.css";
import { Link } from 'react-router-dom';
import { FaLongArrowAltRight } from "react-icons/fa";
import "./section6.css"
function Section6() {
    return (
        <div className="link1-container">
            
            <div className="buy-link1">
            <Link to="/home" > <img src="Images/Successful purchase-bro.png" alt="Sorry" width="200px" height="200px" /></Link>
                <div className="img-container">
                    <div className="div1">
                        <p className="sell">Buy Product</p>
                    </div>
                    <div className="div2">
                        <img src="Images/left-arrow.png" alt="" height="30px" width="30px" />
                    </div>
                </div>
            </div>
            <div className="buy-link1">
               <Link to="/add-product" > <img src="Images/Select-amico.png" alt="" width="200px" height="200px" /></Link>
                <div className="img-container">
                    <div className="div1">
                        <p className="sell">Sell Product</p>
                    </div>
                    <div className="div2">
                        <img src="Images/left-arrow.png" alt="" height="30px" width="30px" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Section6;
