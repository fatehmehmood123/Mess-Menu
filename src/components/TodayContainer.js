import React from 'react'

export default function TodayContainer(props) {
  return (
    <>
      {/* returning component */}
      <div className="container my-4" id="mainContainer">

        <ol className="list-group list-group-numbered">
          <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Sehri(2:30 Onwards)</div>
              {props.breakfast}
            </div>

          </li>
          <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Iftari(Sunset)</div>
              {props.lunch}
            </div>

          </li>
          <li className="list-group-item d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto">
              <div className="fw-bold">Dinner(7:30-8:30)</div>
              {props.dinner}
            </div>
          </li>
        </ol>
      </div>
    </>
  )
}
