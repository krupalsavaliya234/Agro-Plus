import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Components3/Home.jsx";
import Header from "./Components3/Header.jsx";
import MarketPrice from './Components2/MarketPrice.js';
import Weather from './Components2/Weather.js';
import GovernmentPolicy from './Components2/GovernmentPolicy.js';
import AboutUs from './About_us.js';
import ContactUs from './ContactUs.js';
import Login from "./Components3/Login.jsx";
import Signup from "./Components3/Signup.jsx";
import AddProduct from "./Components3/AddProduct.jsx";
import LikedProducts from "./Components3/LikedProducts.jsx";
import ProductDetail from "./Components3/ProductDetail.jsx";
import CategoryPage from "./Components3/CategoryPage.jsx";
import MyProducts from "./Components3/MyProducts.jsx";
import MyProfile from "./Components3/MyProfile.jsx";
import UpdateProduct from "./Components3/UpdateProduct.js";
import SoldProduct from "./Components3/SoldProduct.js";
import Groupchat from './Components2/Groupchat.js';

import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <Router>
      <SpeedInsights>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/market-price" element={<MarketPrice />} />
          <Route path="/government-policies" element={<GovernmentPolicy />} />
          <Route path="/category/:catName" element={<CategoryPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/liked-products" element={<LikedProducts />} />
          <Route path="/my-products" element={<MyProducts />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/update-products/:id" element={<UpdateProduct />} />
          <Route path="/sold-product" element={<SoldProduct />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/group-chat" element={<Groupchat />} />
        </Routes>
      </SpeedInsights>
    </Router>
  );
}

export default App;
