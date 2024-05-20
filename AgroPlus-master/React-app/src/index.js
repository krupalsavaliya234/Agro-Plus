import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import MarketPrice from './Components2/MarketPrice.js'
import Weather from './Components2/Weather.js'
import GovernmentPolicy from './Components2/GovernmentPolicy.js'
import Home from './Components3/Home.jsx';

import MainHome from "./Components/MainHome.js";
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
import { initReactI18next } from 'react-i18next';
import About_us from './About_us.js';
import ContactUs from './ContactUs.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainHome />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  
  {
    path: "/about-us",
    element: <About_us />,
  },
  {
    path: "/contact-us",
    element: <ContactUs />,
  },
  {
    path: "/maket-price",
    element: <MarketPrice />
  },
  {
    path: "/govenment-policies",
    element: <GovernmentPolicy />,
  },
  {
    path: "/category/:catName",
    element: <CategoryPage />,
  },
  {
    path: "about",
    element: <div>About</div>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/add-product",
    element: <AddProduct />,
  },
  {
    path: "/liked-products",
    element: <LikedProducts />,
  },
  {
    path: "/my-products",
    element: <MyProducts />,
  },
  {
    path: "/product/:productId",
    element: <ProductDetail />,
  },
  {
    path: "/my-profile",
    element: <MyProfile />,
  },
  {
    path: "/update-products/:id",
    element: <UpdateProduct />,
  },
  {
    path: "/sold-product",
    element: <SoldProduct />,
  },
  {
    path: "/Weather",
    element: <Weather />,
  },
  {
    path: "/groupchat",
    element: <Groupchat />,
  },


]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
)
