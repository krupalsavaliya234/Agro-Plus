import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_URL from "../constants";
import CategoriesList from "./CategoriesList";
// import { ToastContainer, toast } from "react-toastify";
import { Toaster, toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
// import Slider from "react-slick";
import LoginHeader from "./LoginHeader";
import "./styles/updateproduct.css";
import Header from "./Header";
import ClipLoader from "react-spinners/ClipLoader";

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
  const [wait, setwait] = useState(false);


  
  const handleDelete = async (id, index) => {
    try {
      const res = await axios.patch(`${API_URL}/edit-image/${index}/${id}`);
      setwait(false);
      toast.success("Image Deleted successfully!", {
        position: "top-center",
      });
      setTimeout(() => {
        fetchData();
      }, 2000);
    } catch (error) {
      setwait(false);
      console.error("Error updating product:", error);
    }
  };

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

  const handleClick = async (e) => {
    e.preventDefault();
    setwait(true);
    const formData = new FormData();
    formData.append("pname", data.product.pname);
    formData.append("pdesc", data.product.pdesc);
    formData.append("price", data.product.price);
    formData.append("category", data.product.category);
    const imageUploadPromises = pimages.map((image, index) => {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "kdfugyao");

      return fetch("https://api.cloudinary.com/v1_1/dmx0qh9f3/image/upload/", {
        method: "post",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.secure_url) {
            formData.append(`pimage[${index + 1}]`, data.secure_url);
            console.log(data.secure_url);
          } else {
            throw new Error("Image upload failed");
          }
        })
        .catch((err) => {
          console.error("Error uploading image:", err.message);
          throw err; // Re-throw to handle it later
        });
    });
    await Promise.all(imageUploadPromises)

      .then(() => {
        try {
          const res = axios.patch(`${API_URL}/edit-product/${id}`, formData);
          setwait(false);
          toast.success("Item Updated successfully! 🎉🎉", {
            position: "top-center",
          });
          setTimeout(() => {
            fetchData();
          }, 2000);
          if (res.data) {
          }
        } catch (error) {
          console.error("Error updating product:", error);
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.error(err);
      });
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


  return (
    <div className="updateproduct-header">
      <Header />

      <div />
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
              
              <br />
              <Toaster />
              <button className="update-btn" disabled={wait}>
                SUBMIT
              </button>
              {wait && (
                <div className="spinner-container">
                  <ClipLoader color="#000" loading={wait} size={50} />
                </div>
              )}
            </>
          )}
        </form>
        <label>Uploaded Images</label>
              <br />

              <div className="image-container">
                {data.product.images.map((item, index) => (
                  <div className="image-item" key={index}>
                    <div className="image-i">
                      <img
                        src={item}
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
      </div>
    </div>
  );
};

export default UpdateProduct;
