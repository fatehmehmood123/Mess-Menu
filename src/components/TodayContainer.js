import React from 'react'

export default function TodayContainer(props) {
  return (
    < >
      <div className="container my-4">
      <h3>Today Menu</h3>
      <table className="container my-4 table table-hover shadow-lg p-3 mb-5 bg-body-tertiary rounded" id="mainContainer">
        <thead >
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
        <tr >

          <td>Lunch</td>
          <td>{props.lunch}</td>

        </tr><tr>

          <td>Dinner</td>
          <td>{props.dinner}</td>

        </tr>

        </tbody>
      </table>
      </div>
      {/*/!* returning component *!/*/}
      {/*<div className="container my-4" id="mainContainer">*/}
        <div>
          {/* <h1 style={{ textAlign: "center", fontWeight: 800 }}>
            رمضان المبارک
          </h1> */}
        </div>
      {/*  <ol className="list-group list-group-numbered">*/}
      {/*    <li className="list-group-item d-flex justify-content-between align-items-start">*/}
      {/*      <div className="ms-2 me-auto">*/}
      {/*        <div><b style={{ fontSize: "18px" }}>Breakfast</b> </div>*/}
      {/*        {props.breakfast}*/}
      {/*      </div>*/}

      {/*    </li>*/}
      {/*    <li className="list-group-item d-flex justify-content-between align-items-start">*/}
      {/*      <div className="ms-2 me-auto">*/}
      {/*        <div><b style={{ fontSize: "18px" }}>Lunch</b></div>*/}
      {/*        {props.lunch}*/}
      {/*      </div>*/}

      {/*    </li>*/}
      {/*    <li className="list-group-item d-flex justify-content-between align-items-start">*/}
      {/*      <div className="ms-2 me-auto">*/}
      {/*        <div><b style={{ fontSize: "18px" }}>Dinner</b></div>*/}
      {/*        {props.dinner}*/}
      {/*      </div>*/}
      {/*    </li>*/}
      {/*  </ol>*/}
      {/*</div>*/}
    </>
  )
}
