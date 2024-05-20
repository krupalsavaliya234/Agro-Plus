import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_URL from "../constants";
import CategoriesList from "./CategoriesList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import LoginHeader from "./LoginHeader";
import "./styles/updateproduct.css";
import Header from "./Header";

const UpdateProduct = () => {
  const [data, setData] = useState({
    product: {
      pname: "",
      pdesc: "",
      price: "",
      category: "",
      images: [],
    },
  });
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  const { id } = useParams();
  const [limit, setLimit] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [length1, setLength1] = useState();
  const [pimages, setPimages] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/get-product/${id}`);
      setData(res.data);
      setLength1(res.data.product.images.length);

      if (res.data.product.images.length < 6) {
        setLimit(true);
      } else {
        alert("You have already uploaded 5 images");
        setLimit(false);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      product: {
        ...prevData.product,
        [name]: value,
      },
    }));
  };

  const handleClick = async () => {
    const formData = new FormData();
    formData.append("pname", data.product.pname);
    formData.append("pdesc", data.product.pdesc);
    formData.append("price", data.product.price);
    formData.append("category", data.product.category);
    pimages.forEach((image, index) => {
      formData.append(`pimage[${index + 1}]`, image);
    });
    try {
      const res = await axios.patch(`${API_URL}/edit-product/${id}`, formData);
      toast.success("Item Updated successfully!", {
        position: "top-center",
      });
      if (res.data) {
        fetchData();
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;

    if (files.length <= 5 - length1) {
      setSelectedFiles(Array.from(files));
    } else {
      alert(`You can only select up to ${5 - length1} files.`);
      event.target.value = null;
    }

    const files1 = Array.from(event.target.files);
    setPimages(files1);
  };

  const handleDelete = async (id, index) => {
    try {
      const res = await axios.patch(`${API_URL}/edit-image/${index}/${id}`);
      toast.success("Image Deleted successfully!", {
        position: "top-center",
      });
      fetchData();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
   
        <div className="updateproduct-header">
           <Header />
        
        <div/>
    <div className="updateform">
      <h2>Update Product</h2>
      <form className="update-form" onSubmit={handleClick}>
        {data.product && (
          <>
            <br />
            <label>
              Product Name <span className="add-span">*</span>
            </label>
            <br />
            <input
              className="userinput"
              type="text"
              name="pname"
              value={data.product.pname}
              onChange={handleChange}
            />
            <br />
            <label>
              Product Description <span className="add-span">*</span>
            </label>
            <br />
            <input
              className="userinput"
              type="text"
              name="pdesc"
              value={data.product.pdesc}
              onChange={handleChange}
            />
            <br />
            <label>
              Product Price <span className="add-span">*</span>
            </label>
            <br />
            <input
              className="userinput"
              type="text"
              name="price"
              value={data.product.price}
              onChange={handleChange}
            />
            <br />
            <label>
              Product Category <span className="add-span">*</span>
            </label>
            <br />
            <select
              className="userinput"
              name="category"
              value={data.product.category}
              onChange={handleChange}
            >
              {CategoriesList.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <br />
            {limit && (
              <div>
                <label>
                  Product Image{" "}
                  <span className="add-span">
                    ** select only {5 - length1} images
                  </span>
                </label>
                <input
                  className="userinput file-input"
                  accept="image/*"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                />
              </div>
            )}
            <label>Uploaded Images</label>
            <br />

            <div className="image-container">
              {data.product.images.map((item, index) => (
                <div className="image-item" key={index}>
                  <div className="image-i">
                    <img
                      src={`http://localhost:4000/${item}`}
                      className="existion-image"
                      alt={`Image ${index}`}
                    />
                    <button
                      className="update-btn1"
                      onClick={() => handleDelete(id, index)}
                    >
                      Delete 
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <br />
            <ToastContainer />
            <button className="update-btn">SUBMIT</button>
          </>
        )}
      </form>
    </div>
    </div>
  );
};

export default UpdateProduct;
