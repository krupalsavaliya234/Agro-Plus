require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
var jwt = require("jsonwebtoken");
const multer = require("multer");
const http = require("http");
const { Server } = require("socket.io");
const productController = require("./controllers/productController");
const userController = require("./controllers/userController");
const { addProduct, selled } = require("./controllers/selledProduct");
require("./database/conn");

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
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 4000;
const mongoose = require("mongoose");
// mongoose.connect('mongodb://localhost:27017');
app.get("/", (req, res) => {
  res.send("hello...");
});

app.get("/search", productController.search);
app.post("/like-product", userController.likeProducts);
// app.post('/dislike-product', userController.dislikeProducts)
app.post(
  "/add-product",
  upload.fields([
    { name: "pimage[1]" },
    { name: "pimage[2]" },
    { name: "pimage[3]" },
    { name: "pimage[4]" },
    { name: "pimage[5]" },
  ]),
  productController.addProduct
);
app.patch(
  "/edit-product/:id",
  upload.fields([
    { name: "pimage[1]" },
    { name: "pimage[2]" },
    { name: "pimage[3]" },
    { name: "pimage[4]" },
    { name: "pimage[5]" },
  ]),
  productController.editProduct
);
app.get("/get-products", productController.getProducts);
app.patch("/edit-image/:image/:id", productController.deleteImage);
// app.post('/delete-product', productController.deleteProduct)
app.get("/get-product/:pId", productController.getProductsById);
app.post("/liked-products", userController.likedProducts);
app.post("/my-products", productController.myProducts);
app.post("/signup", userController.signup);
app.get("/my-profile/:userId", userController.myProfileById);
app.get("/get-user/:uId", userController.getUserById);
app.post("/login", userController.login);
app.delete("/delete-product/:id", productController.deleteProduct);
app.get("/get-selled-products", selled);
app.get("/get-item/:catogary", productController.getItem);
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
let messages = [];

io.on("connection", (socket) => {
  console.log("Socket Connected", socket.id);

  socket.on("sendMsg", (data) => {
    messages.push(data);
    io.emit("getMsg", messages);
  });

  io.emit("getMsg", messages);
});

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
