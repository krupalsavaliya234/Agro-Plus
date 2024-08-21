import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast"; // Import react-hot-toast
import "./market_price.css";

const MarketPrice = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [district, setDistrict] = useState("");
  const [row, setRow] = useState(true);
  const [wait,setWait]=useState(false);
  function handleChange(e) {
    console.log(`Option selected: ${e.target.value}`);
    setValue(e.target.value);
  }

  // Get Data from user through select and option
  const handleSubmit = async (e) => {
    e.preventDefault();
    setWait(true)
    try {

      const response = await axios.get(
        "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&filters%5Bstate%5D=Gujarat&filters%5Bdistrict%5D=" +
          value
      );
      console.log(response);
      const data1 = response.data.records;
      console.log(data1);
      setData(data1);
      setDate(data1[0].arrival_date);
      setDistrict(data1[0].market);
      setRow(false);
      setWait(false);
      toast('Market prices fetched successfully!', {
        duration: 4000,
        position: 'top-center',
      
        // Styling
        style: {},
        className: '',
      
        // Custom Icon
        icon: '👏',
      
        // Change colors of success/error/loading icon
        iconTheme: {
          primary: '#000',
          secondary: '#fff',
        },
      
        // Aria
        ariaProps: {
          role: 'status',
          'aria-live': 'polite',
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch market prices. Please try again."); // Error toast
    }
  };

  return (
    <div className={row ? "marketprice-container" : "marketprice-container1"}>
      <Toaster /> {/* Add Toaster component to render the toasts */}
      <div className="market">
        <form onSubmit={handleSubmit} className="market-price-form">
          <div className="market-div">
            <img className="market-img" src="Images/img5.png" alt="" />
            <div>
              <select onChange={handleChange} value={value}>
                <option value="" disabled>
                  Select a Market
                </option>
                <option value="Rajkot">Rajkot</option>
                <option value="Amreli">Amreli</option>
                <option value="Dahod">Dahod</option>
                <option value="Jamnagar">Jamnagar</option>
                <option value="Jetpur">Jetpur</option>
              </select>
            </div>
            <div>
              <button className="marketprice-btn"  disabled={wait} type="submit">
              {wait?"Please Wait...":"Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        <p className="table-p">{date ? district : ""}</p>
        <p className="table-p">{date}</p>
        <p className="table-p">{date ? "20kg" : ""}</p>
        {date ? (
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
        ) : null}
      </div>
    </div>
  );
};

export default MarketPrice;
