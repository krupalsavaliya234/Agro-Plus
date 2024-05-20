import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import Header from "./Components3/Header";
// import "./styles/productdetail.css";
import API_URL from "../constants";
import io from "socket.io-client";
import "./groupchat.css";
let socket;

function Groupchat() {
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);
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
      const filteredData = data.filter((item) => {
        return item.productId === productId;
      });
      setMsgs(filteredData);
    });
  }, [productId]);

  const handleSend = () => {
    if (!socket) {
      console.error("Socket is not initialized.");
      return;
    }

    const data = {
      username: localStorage.getItem("userName"),
      msg,
      productId,
    };

    console.log("Sending message:", data);
    socket.emit("sendMsg", data);
    setMsg("");
  };

  return (
    <div className="groupchat-container">
      {/* <Header /> */}

      <div className="groupchat">
        <h4>Group Chat</h4>
        {msgs.map((item, index) => (
          <div
            key={index}
            style={{
              textAlign: item.username === localStorage.getItem("userName") ? "right" : "left",
              margin: "5px",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            {item.username !== localStorage.getItem("userName") && ( // Render username only for other users' messages
              <span style={{ fontWeight: "bold", color: "blue", marginRight: "5px" }}> {/* Change color as per your preference */}
                {item.username}:
              </span>
            )}
            <span style={{ color: item.username === localStorage.getItem("userName") ? "green" : "black" }}> {/* Change color as per your preference */}
              {item.msg}
            </span>
          </div>
        ))}



        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="chat-input mt-3 form-control"
          type="text"
          placeholder="Type your message..."
        />
        <br />
        <button onClick={handleSend} className="mt-3 group-btn">
          SEND
        </button>
      </div>

    </div>
  );
}

export default Groupchat;