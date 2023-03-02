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
                        <th>Breakfast</th>
                        <th>Lunch</th>
                        <th>Dinner</th>
                    </tr>
                    <tr>
                        <td>Monday</td>
                        <td>Paratha Omelette</td>
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
                        <td>Paratha Omelette</td>
                        <td>{props.wedLunch} </td>
                        <td>{props.wedDinner}</td>
                    </tr>
                    <tr>
                        <td>Thursday</td>
                        <td>Bread + Butter + Jam</td>
                        <td>Aluu Palak</td>
                        <td>Biryani</td>
                    </tr>
                    <tr>
                        <td>Friday</td>
                        <td>Egg + Tomato + Onion</td>
                        <td>{props.friLunch} </td>
                        <td>{props.friDinner}</td>
                    </tr>
                    <tr>
                        <td>Saturday</td>
                        <td>Aluu Paratha</td>
                        <td>Aluu Gobi</td>
                        <td>{props.satDinner}</td>
                    </tr>
                    <tr>
                        <td>Sunday</td>
                        <td>Halwa Poori</td>
                        <td>Red Beans</td>
                        <td>{props.sunDinner}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}
