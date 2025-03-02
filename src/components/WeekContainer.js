import React, { useEffect, useState } from "react";
import "../css/WeekContainer.css";
export default function WeekContainer(props) {
  const [isActive, setIsActive] = useState(false);
  function getWeekRange(date = new Date()) {
    // Clone the input date to avoid mutation
    const inputDate = new Date(date);
    
    // Calculate the Monday of the week
    const monday = new Date(inputDate);
    const day = inputDate.getDay(); // 0 (Sunday) to 6 (Saturday)
    const diffToMonday = day === 0 ? -6 : 1 - day; // Adjust to get Monday
    monday.setDate(inputDate.getDate() + diffToMonday);
    
    // Calculate the Sunday of the week (6 days after Monday)
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
  
    // Format dates (e.g., "February 24, 2025")
    const options = {  day: 'numeric',month: 'long'};
    const formattedMonday = monday.toLocaleDateString('en-UK', options);
    const formattedSunday = sunday.toLocaleDateString('en-UK', options);
  
    return `${formattedMonday} to ${formattedSunday}`;
  }
  useEffect(() => {
    // Simulate loading the data or triggering the animation
    setTimeout(() => {
      setIsActive(true);
    }, 100); // Adjust the delay as needed
  }, []);

  return (
   
        <div id="weekContainer" className="container  my-3">
          {<h2 style = {{"textAlign":"center"}}>رمضان المبارک  </h2>}
          <h3 style={{ textAlign: "center" }}>{getWeekRange()}</h3>

          <div
            className={`table-container ${
              isActive ? "active" : ""
            } overflow-x-scroll`}
          >
            <table  className=" container my-4 table table-hover shadow p-3 mb-5 bg-body-tertiary rounded">
              <tbody>
                <tr className="table-active">
                  <th>Day</th>
                  <th>Sehri (2:45 am onwards) </th>
                  <th>Iftar</th>
                  <th>Dinner (7:30 - 9:00) </th>
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
