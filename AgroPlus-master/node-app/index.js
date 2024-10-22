require("dotenv").config(); // Ensure dotenv is configured
const express = require("express");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const http = require("http");
const { Server } = require("socket.io");
const productController = require("./controllers/productController");
const userController = require("./controllers/userController");
const { addProduct, selled } = require("./controllers/selledProduct");
const mongoose = require("mongoose");
require("./database/conn"); // Ensure this connects to your MongoDB

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });
const bodyParser = require("body-parser");
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors({
  origin: ['https://agroplusweb.vercel.app', 'https://another-allowed-origin.com'],
  
}));
app.options('*', cors({
  origin: 'https://agroplusweb.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],  
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true 
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("hello...");
});

app.get("/search", productController.search);
app.post("/like-product", userController.likeProducts);
// app.post('/dislike-product', userController.dislikeProducts)
app.post(
  "/add-product",
  upload.any(),
  productController.addProduct
);

app.patch(
  "/edit-product/:id",
  upload.any(),
  productController.editProduct
);
app.get("/get-products", productController.getProducts);
app.patch("/edit-image/:image/:id", productController.deleteImage);
app.get("/get-product/:pId", productController.getProductsById);
app.post("/liked-products", userController.likedProducts);
app.post("/my-products", productController.myProducts);
app.post("/signup", userController.signup);
app.get("/my-profile/:userId", userController.myProfileById);
app.get("/get-user/:uId", userController.getUserById);
app.post("/login", userController.login);
app.delete("/delete-product/:id", productController.deleteProduct);
app.get("/get-selled-products", selled);
app.get("/get-item/:category", productController.getItem); // Fixed typo: `catogary` -> `category`
app.post(
  "/selled-product",
  upload.fields([
    { name: "pimage[1]" },
    { name: "pimage[2]" },
    { name: "pimage[3]" },
    { name: "pimage[4]" },
    { name: "pimage[5]" },
  ]),
  addProduct
);

// Socket.IO setup
let messages = [];

io.on("connection", (socket) => {
  console.log("Socket Connected", socket.id);

  socket.on("sendMsg", (data) => {
    messages.push(data);
    io.emit("getMsg", messages);
  });

  io.emit("getMsg", messages);
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
