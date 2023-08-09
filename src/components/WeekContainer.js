import React, { useEffect, useState } from "react";
import "../css/WeekContainer.css";
export default function WeekContainer(props) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Simulate loading the data or triggering the animation
    setTimeout(() => {
      setIsActive(true);
    }, 100); // Adjust the delay as needed
  }, []);

  return (
    <div id="weekContainer" className="container my-3">
      <h3>This Week Menu</h3>

      <div className={`table-container ${isActive ? "active" : ""}`}>
        <table className="container my-4 table table-hover shadow p-3 mb-5 bg-body-tertiary rounded">
          <tbody>
            <tr className="table-active">
              <th>Day</th>
              <th>Breakfast</th>
              <th>Lunch</th>
              <th>Dinner</th>
            </tr>
            <tr>
              <td>Monday</td>
              <td>{props.monBreakfast}</td>
              <td>{props.monLunch}</td>
              <td>{props.monDinner}</td>
            </tr>
            <tr>
              <td>Tuesday</td>
              <td>{props.tueBreakfast}</td>
              <td>{props.tueLunch}</td>
              <td>{props.tueDinner}</td>
            </tr>
            <tr>
              <td>Wednesday</td>
              <td>{props.wedBreakfast}</td>
              <td>{props.wedLunch} </td>
              <td>{props.wedDinner}</td>
            </tr>
            <tr>
              <td>Thursday</td>
              <td>{props.thursBreakfast}</td>
              <td>{props.thursLunch}</td>
              <td>{props.thursDinner}</td>
            </tr>
            <tr>
              <td>Friday</td>
              <td>{props.friBreakfast}</td>
              <td>{props.friLunch} </td>
              <td>{props.friDinner}</td>
            </tr>
            <tr>
              <td>Saturday</td>
              <td>{props.satBreakfast}</td>
              <td>{props.satLunch}</td>
              <td>{props.satDinner}</td>
            </tr>
            <tr>
              <td>Sunday</td>
              <td>{props.sunBreakfast}</td>
              <td>{props.sunLunch}</td>
              <td>{props.sunDinner}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
