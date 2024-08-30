import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import "./styles/productdetail.css";
import API_URL from "../constants";
import io from "socket.io-client";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import DotLoader from "react-spinners/ClipLoader";
import { DotLoader, BeatLoader } from "react-spinners";
import {Helmet} from "react-helmet"

let socket;

function ProductDetail() {
  const [product, setProduct] = useState(null); // Initialize as null
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [user, setUser] = useState(null); // Initialize as null
  const [displayDetails, setDisplayDetails] = useState(false); // Default to false
  const { productId } = useParams();
   const [loader,setloader]=useState(false);
  useEffect(() => {
    socket = io(API_URL);

    socket.on("connect", () => {
      console.log("Connected to socket");
    });

    return () => {
      socket.disconnect();
      console.log("Disconnected from socket");
    };
  }, []);

  useEffect(() => {
    socket.on("getMsg", (data) => {
      const filteredData = data.filter((item) => item.productId === productId);
      setMsgs(filteredData);
    });
  }, [productId]);

  useEffect(() => {
    const fetchData = async () => {
      setloader(true)
      try {
        const url = `${API_URL}/get-product/${productId}`;
        const response = await axios.get(url);
        const { product } = response.data;
        if (product) {
          setloader(false);
          setProduct(product);

          localStorage.setItem("productId", product._id);
          // console.log("Product data:", product);
        }
      } catch (error) {
        alert("Server error occurred.");
      }
    };

    fetchData();
  }, [productId]);

  const handleContact = async (addedBy) => {
    // Toggle display of contact details
    setDisplayDetails(!displayDetails);

    if (!displayDetails) { // Fetch user details only if displayDetails is false
      try {
        // Construct the URL
        const url = `${API_URL}/get-user/${addedBy}`;
        console.log("Fetching user data from:", url);
    
        // Make the API request
        const res = await axios.get(url);
    
        // Extract user data from the response
        const userData = res.data.user;
        if (userData) {
          // Update the state with the user data
          setUser(userData);
          // console.log("User data retrieved successfully:", userData);
        }
      } catch (err) {
        // Log the error to the console and display an alert
        console.error("Error fetching user data:", err);
        alert("Server error occurred while fetching user data.");
      }
    }
  };

  const handleSend = () => {
    if (!socket) {
      console.error("Socket is not initialized.");
      return;
    }

    const data = {
      username: localStorage.getItem("userName"),
      msg,
      productId: localStorage.getItem("productId"),
    };

    console.log("Sending message:", data);
    socket.emit("sendMsg", data);
    setMsg("");
  };

  return (
    <div>
  
<Helmet>
  <title>Product Details</title>
  <meta name="description" content="View details of a specific product." />
</Helmet>

      <Header />
      <div className="main1">
        <div className="part1">
          {product && (
            <div className="d-flex justify-content-between flex-wrap m-5">
              <div className="container1">
                <h2>
                  <img className="product-img" src="/Images/file.png" alt="" /> 
                  Product Details
                </h2>

                <Carousel
                  autoPlay
                  showStatus={false}
                  showThumbs={false}
                  interval={3000}
                  infiniteLoop
                  stopOnHover
                  navButtonsAlwaysVisible
                  navButtonsProps={{
                    style: {
                      backgroundColor: "#fff",
                      color: "black",
                      borderRadius: 10,
                      marginTop: -22,
                      height: "104px",
                    },
                  }}
                >
                  {product.images.map((item, index) => (
                    <div key={index}>
                      <img
                        className="p-image"
                        width="400px"
                        height="auto"
                        src={item}
                        alt={` Image-${index}`}
                      />
                    </div>
                  ))}
                </Carousel>
                <h3 className="m-2 mt-4 price-text">Rs. {product.price} /-</h3>
                <p className="name-container m-2 mt-4">
                  {product.pname} | <span className="cat">{product.category}</span>
                </p>
                <p className="product-desc m-2 mt-4">{product.pdesc}</p>
                {product.addedBy && (
                  <button
                    className="btn mt-4"
                    onClick={() => handleContact(product.addedBy)}
                  >
                    <div className="contact-btn">
                      <img className="contact-img" src="/Images/contact-us.png" alt="" />
                      Contact Details
                    </div>
                  </button>
                )}
                {displayDetails && user && (
                  <div className="contact-details1">
                     {user.username && <h6> Owner name: {user.username}</h6>}
                    {user.mobile && <h6>Owner number: {user.mobile}</h6>}
                    {user.email && <h6> Owner email: {user.email}</h6>}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="part2">
          {product && (
            <div>
              <div className="chat">
                <h4 className="chat-header">Chat with Seller</h4>
                {msgs.map((item, index) => (
                  <p
                    key={index}
                    style={{
                      color: item.username === localStorage.getItem("userName") ? "#ffffff" : "#ffffff",
                      margin: "5px",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    {item.username} : {item.msg}
                  </p>
                ))}
                <input
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  className="chat-input mt-3 form-control"
                  type="text"
                  placeholder="Type your message..."
                />
                <br />
                <button onClick={handleSend} className="mt-3 btn1">
                  SEND
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {loader && <div className="spinner-container">
                  <DotLoader color="#000" loading={loader} size={50} />
                </div>}
    </div>
  );
}

export default ProductDetail;
