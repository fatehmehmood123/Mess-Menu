import React from 'react'

export default function TodayContainer(props) {
  return (
    <>
      {/* returning component */}
      <div className="container my-4" id="mainContainer">
        <div>
          <h1 style={{ textAlign: "center", fontWeight: 800 }}>
            رمضان المبارک
          </h1>
        </div>
        <ol className="list-group list-group-numbered">
          <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div><b style={{ fontSize: "18px" }}>سحری</b> (2:45 Onwards)</div>
              {props.breakfast}
            </div>

          </li>
          <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div><b style={{ fontSize: "18px" }}>افطاری</b> (Sunset)</div>
              {props.lunch}
            </div>

          </li>
          <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div><b style={{ fontSize: "18px" }}>رات کا کھانا</b> (7:30 to 8:30)</div>
              {props.dinner}
            </div>
          </li>
        </ol>
      </div>
    </>
  )
}
