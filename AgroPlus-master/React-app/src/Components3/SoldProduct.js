import React, { useState, useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
// import "./CSS/mainStyle.css";
import { FaHeart } from "react-icons/fa";
import API_URL from "../constants";
import categories from "./CategoriesList";
import { Carousel } from "react-responsive-carousel";
import "./styles/soldproduct.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const SoldProduct = () => {
  const navigate = useNavigate();
  const [liked1, setLiked] = useState(false);
  const [readMoreId, setReadMoreId] = useState(null);

  const [products, setProducts] = useState([]);
  const [categorizedProducts, setCategorizedProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/get-selled-products`);
        if (response.data) {
          setProducts(response.data.products);
        }
      } catch (error) {
        alert("Server Err.");
      }
    };
    fetchData();
  }, []);

  const handleSearch = (value) => {
    setSearch(value);
    // handleClick();    
    console.log(value)
  };

  const handleClick = () => {
    const filteredProducts = products.filter(
      (item) =>
        item.pname.toLowerCase().includes(search.toLowerCase()) ||
        item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
    );
    setCategorizedProducts(filteredProducts);
  };

  const handleCategory = (value) => {
    console.log("value")
    const filteredProducts = products.filter((item) => item.category === value);
    setCategorizedProducts(filteredProducts);
  };

  const handleProduct = (id) => {
    navigate("/product/" + id);
  };
  const getItem = async (item) => {
    const res = await axios.get(`${API_URL}/get-solditem/${item}`);
    setCategorizedProducts(res.data);
  };


  return (
    <div>
      <div className="sold-header">
        <Header />
        item={"false"}
        search={search}
        handleSearch={handleSearch}
        handleClick={handleClick}
      </div>


      <div className="sold-main">
        <div className="d-flex justify-content-center flex-wrap ">
          {categorizedProducts.length > 0 &&
            categorizedProducts.map((item) => (
              <div key={item._id} className="card m-3">
                <img
                  width="300px"
                  height="200px"
                  src={API_URL + "/" + item.pimage1}
                  alt={item.pname}
                />
                <p className="m-2">
                  {item.pname} | {item.category}
                </p>
                <h3 className="m-2 text-danger">{item.price}</h3>
                <p className="m-2 text-success">{item.pdesc}</p>
              </div>
            ))}
        </div>

        <h5>ALL RESULTS</h5>

        <div className="d-flex justify-content-center flex-wrap">
          {products &&
            products.length > 0 &&
            products.map((item, index) => {
              const truncatedDescription =
                item.pdesc.length > 50 ? `${item.pdesc.slice(0, 50)}...` : item.pdesc;
              const isReadMore = readMoreId === item._id;

              return (
                <div key={item._id} className="card mt-6 m-5 position-relative">
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
                        color: "#494949",
                        borderRadius: 0,
                        marginTop: -22,
                        height: "104px",
                      },
                    }}
                  >
                    {item.images.map((image, imageIndex) => (
                      <div key={imageIndex} onClick={() => handleProduct(item._id)}>
                        <img
                          width="300px"
                          height="200px"
                          className="useradded-img"
                          src={API_URL + "/" + image}
                          alt={item.pname}
                        />
                      </div>
                    ))}
                  </Carousel>
                  <h4 className="m-2 price-text"> Rs. {item.price}/- </h4>
                  <p className="m-2">
                    {item.pname} | <span className="cat">{item.category} </span>
                  </p>
                  <p className="m-2">
                    {isReadMore ? item.pdesc : truncatedDescription}{" "}
                    {item.pdesc.length > 50 && (
                      <button
                        onClick={() => setReadMoreId(isReadMore ? null : item._id)}
                        className="read-more-btn"
                      >
                        {isReadMore ? "Read Less" : "Read More"}
                      </button>
                    )}
                  </p>
                </div>
              );
            })}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SoldProduct;
