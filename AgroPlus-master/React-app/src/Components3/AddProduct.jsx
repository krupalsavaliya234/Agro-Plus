import React, { useEffect, useState } from "react";
import LoginHeader from "./LoginHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import categories from "./CategoriesList";
import API_URL from "../constants";
// import { ToastContainer, toast } from "react-toastify";
import { Toaster,toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import "./styles/addproduct.css";

function AddProduct() {
    const navigate = useNavigate();
    const [pname, setPname] = useState('');
    const [pdesc, setPdesc] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [pimages, setPimages] = useState([]);
    const [wait, setWait] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
            toast.error("Please Login", {
                position: "top-center"
            });
        }
    }, [navigate]);

    const handleApi = (e) => {
        setWait(true);
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
                    } else {
                        throw new Error('Image upload failed');
                    }
                })
                .catch((err) => {
                    setWait(false)
                    throw err; // Re-throw to handle it later
                });
            });
    
            // Wait for all images to be uploaded
            Promise.all(imageUploadPromises)
                .then(() => {
                    const url = API_URL + '/add-product';
                    axios.post(url, formData)
                        .then((res) => {
                            setWait(false);
                            toast.success("Product Added Successfully! 🎉🎉 ", {
                                position: "top-center",
                                autoClose: 1000,
                            });
                            setTimeout(() => {
                                
                                navigate("/home") 
                            }, 1700);

                        })
                })
                .catch((err) => {
                    toast.error('Server Error');
                    console.error(err);
                    setWait(false); // Ensure wait state is reset on error
                });
        }, (error) => {
            toast.error('Geolocation error: ' + error.message);
            setWait(false); // Ensure wait state is reset on error
        });
    };

    return (
        <div>
            <div className="addProduct-header">
                <LoginHeader data={"hello"} />
            </div>
            <div className="loginform23">
                <h2>Add Product</h2>
                <form className="login-form23" onSubmit={handleApi}>
                    <label>Product name <span className="add-span">*</span></label>
                    <br />
                    <input className="userinput" type="text" required title="Enter valid name" value={pname}
                        onChange={(e) => { setPname(e.target.value) }} />
                    <br />
                    <label>Product description <span className="add-span">*</span></label>
                    <br />
                    <input className="userinput" type="text" required value={pdesc}
                        onChange={(e) => { setPdesc(e.target.value) }} />
                    <br />
                    <label>Product price <span className="add-span">*</span></label>
                    <br />
                    <input className="userinput" type="number" title="Enter product price" required value={price}
                        onChange={(e) => { setPrice(e.target.value) }} />
                    <br />
                    <label>Product category <span className="add-span">*</span></label>
                    <br />
                    <select className="userinput" value={category} required
                        onChange={(e) => { setCategory(e.target.value) }}>
                        {categories && categories.length > 0 &&
                            categories.map((item, index) => {
                                return (
                                    <option key={'option' + index}> {item} </option>
                                )
                            })
                        }
                        <br />
                    </select>
                    <br />
                    <label>Product Image(s)</label>
                    <br />
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
                    <br />
                    <button className="login-btn" disabled={wait}>
                        {wait ? "PLEASE WAIT..." : "SUBMIT"}
                    </button>
                </form>
                {wait && (
                    <div className="spinner-container">
                        <ClipLoader color="#000" loading={wait} size={50} />
                    </div>
                )}
            </div>
            <Toaster />
        </div>
    )
}

export default AddProduct;
