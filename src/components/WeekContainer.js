import React from 'react'
import '../WeekContainer.css'
export default function WeekContainer(props) {
    return (
        <div id="weekContainer" className="container my-3">
            <h3>This Week Menu</h3>
            <table>
                <tbody>
                    <tr>
                        <th>Day</th>
                        <th>Sehri</th>
                        <th>Aftari</th>
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
            {/* <table>
                <tbody>
                    <tr>
                        <th>Day</th>
                        <th>Breakfast</th>
                        <th>Lunch</th>
                        <th>Dinner</th>
                    </tr>
                    <tr>
                        <td>Monday</td>
                        <td>Paratha + Fried Egg</td>
                        <td>Aluu Gajar Matar</td>
                        <td>{props.monDinner}</td>
                    </tr>
                    <tr>
                        <td>Tuesday</td>
                        <td>Naan Channay</td>
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
                        <td>Bread Butter Jam</td>
                        <td>Aluu Palak</td>
                        <td>Biryani</td>
                    </tr>
                    <tr>
                        <td>Friday</td>
                        <td>Paratha + Egg Tomato Onion</td>
                        <td>{props.friLunch} </td>
                        <td>{props.friDinner}</td>
                    </tr>
                    <tr>
                        <td>Saturday</td>
                        <td>Aluu Paratha</td>
                        <td>{props.satLunch}</td>
                        <td>{props.satDinner}</td>
                    </tr>
                    <tr>
                        <td>Sunday</td>
                        <td>Halwa Poori + Channay</td>
                        <td>Red Beans</td>
                        <td>{props.sunDinner}</td>
                    </tr>
                </tbody>
            </table> */}
        </div>

    )
}
