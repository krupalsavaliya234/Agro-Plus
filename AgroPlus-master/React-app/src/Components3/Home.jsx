import React, { useEffect, useState } from "react";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const navigate = useNavigate();
  const [liked1, setLiked] = useState(false);
  const [products, setProducts] = useState([]);
  const [cproducts, setCproducts] = useState([]);
  const [search, setSearch] = useState("");
  const [issearch, setIssearch] = useState(false);
  const [readMoreId, setReadMoreId] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const getProduct = () => {
    const url = API_URL + "/get-products";
    axios
      .get(url)
      .then((res) => {
        if (res.data.products) {
          setProducts(res.data.products);
        }
      })
      .catch((err) => {
        alert("Server Err.");
      });
  };

  const getItem = async (item) => {
    const res = await axios.get(`${API_URL}/get-item/${item}`);
    setProducts(res.data);
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleClick = () => {
    const url = API_URL + "/search?search=" + search;
    axios
      .get(url)
      .then((res) => {
        setCproducts(res.data.products);
        setIssearch(true);
      })
      .catch((err) => {
        alert("Server Err.");
      });
  };

  const handleCategory = (value) => {
    let filteredProducts = products.filter((item) => item.category === value);
    setCproducts(filteredProducts);
  };

  const handleLike = (productId, e) => {
    e.stopPropagation();
    let userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please Login first.");
      return;
    }

    const url = API_URL + "/like-product";
    const data = { userId, productId };
    axios
      .post(url, data)
      .then((res) => {
        if (res.data.message) {
          toast("Product Liked", {
            position: "top-center",
            autoClose: 1500,
          });
          setLiked(false);
        }
      })
      .catch((err) => {
        toast.error("Product Liked", {
          position: "top-center",
        });
        setLiked(true);
      });
  };

  const handleProduct = (id) => {
    navigate("/product/" + id);
  };

  return (
    <div className="home-container1">
      <div className="header01 home-container1">
        <Header
          search={search}
          handlesearch={handleSearch}
          handleClick={handleClick}
        />
      </div>

      <div className="cat-container1">
        <span className="pr-3" onClick={getProduct}>
          All Categories
        </span>
        {categories &&
          categories.length > 0 &&
          categories.map((item, index) => {
            return (
              <span
                onClick={() => getItem(item)}
                key={index}
                className="category1"
              >
                {" "}
                {item}{" "}
              </span>
            );
          })}
      </div>
      <div className="home-class1">
        {issearch && cproducts && (
          <h5 className="search-title1">
            Search Results
            <button className="clear-btn1" onClick={() => setIssearch(false)}>
              CLEAR
            </button>
          </h5>
        )}

        {issearch && cproducts && cproducts.length === 0 && (
          <h5>No Results Found</h5>
        )}
        {issearch && (
          <div className="d-flex m-4 justify-content-center flex-wrap">
            {cproducts &&
              products.length > 0 &&
              cproducts.map((item) => {
                const truncatedDescription =
                  item.pdesc.length > 50
                    ? `${item.pdesc.slice(0, 50)}...`
                    : item.pdesc;

                const isReadMore = readMoreId === item._id;

                return (
                  <div key={item._id} className="card2 m-4 position-relative">
                    <div
                      onClick={(e) => handleLike(item._id, e)}
                      className="icon-con1"
                    >
                      <FaHeart className="icons1" />
                    </div>
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
                          color: "#fff",
                          borderRadius: "50%",
                          width: "12px",
                          height: "12px",
                          padding: 0,
                          minWidth: 0,
                          margin: "0 5px",
                        },
                      }}
                      navButtonsWrapperProps={{
                        style: {
                          bottom: "10px",
                        },
                      }}
                    >
                      {item.images.map((image, imageIndex) => (
                        <div
                          key={imageIndex}
                          onClick={() => handleProduct(item._id)}
                        >
                          <img
                            width="300px"
                            height="200px"
                            className="useradded-img1"
                            src={API_URL + "/" + image}
                            alt={item.pname}
                          />
                        </div>
                      ))}
                    </Carousel>
                    <h4 className="m-2 price-text">Rs. {item.price}/-</h4>
                    <p className="m-2">
                      {item.pname} |{" "}
                      <span className="cat1">{item.category} </span>
                    </p>
                    <p className="m-2">
                      {isReadMore ? item.pdesc : truncatedDescription}{" "}
                      {item.pdesc.length > 50 && (
                        <p
                          onClick={() =>
                            setReadMoreId(isReadMore ? null : item._id)
                          }
                          className="read-more-btn2"
                        >
                          {isReadMore ? "Read Less" : "Read More"}
                        </p>
                      )}
                    </p>
                  </div>
                );
              })}
          </div>
        )}

        {!issearch && (
          <div className="d-flex justify-content-center flex-wrap">
            {products &&
              products.length > 0 &&
              products.map((item) => {
                const truncatedDescription =
                  item.pdesc.length > 50
                    ? `${item.pdesc.slice(0, 50)}...`
                    : item.pdesc;

                const isReadMore = readMoreId === item._id;

                return (
                  <div key={item._id} className="card2 m-4 position-relative">
                    <div
                      onClick={(e) => handleLike(item._id, e)}
                      className="icon-con1"
                    >
                      <FaHeart className="icons1" />
                    </div>
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
                          color: "#fff",
                          borderRadius: "50%",
                          width: "12px",
                          height: "12px",
                          padding: 0,
                          minWidth: 0,
                          margin: "0 5px",
                        },
                      }}
                      navButtonsWrapperProps={{
                        style: {
                          bottom: "10px",
                        },
                      }}
                    >
                      {item.images.map((image, imageIndex) => (
                        <div
                          key={imageIndex}
                          onClick={() => handleProduct(item._id)}
                        >
                          <img
                            width="300px"
                            height="200px"
                            className="useradded-img1"
                            src={API_URL + "/" + image}
                            alt={item.pname}
                          />
                        </div>
                      ))}
                    </Carousel>
                    <h4 className="m-2 price-text">Rs. {item.price}/-</h4>
                    <p className="m-2">
                      {item.pname} |{" "}
                      <span className="cat1">{item.category} </span>
                    </p>
                    <p className="m-2">
                      {isReadMore ? item.pdesc : truncatedDescription}{" "}
                      {item.pdesc.length > 50 && (
                        <p
                          onClick={() =>
                            setReadMoreId(isReadMore ? null : item._id)
                          }
                          className="read-more-btn2"
                        >
                          {isReadMore ? "Read Less" : "Read More"}
                        </p>
                      )}
                    </p>
                  </div>
                );
              })}
          </div>
        )}
        <ToastContainer />
      </div>
    </div>
  );
}

export default Home;
