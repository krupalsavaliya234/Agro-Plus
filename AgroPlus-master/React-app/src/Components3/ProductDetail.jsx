import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import "./styles/productdetail.css";
import API_URL from "../constants";
import io from "socket.io-client";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

let socket;

function ProductDetail() {
  const [product, setProduct] = useState(null); // Initialize as null
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [user, setUser] = useState(null); // Initialize as null
  const [displayDetails, setDisplayDetails] = useState(false);
  const { productId } = useParams();

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
      try {
        const url = `${API_URL}/get-product/${productId}`;
        const response = await axios.get(url);
        const { product } = response.data;
        if (product) {
          setProduct(product);
          localStorage.setItem("productId", product._id);
          console.log("Product data:", product);
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

    if (!displayDetails) { // Ensure displayDetails is false before fetching user details
      try {
        const url = `${API_URL}/get-user/${addedBy}`;
        const res = await axios.get(url);
        const userData = res.data.user;
        if (userData) {
          setUser(userData);
          console.log("User data:", userData);
        }
      } catch (err) {
        alert("Server error occurred.");
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
      <Header />
      <div className="main1">
        <div className="part1">
          {product && (
            <div className="d-flex justify--nt-between flex-wrap m-5">
              <div className="container1">
                <h2>
                  {" "}
                  <img className="product-img" src="/images/file.png" /> Product
                  Details{" "}
                </h2>

                <Carousel
                  autoPlay={true}
                  animation="slide"
                  showStatus={false}
                  showThumbs={false}
                  interval={3000}
                  infiniteLoop={true}
                  stopOnHover={true}
                  navButtonsAlwaysVisible={true}
                  navButtonsProps={{
                    style: {
                      backgroundColor: "#fff",
                      color: "black",
                      borderRadius: 10,
                      marginTop: -22,
                      height: "104px",
                    },
                  }}>
                  {product.images.map((item, index) => (
                    <div key={index}>
                      <img
                        className="p-image"
                        width="400px"
                        height="auto"
                        src={`${API_URL}/${item}`}
                        alt={`Product Image ${index}`}
                      />
                    </div>
                  ))}
                </Carousel>
                <h3 className="m-2 mt-4 price-text">Rs. {product.price} /-</h3>
                <p className="name-container m-2 mt-4">
                  {product.pname} | <span className="cat">{product.category}</span>
                </p>
                <p className="product-desc m-2 mt-4">{product.pdesc}</p>
                {/* {
                  product.addedBy && (
                    <button
                      className="btn mt-4"
                      onClick={() => handleContact(product.addedBy)}
                    >
                      <div className="contact-btn">
                        <img className="contact-img" src="/images/contact-us.png" />
                        Contact Details
                      </div>
                    </button>
                  )
                }
                {displayDetails && user && ( // Render contact details if displayDetails is true and user data is available
                  <div className="contact-details1">
                    {user.username && <h6>{user.username}</h6>}
                    {user.mobile && <h6>{user.mobile}</h6>}
                    {user.email && <h6>{user.email}</h6>}
                  </div>
                )} */}
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
    </div>
  );
}

export default ProductDetail;
