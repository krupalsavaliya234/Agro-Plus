import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast"; 
import "./market_price.css";
import { useNavigate } from "react-router-dom";

const MarketPrice = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [district, setDistrict] = useState("");
  const [row, setRow] = useState(true);
  const [wait, setWait] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      toast.error("Please login! 🙇", {
        style: {
          width: "300px",
        },
      });
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWait(true);
    try {
      const response = await axios.get(
        `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&filters%5Bstate%5D=Gujarat&filters%5Bdistrict%5D=${value}`
      );
      const data1 = response.data.records;
      setData(data1);
      setDate(data1[0]?.arrival_date || "");
      setDistrict(data1[0]?.market || "");
      setRow(false);
      setWait(false);
      toast.success("Market prices fetched successfully!", {
        position: "top-center",
        icon: "👏",
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setWait(false);
      toast.error("Failed to fetch market prices. Please try again.");
    }
  };

  return (
    <div className={row ? "marketprice-container" : "marketprice-container1"}>
      <Toaster />
      <div className="market">
        <form onSubmit={handleSubmit} className="market-price-form">
          <div className="market-div">
            <img className="market-img" src="Images/img5.png" alt="" />
            <div>
              <select onChange={handleChange} value={value}>
                <option value="" disabled>
                  Select a Market
                </option>
                {/* Your list of options */}
                {[
                  "Amreli", "Anand", "Bharuch", "Bhavnagar", "Dahod",
                  "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar",
                  "Morbi", "Narmada", "Navsari", "Patan", "Rajkot",
                  "Sabarkantha", "Surat", "Surendranagar", "Tapi",
                  "Vadodara", "Valsad"
                ].map((market, index) => (
                  <option key={index} value={market}>
                    {market}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <button className="marketprice-btn" disabled={wait} type="submit">
                {wait ? "Please Wait..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        <p className="table-p">{district}</p>
        <p className="table-p">{date}</p>
        <p className="table-p">{date && "20kg"}</p>
        {date && (
          <table className="market-table">
            <thead>
              <tr>
                <th>Commodity</th>
                <th>Min Price</th>
                <th>Max Price</th>
                <th>Modal Price</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.commodity}>
                  <td>{item.commodity}</td>
                  <td>{item.min_price / 5}</td>
                  <td>{item.max_price / 5}</td>
                  <td>{item.modal_price / 5}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MarketPrice;
