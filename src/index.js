import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

const UserCard = (props) => {
    return (
        <table>
            <tbody>
                <tr>
                    <td rowSpan='2'>
                        <img src={props.avatar} alt='image not found' />
                    </td>
                    <td>{props.first_name}</td>
                    <td>{props.last_name}</td>
                </tr>
                <tr>
                    <td colSpan='2'>{props.email}</td>
                </tr>
            </tbody>
        </table>
    );
}
ReactDOM.render(<UserCard />, document.getElementById("root"));
