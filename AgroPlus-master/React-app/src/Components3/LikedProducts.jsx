import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import "./styles/likeproduct.css";
import API_URL from "../constants";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
function LikedProducts() {
  const navigate = useNavigate();

  const [products, setproducts] = useState([]);
  const [cproducts, setcproducts] = useState([]);
  const [search, setsearch] = useState("");
  const [readMoreId, setReadMoreId] = useState(null);

  useEffect(() => {
      if (!localStorage.getItem('token')) {
          navigate('/login')
      }
  }, [])

  useEffect(() => {
    const url = API_URL + "/liked-products";
    let data = { userId: localStorage.getItem("userId") };
    // console.log()
    axios
      .post(url, data)
      .then((res) => {
        if (res.data.products) {
          setproducts(res.data.products);
        }
      })
      .catch((err) => {
        alert("Server Err.");
      });
  }, []);

  const handlesearch = (value) => {
    setsearch(value);
  };

  const handleClick = () => {
    let filteredProducts = products.filter((item) => {
      if (
        item.pname.toLowerCase().includes(search.toLowerCase()) ||
        item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
      ) {
        return item;
      }
    });
    setcproducts(filteredProducts);
  };

  const handleCategory = (value) => {
    let filteredProducts = products.filter((item, index) => {
      if (item.category == value) {
        return item;
      }
    });
    setcproducts(filteredProducts);
  };

  const handleLike = (productId) => {
    let userId = localStorage.getItem("userId");

    const url = API_URL + "/like-product";
    const data = { userId, productId };
    axios
      .post(url, data)
      .then((res) => {
        if (res.data.message) {
          alert("Liked.");
        }
      })
      .catch((err) => {
        alert("Server Err.");
      });
  };

  const handleProduct = (id) => {
    // alert("clicked")
    navigate("/product/" + id);
  };

  return (
    <div className="likeproduct-header2">
      <div className="like-header2">
        <Header
          search={search}
          handlesearch={handlesearch}
          handleProduct={handleProduct}
        />
      </div>
      {/* <Categories handleCategory={handleCategory} /> */}
      <div className="liked-main2">
        {/* <h5> SEARCH RESULTS </h5> */}
        <div className="d-flex justify-content-center flex-wrap">
          {cproducts &&
            products.length > 0 &&
            cproducts.map((item, index) => {
              const truncatedDescription =
                item.pdesc.length > 50
                  ? `${item.pdesc.slice(0, 50)}...`
                  : item.pdesc;

              const isReadMore = readMoreId === item._id;
              return (
                <div key={item._id} className="card2 m-3 ">

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
                      <div key={imageIndex}>
                        <img
                          width="300px"
                          height="200px"
                          className="useradded-img2"
                          src={API_URL + "/" + image}
                          alt={item.pname}
                          onClick={() => handleProduct(item._id)}
                        />
                      </div>
                    ))}
                  </Carousel>
                  <p className="m-2">
                    {" "}
                    {item.pname} | {item.category}{" "}
                  </p>
                  <h3 className="m-2 text-danger"> {item.price} </h3>
                  <p className="m-2 text-success"> {item.pdesc} </p>
                </div>
              );
            })}
        </div>

        <h5 className="p-header2"> Liked Products </h5>

        <div className=" likeItem2 likeCart2">
          {products &&
            products.length > 0 &&
            products.map((item, index) => {
              const truncatedDescription =
                item.pdesc.length > 50
                  ? `${item.pdesc.slice(0, 50)}...`
                  : item.pdesc;

              const isReadMore = readMoreId === item._id;
              return (
                <div key={item._id} className="card2 m-4">
                 
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
                          className="useradded-img2"
                          src={API_URL + "/" + image}
                          alt={item.pname}
                        />
                      </div>
                    ))}
                  </Carousel>
                  {/* <img width="300px" height="200px" src={API_URL + '/' + item.images[0]} /> */}
                  <p className="m-2 ">
                    {" "}
                    {item.pname} | <span className="likeCatogary2"> {item.category}{" "}</span>
                  </p>
                  <h3 className="m-2 text-danger">Rs.{item.price} </h3>
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
      </div>
    </div>
  );
}

export default LikedProducts;
