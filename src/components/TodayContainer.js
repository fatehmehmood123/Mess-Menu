import React, { useEffect, useState } from "react";
import "../css/WeekContainer.css";
export default function TodayContainer(props) {
  const [isActive, setIsActive] = useState(false);
  
  
  useEffect(() => {
    // Simulate loading the data or triggering the animation
    setTimeout(() => {
      setIsActive(true);
    }, 100); // Adjust the delay as needed
  }, []);
  return (
    <>
      <div className="container my-4">
      {/* <h2 style = {{"textAlign":"center"}}>رمضان المبارک  </h2> */}
        <h3>Today Menu</h3>
        <div className={`table-container ${isActive ? "active" : ""}`}>
          <table
            className="container my-4 table table-hover shadow p-3 mb-5 bg-body-tertiary rounded"
            id="mainContainer"
          >
            <thead>
              <tr className="table-active">
                <th scope="col">Meals</th>
                <th scope="col">Menu</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Breakfast</td>
                <td>{props.breakfast}</td>
              </tr>
              <tr>
                <td>Lunch</td>
                <td>{props.lunch}</td>
              </tr>
              <tr>
                <td>Dinner</td>
                <td>{props.dinner}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
