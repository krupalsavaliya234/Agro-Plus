import React, { useEffect, useState } from "react";
import LoginHeader from "./LoginHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import categories from "./CategoriesList";
import API_URL from "../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/addproduct.css"
function AddProduct() {
    const navigate = useNavigate();
    const [pname, setPname] = useState('');
    const [pdesc, setPdesc] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [pimages, setPimages] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
            toast.error("Please Login", {
                position: "top-center"
            });
        }
    }, [navigate]);

    const handleApi = (e) => {
        e.preventDefault();
    
        navigator.geolocation.getCurrentPosition((position) => {
            const formData = new FormData();
            formData.append('plat', position.coords.latitude);
            formData.append('plong', position.coords.longitude);
            formData.append('pname', pname);
            formData.append('pdesc', pdesc);
            formData.append('price', price);
            formData.append('category', category);
            formData.append('userId', localStorage.getItem('userId'));
    
            // Upload each image to Cloudinary and get the URLs
            const imageUploadPromises = pimages.map((image, index) => {
                const data = new FormData();
                data.append("file", image);
                data.append("upload_preset", "kdfugyao");
    
                return fetch("https://api.cloudinary.com/v1_1/dmx0qh9f3/image/upload/", {
                    method: "post",
                    body: data,
                })
                .then(response => response.json())
                .then(data => {
                    if (data.secure_url) {
                        formData.append(`pimage[${index + 1}]`, data.secure_url);
                        console.log(data.secure_url);   
                    } else {
                        throw new Error('Image upload failed');
                    }
                })
                .catch((err) => {
                    console.error("Error uploading image:", err.message);
                    throw err; // Re-throw to handle it later
                });
            });
    
            // Wait for all images to be uploaded
            Promise.all(imageUploadPromises)
                .then(() => {
                    const url = API_URL + '/add-product';
                    return axios.post(url, formData);
                })
                .then((res) => {
                    console.log(res.data)
                    toast.success("Product Added Successfully! ", {
                        position: "top-center",
                        autoClose: 1000,
                        onClose: () => {
                            navigate('/');
                        }
                    });
                })
                .catch((err) => {
                    toast.error('Server Error');
                    console.error(err);
                });
        }, (error) => {
            toast.error('Geolocation error: ' + error.message);
        });
    };
    

    return (
        <div>
            <div className="addProduct-header">
                <LoginHeader data={"helo"} />
            </div>
            <div className="loginform23">
                <h2 > Add Product </h2>
                <form className="login-form23" onSubmit={handleApi}>
                    <label> Product name  <span className="add-span">*</span> </label>
                    <br></br>

                    <input className="userinput" type="text" required title="Enter valid name " value={pname}
                        onChange={(e) => { setPname(e.target.value) }} />
                    <br></br>

                    <label> Product description  <span className="add-span">*</span> </label>
                    <br></br>

                    <input className="userinput" type="text" required value={pdesc}
                        onChange={(e) => { setPdesc(e.target.value) }} />
                    <br></br>

                    <label> Product price  <span className="add-span">*</span> </label>
                    <br></br>

                    <input className="userinput" type="number" title="enter product price " required value={price}
                        onChange={(e) => { setPrice(e.target.value) }} />
                    <br></br>

                    <label> Product category  <span className="add-span">*</span> </label>
                    <br></br>
                    <select className="userinput" value={category} required
                        onChange={(e) => { setCategory(e.target.value) }}>

                        {categories && categories.length > 0 &&
                            categories.map((item, index) => {
                                return (
                                    <option key={'option' + index}> {item} </option>
                                )
                            })
                        }
                        <br></br>
                    </select>
                    <br></br>
                    <label> Product Image(s) </label>
                    <br></br>

                    <div className="file-input-container">
                        <input id="fileInput" className="userinput1" type="file" multiple required
                            onChange={(e) => {
                                const files = Array.from(e.target.files);
                                setPimages(files);
                            }} />
                        <label htmlFor="fileInput" className="custom-file-upload userinput">
                            <span>Choose file</span>
                        </label>
                    </div>


                    <br></br>

                    <button className="login-btn"> SUBMIT </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default AddProduct;
