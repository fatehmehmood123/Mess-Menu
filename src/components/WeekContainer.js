import React, { useEffect, useState } from "react";
import "../css/WeekContainer.css";

export default function WeekContainer({ weeklyMenu, weekNumber }) {
  const [isActive, setIsActive] = useState(false);

  function getWeekRange(date = new Date()) {
    const inputDate = new Date(date);
    const monday = new Date(inputDate);
    const day = inputDate.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day;
    monday.setDate(inputDate.getDate() + diffToMonday);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const options = { day: 'numeric', month: 'long' };
    const formattedMonday = monday.toLocaleDateString('en-UK', options);
    const formattedSunday = sunday.toLocaleDateString('en-UK', options);

    return `${formattedMonday} to ${formattedSunday}`;
  }

  useEffect(() => {
    setTimeout(() => {
      setIsActive(true);
    }, 100);
  }, []);

  const renderMealCell = (mealData) => {
    if (!mealData || !Array.isArray(mealData.items)) {
      return <td>-</td>;
    }

    const itemNames = mealData.items.length ? mealData.items.join(', ') : 'No menu';
    const title = mealData.name && mealData.name.trim() ? mealData.name : null;

    return (
      <td>
        <div className="meal-cell">
          {title && <div className="meal-title-week">{title}</div>}
          <div className="meal-items-week">{itemNames}</div>
        </div>
      </td>
    );
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div id="weekContainer" className="container  my-3">
      <h3 style={{ textAlign: "center" }}>{getWeekRange()}</h3>

      <div
        className={`table-container ${isActive ? "active" : ""
          } overflow-x-scroll`}
      >
        <table className=" container my-4 table table-hover shadow p-3 mb-5 bg-body-tertiary rounded">
          <tbody>
            <tr className="table-active">
              <th>Day</th>
              <th>Sehri</th>
              <th>Iftari</th>
              <th>Dinner</th>
            </tr>
            {days.map((day, index) => (
              <tr key={day}>
                <td>{dayLabels[index]}</td>
                {renderMealCell(weeklyMenu?.[day]?.breakfast)}
                {renderMealCell(weeklyMenu?.[day]?.lunch)}
                {renderMealCell(weeklyMenu?.[day]?.dinner)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
