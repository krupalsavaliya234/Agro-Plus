import React, { useEffect, useState, useCallback } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import API_URL from "../constants";
import categories from "./CategoriesList";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./styles/home.css";
import "./styles/header.css";
import { Toaster, toast } from "react-hot-toast";
import { DotLoader, BeatLoader } from "react-spinners";
import debounce from "lodash/debounce";
import {Helmet} from "react-helmet"

function Home() {
  const navigate = useNavigate();
  const [bit, setBit] = useState(false);
  const [liked, setLiked] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [readMoreId, setReadMoreId] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login! 🙇", {
        style: { width: "300px" },
      });
      setTimeout(() => navigate("/login"), 5000);
    } else {
      fetchProducts();
    }
  }, [navigate]);

  const fetchProducts = async () => {
    setLoader(true);
    try {
      const response = await axios.get(`${API_URL}/get-products`);
      if (response.data.products) {
      setLoader(false);

        setProducts(response.data.products);
      }
    } catch (error) {
      setLoader(false);

      toast.error("Server Error", { position: "top-center" });
    }
  };

  const handleSearch = useCallback(
    debounce(async () => {
      setBit(true);
      setIsSearchActive(true);
      try {
        const response = await axios.get(`${API_URL}/search?search=${search}`);
        setFilteredProducts(response.data.products);
      } catch (error) {
        toast.error("Server Error", { position: "top-center" });
      } finally {
        setBit(false);
      }
    }, 300),
    [search]
  );

  const handleCategoryClick = useCallback(
    (category) => {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
      setIsSearchActive(true);
    },
    [products]
  );

  const handleLike = async (productId, e) => {
    e.stopPropagation();
    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.warn("Please login first.", { position: "top-center" });
      return;
    }

    try {
      await axios.post(`${API_URL}/like-product`, { userId, productId });
      toast.success("Product Liked", { position: "top-center", autoClose: 1500 });
      setLiked(!liked);
    } catch (error) {
      toast.error("Error liking the product", { position: "top-center" });
    }
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const renderProductCard = (item) => {
    const truncatedDescription = item.pdesc.length > 50 ? `${item.pdesc.slice(0, 50)}...` : item.pdesc;
    const isReadMore = readMoreId === item._id;

    return (

      <div key={item._id} className="card2 m-4 position-relative">
   
<Helmet>
  <title>Home-AgroPlus</title>
  <meta name="description" content="Welcome to our homepage." />
</Helmet> 

        <div onClick={(e) => handleLike(item._id, e)} className="icon-con1">
          <FaHeart className="icons1" />
        </div>
        <Carousel autoPlay showStatus={false} showThumbs={false} interval={3000} infiniteLoop stopOnHover>
          {item.images.map((image, index) => (
            <div key={index} onClick={() => handleProductClick(item._id)}>
              <img width="300px" height="200px" className="useradded-img1" src={image} alt={item.pname} />
            </div>
          ))}
        </Carousel>
        <h4 className="m-2 price-text">Rs. {item.price}/-</h4>
        <p className="m-2">
          {item.pname} | <span className="cat1">{item.category}</span>
        </p>
        <p className="m-2">
          {isReadMore ? item.pdesc : truncatedDescription}
          {item.pdesc.length > 50 && (
            <span onClick={() => setReadMoreId(isReadMore ? null : item._id)} className="read-more-btn2">
              {isReadMore ? "Read Less" : "Read More"}
            </span>
          )}
        </p>
      </div>
    );
  };

  return (
    
    <div className="home-container1">
  
<Helmet>
  <title>Home-AgroPlus</title>
  <meta name="description" content="Welcome to our homepage." />
</Helmet>
      
      <div className="header01 home-container1">
        <Header search={search} handlesearch={(value) => setSearch(value)} handleClick={handleSearch} />
      </div>

      <div className="cat-container1">
        <span className="pr-3" onClick={fetchProducts}>
          All Categories
        </span>
        {categories.map((item, index) => (
          <span key={index} onClick={() => handleCategoryClick(item)} className="category1">
            {item}
          </span>
        ))}
      </div>

      <div className="home-class1">
        {isSearchActive && (
          <div>
            <h5 className="search-title1">
              Search Results
              <button className="clear-btn1" onClick={() => setIsSearchActive(false)}>
                CLEAR
              </button>
            </h5>
            <div className="d-flex m-4 justify-content-center flex-wrap">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => renderProductCard(item))
              ) : (
                <h5>No Results Found</h5>
              )}
            </div>
          </div>
        )}

        {!isSearchActive && (
          <div className="d-flex justify-content-center flex-wrap">
            {products.map((item) => renderProductCard(item))}
          </div>
        )}
        {loader && (
          <div className="spinner-container">
            <DotLoader color="#000" loading={loader} size={50} />
          </div>
        )}
        {bit && (
          <div className="spinner-container">
            <BeatLoader />
          </div>
        )}
        <Toaster />
      </div>
    </div>
  );
}

export default Home;
