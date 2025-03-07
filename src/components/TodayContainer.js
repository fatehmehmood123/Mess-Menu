import React, { useEffect, useState } from "react";
import "../css/todayContainer.css";
export default function TodayContainer(props) {
  const [isActive, setIsActive] = useState(false);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const currentDate = new Date();
  const currentFormattedDate = currentDate.toLocaleDateString('en-US', options);
  
  useEffect(() => {
    // Simulate loading the data or triggering the animation
    setTimeout(() => {
      setIsActive(true);
    }, 100); // Adjust the delay as needed
  }, []);

  return (
    <>
      <div className="container my-4">
      <h2 style={{ textAlign: "center" }}>
          رمضان المبارک <span>{currentDate.getDate() - 1}</span>
        </h2>
        <h3 style={{ textAlign: "center" }}>{currentFormattedDate}</h3>
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
                <td>Sehri (2:45 am onwards)</td>
                <td>{props.breakfast}</td>
              </tr>
              <tr>
                <td>Iftar</td>
                <td>{props.lunch}</td>
              </tr>
              <tr>
                <td>Dinner (7:30 - 9:00)</td>
                <td>{props.dinner}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
