import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import "./styles/myproduct.css";
import API_URL from "../constants";

import { toast, Toaster } from "react-hot-toast";
// import "react-hot-toast/dist/index.css";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { DotLoader, BeatLoader } from "react-spinners";


const MyProducts = () => {
  const navigate = useNavigate();
  const [readMoreId, setReadMoreId] = useState(null);
  const [liked1, setLiked] = useState(false);
  const [products, setProducts] = useState([]);
  const [categorizedProducts, setCategorizedProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const toastOptions = {
    position: "top-center",
    duration: 2000,
    style: {
      marginTop:"150px",
      width: "500px",
    },
  };
  const fetchData = async () => {
    try {
      setLoading(true); // Start loading
      const url = API_URL + "/my-products";
      const data = { userId: localStorage.getItem("userId") };
      const response = await axios.post(url, data);
      if (response.data.products) {
        setProducts(response.data.products);
        setLoading(false); // End loading
      }
    } catch (error) {
      setLoading(false); // End loading
      toast.error("Server Error.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (value) => {
    setSearch(value);
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
    const filteredProducts = products.filter((item) => item.category === value);
    setCategorizedProducts(filteredProducts);
  };

  const handleLike = async (productId) => {
    const userId = localStorage.getItem("userId");

    try {
      const url = API_URL + "/like-product";
      const data = { userId, productId };
      const response = await axios.post(url, data);
      if (response.data.message) {
        toast.success("Image liked successfully!", {
          position: "top-center",
          ...toastOptions
        });

      }
    } catch (error) {
      toast.error("Server Error.");
    }
  };

  const handleProduct = (id) => {
    navigate("/product/" + id);
  };

  const modifyProduct = (id) => {
    navigate("/update-products/" + id);
  };

  const removeProduct = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/delete-product/${id}`);
      const new1 = await axios.post(
        `${API_URL}/selled-product`,
        res.data.product
      );

      toast.success("Product deleted sucessfully! 🎉", {
       ...toastOptions,
      
      });
      setTimeout(() => {
        // fetchData()
        navigate("/home");
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("Product not found!", {
          ...toastOptions
        });
      } else {
        toast.error("Error deleting product!", {
          ...toastOptions
        });
      }
    }
  };

  return (
    <div className="myproduct-container3">
      <div className="category-header3">
        <Header
          search={search}
          handleSearch={handleSearch}
          handleClick={handleClick}
        />
      </div>
      {/* <Categories handleCategory={handleCategory} /> */}

      {loading ? ( // Show spinner while loading
        <div className="spinner-container">
          <DotLoader color="#000" loading={loading} size={50} />
        </div>
      ) : (
        <div className="liked-main3">
          <div className="d-flex justify-content-center flex-wrap ">
            {categorizedProducts.length > 0 &&
              categorizedProducts.map((item) => (
                <div key={item._id}>
                  <img
                    width="300px"
                    height="200px"
                    src={item.pimage1}
                    alt={item.pname}
                  />
                  <p className="m-2">
                    {item.pname} | {item.category}
                  </p>
                  <h3 className="m-2 text-danger">{item.price}</h3>
                  <p className="m-2 text-success">{item.pdesc}</p>
                  <button onClick={() => removeProduct(item._id)}>Delete</button>
                </div>
              ))}
          </div>

          <h5 className="my-product-title3"> My Products </h5>

          <div className="d-flex justify-content-center flex-wrap mb-5">
            {products.length > 0 &&
              products.map((item) => {
                const truncatedDescription =
                  item.pdesc.length > 50
                    ? `${item.pdesc.slice(0, 50)}...`
                    : item.pdesc;

                const isReadMore = readMoreId === item._id;
                return (
                  <div key={item._id} className="card3 m-3 position-relative">
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
                        <div
                          key={imageIndex}
                          onClick={() => handleProduct(item._id)}
                        >
                          <img
                            width="300px"
                            height="200px"
                            padding="0px"
                            className="useradded-img3"
                            src={image}
                            alt={item.pname}
                          />
                        </div>
                      ))}
                    </Carousel>
                    <h4 className="m-2 price-text"> Rs. {item.price}/- </h4>
                    <p className="m-2">
                      {item.pname} | <span className="cat3">{item.category}</span>
                    </p>
                    <p className="m-2">
                      {isReadMore ? item.pdesc : truncatedDescription}{" "}
                      {item.pdesc.length > 50 && (
                        <p
                          onClick={() =>
                            setReadMoreId(isReadMore ? null : item._id)
                          }
                          className="read-more-btn3"
                        >
                          {isReadMore ? "Read Less" : "Read More"}
                        </p>
                      )}
                    </p>

                    <div className="myPrductButton3">
                      <button
                        className="myproductButton3"
                        onClick={() => removeProduct(item._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="myproductButton31"
                        onClick={() => modifyProduct(item._id)}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      <Toaster></Toaster>
    </div>
  );
};

export default MyProducts;
