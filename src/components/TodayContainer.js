import React, { useEffect, useState } from "react";
import "../css/todayContainer.css";

export default function TodayContainer({ meals, weekNumber, day }) {
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
    setTimeout(() => {
      setIsActive(true);
    }, 100);
  }, []);

  const mealLabels = { breakfast: 'Sehri', lunch: 'Iftari', dinner: 'Dinner' };

  const renderMealRow = (mealType, timing, mealData) => {
    if (!mealData || !Array.isArray(mealData.items)) {
      return null;
    }

    const itemNames = mealData.items.length ? mealData.items.join(', ') : 'No menu';
    const title = mealData.name && mealData.name.trim() ? mealData.name : null;

    return (
      <tr key={mealType}>
        <td>{timing}</td>
        <td>{mealLabels[mealType] || mealType}</td>
        <td>
          <div className="meal-info">
            {title && <div className="meal-title">{title}</div>}
            <div className="meal-items">{itemNames}</div>
          </div>
        </td>
      </tr>
    );
  };

  // Ramzan timings
  const timings = {
    breakfast: (
      <>02:45 AM<br />onward</>
    ),
    lunch: (
      <>Iftar<br />Time</>
    ),
    dinner: (
      <>7:30 PM -<br />9:00 PM</>
    )
  };

  return (
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
            {meals && meals.breakfast && renderMealRow('breakfast', timings.breakfast, meals.breakfast)}
            {meals && meals.lunch && renderMealRow('lunch', timings.lunch, meals.lunch)}
            {meals && meals.dinner && renderMealRow('dinner', timings.dinner, meals.dinner)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
