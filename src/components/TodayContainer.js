import React from 'react'

export default function TodayContainer(props) {
  return (
    <>
      {/* returning component */}
      <div className="container my-4" id="mainContainer">

        <ol className="list-group list-group-numbered">
          <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div><b>Sehri</b><i> (2:30 Onwards)</i></div>
              {props.breakfast}
            </div>

          </li>
          <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div><b>Iftari</b><i> (Sunset)</i></div>
              {props.lunch}
            </div>

          </li>
          <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div><b>Dinner</b><i> (7:30 - 8:30)</i></div>
              {props.dinner}
            </div>
          </li>
        </ol>
      </div>
    </>
  )
}
