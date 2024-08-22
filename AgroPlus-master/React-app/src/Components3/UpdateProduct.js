import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_URL from "../constants";
import CategoriesList from "./CategoriesList";
import { Toaster, toast } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import Header from "./Header";
import "./styles/updateproduct.css";

const UpdateProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    product: {
      pname: "",
      pdesc: "",
      price: "",
      category: "",
      images: [],
    },
  });
  const [limit, setLimit] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [length1, setLength1] = useState(0);
  const [pimages, setPimages] = useState([]);
  const [wait, setWait] = useState(false);

  // Fetch product data based on the product ID
  const fetchData = async () => {
    try {
      const res = await axios.get(`${API_URL}/get-product/${id}`);
      setData(res.data);
      setLength1(res.data.product.images.length);

      // Determine if more images can be uploaded
      setLimit(res.data.product.images.length < 5);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // Handle form input changes
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

  // Handle image deletion
  const handleDelete = async (id, index) => {
    try {
      await axios.patch(`${API_URL}/edit-image/${index}/${id}`);
      setWait(false);
      toast.success("Image deleted successfully!", { position: "top-center" });
      fetchData(); // Fetch updated product data
    } catch (error) {
      setWait(false);
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image.");
    }
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const files = event.target.files;

    // Ensure that no more than the remaining number of allowed files are selected
    if (files.length <= 5 - length1) {
      setSelectedFiles(Array.from(files));
      setPimages(Array.from(files));
    } else {
      alert(`You can only select up to ${5 - length1} files.`);
      event.target.value = null;
    }
  };

  // Handle form submission
  const handleClick = async (e) => {
    e.preventDefault();
    setWait(true);

    const formData = new FormData();
    formData.append("pname", data.product.pname);
    formData.append("pdesc", data.product.pdesc);
    formData.append("price", data.product.price);
    formData.append("category", data.product.category);

    // Upload selected images to Cloudinary
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
          } else {
            throw new Error("Image upload failed");
          }
        })
        .catch((err) => {
          console.error("Error uploading image:", err.message);
          throw err;
        });
    });

    // Wait for all images to be uploaded
    await Promise.all(imageUploadPromises)
      .then(async () => {
        try {
          await axios.patch(`${API_URL}/edit-product/${id}`, formData);
          setWait(false);
          toast.success("Item updated successfully! 🎉", {
            position: "top-center",
          });
          fetchData();
        } catch (error) {
          console.error("Error updating product:", error);
          toast.error("Failed to update product.");
        }
      })
      .catch((err) => {
        setWait(false);
        console.error("Server Error:", err);
        toast.error("Server Error");
      });
  };

  return (
    <div className="updateproduct-header">
      <Header />
      <div className="updateform">
        <h2>Update Product</h2>
        <form className="update-form" onSubmit={handleClick}>
          {data.product && (
            <>
              <label>
                Product Name <span className="add-span">*</span>
              </label>
              <input
                className="userinput"
                type="text"
                name="pname"
                value={data.product.pname}
                onChange={handleChange}
                required
              />

              <label>
                Product Description <span className="add-span">*</span>
              </label>
              <input
                className="userinput"
                type="text"
                name="pdesc"
                value={data.product.pdesc}
                onChange={handleChange}
                required
              />

              <label>
                Product Price <span className="add-span">*</span>
              </label>
              <input
                className="userinput"
                type="text"
                name="price"
                value={data.product.price}
                onChange={handleChange}
                required
              />

              <label>
                Product Category <span className="add-span">*</span>
              </label>
              <select
                className="userinput"
                name="category"
                value={data.product.category}
                onChange={handleChange}
                required
              >
                {CategoriesList.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {limit && (
                <>
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
                </>
              )}

              <button className="update-btn" type="submit" disabled={wait}>
                SUBMIT
              </button>
              {wait && (
                <div className="spinner-container">
                  <ClipLoader color="#000" loading={wait} size={50} />
                </div>
              )}

              <Toaster />
            </>
          )}
        </form>

        <label>Uploaded Images</label>
        <div className="image-container">
          {data.product.images.map((item, index) => (
            <div className="image-item" key={index}>
              <img
                src={item}
                className="existing-image"
                alt={`Image ${index + 1}`}
              />
              <button
                className="update-btn1"
                onClick={() => handleDelete(id, index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
