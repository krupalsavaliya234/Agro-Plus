import React, { useState } from "react";
import data from "./policies";
import "./policy.css";

const GovernmentPolicy = () => {
  const [expandedItems, setExpandedItems] = useState({});

  const handleReadMoreClick = (index) => {
    setExpandedItems((prevExpandedItems) => ({
      ...prevExpandedItems,
      [index]: !prevExpandedItems[index],
    }));
  };

  return (
    <div className="policy-container" >
      <div className="ministry">Ministry of Agriculture & Farmers Welfare</div>
      <img src="images/azadi.png" className="azadi" />
      <h2>Schemes for Welfare of Farmers</h2>
      <span className="posted">Posted On: 02 FEB 2024 6:48PM by PIB Delhi</span>
      <p>
        Details of schemes being run by Department of Agriculture and Farmers’
        Welfare for welfare/increasing incomes of farmers and the achievements
        made therein, scheme-wise are attached in Annexure:
      </p>
      <strong>
        <u>
          Brief of major schemes implemented by the Department of Agriculture
          and Farmers Welfare
        </u>
      </strong>
      <table
        align="center"
        border="1"
        bordercolor="#ccc"
        cellPadding="5"
        cellSpacing="0"
        className="table"
        style={{ borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <td className="table-header">Sr. No.</td>
            <td className="table-header">Name of Scheme</td>
            <td className="table-header">Description</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}.</td>
              <td className="name">{item.name}</td>
              <td className="description">
                {expandedItems[index] ? (
                  item.description
                ) : (
                  <div>
                    {item.description.length > 150
                      ? item.description.substring(0, 150)
                      : item.description}{" "}
                    {item.description.length > 150 && (
                      <span
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => handleReadMoreClick(index)}
                      >
                        Read More...
                      </span>
                    )}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GovernmentPolicy;
