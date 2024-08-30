import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DotLoader } from "react-spinners";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./styles/likeproduct.css";
import API_URL from "../constants";

function LikedProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [readMoreId, setReadMoreId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    setLoading(true);
    const url = `${API_URL}/liked-products`;
    const data = { userId: localStorage.getItem("userId") };

    axios.post(url, data)
      .then((res) => {
        if (res.data.products) {
          setProducts(res.data.products);
          setFilteredProducts(res.data.products);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        alert("Server Error.");
      });
  }, []);

  const handleSearch = (value) => {
    setSearch(value);
    const filtered = products.filter((item) =>
      item.pname.toLowerCase().includes(value.toLowerCase()) ||
      item.pdesc.toLowerCase().includes(value.toLowerCase()) ||
      item.category.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleCategory = (value) => {
    const filtered = products.filter((item) =>
      item.category === value
    );
    setFilteredProducts(filtered);
  };

  const handleLike = (productId) => {
    const userId = localStorage.getItem("userId");
    const url = `${API_URL}/like-product`;
    const data = { userId, productId };

    axios.post(url, data)
      .then((res) => {
        if (res.data.message) {
          alert("Liked.");
        }
      })
      .catch(() => {
        alert("Server Error.");
      });
  };

  const handleProduct = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="likeproduct-header2">
      <div className="like-header2">
        <Header
          search={search}
          handlesearch={handleSearch}
          handleProduct={handleProduct}
        />
      </div>
      <div className="liked-main2">
        <div className="d-flex justify-content-center flex-wrap">
          {loading ? (
            <div className="spinner-container">
            <DotLoader color="#000" loading={loader} size={50} />
          </div>  ) : (
            filteredProducts.map((item) => {
              const isReadMore = readMoreId === item._id;
              return (
                <div key={item._id} className="card2 m-3">
                  <Carousel
                    autoPlay
                    animation="slide"
                    showStatus={false}
                    showThumbs={false}
                    interval={3000}
                    infiniteLoop
                    stopOnHover
                  >
                    {item.images.map((image, index) => (
                      <div key={index}>
                        <img
                          width="300px"
                          height="200px"
                          className="useradded-img2"
                          src={image}
                          alt={item.pname}
                          onClick={() => handleProduct(item._id)}
                        />
                      </div>
                    ))}
                  </Carousel>
                  <p className="m-2">
                    {item.pname} | {item.category}
                  </p>
                  <h3 className="m-2 text-danger">Rs. {item.price}</h3>
                  <p className="m-2 text-success">
                    {isReadMore ? item.pdesc : `${item.pdesc.slice(0, 50)}...`}
                    {item.pdesc.length > 50 && (
                      <span
                        onClick={() => setReadMoreId(isReadMore ? null : item._id)}
                        className="read-more-btn2"
                      >
                        {isReadMore ? "Read Less" : "Read More"}
                      </span>
                    )}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default LikedProducts;
