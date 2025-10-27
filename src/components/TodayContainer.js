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
  const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 6 = Saturday

  // Determine if it's weekend (Saturday or Sunday)
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  // Define timings based on weekday or weekend
  const timings = {
    breakfast: isWeekend ? (
      <>9:00 AM -<br />10:30 AM</>
    ) : (
      <>7:30 AM -<br />9:30 AM</>
    ),
    lunch: isWeekend ? (
      <>2:00 PM -<br />2:30 PM</>
    ) : (
      <>1:00 PM -<br />3:30 PM</>
    ),
    dinner: (
      <>7:30 PM -<br />9:30 PM</>
    )
  };

  useEffect(() => {
    // Simulate loading the data or triggering the animation
    setTimeout(() => {
      setIsActive(true);
    }, 100); // Adjust the delay as needed
  }, []);

  return (
    <>
      <div className="container my-4">
        <h3 style={{ textAlign: "center" }}>{currentFormattedDate}</h3>
        <div className={`table-container ${isActive ? "active" : ""}`}>
          <table
            className="container my-4 table table-hover shadow p-3 mb-5 bg-body-tertiary rounded"
            id="mainContainer"
          >
            <thead>
              <tr className="table-active">
                <th scope="col">Timings</th>
                <th scope="col">Meals</th>
                <th scope="col">Menu</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{timings.breakfast}</td>
                <td>Breakfast </td>
                <td>{props.breakfast}</td>
              </tr>
              <tr>
                <td>{timings.lunch}</td>
                <td>Lunch  </td>
                <td>{props.lunch}</td>
              </tr>
              <tr>
                <td>{timings.dinner}</td>
                <td>Dinner  </td>
                <td>{props.dinner}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
