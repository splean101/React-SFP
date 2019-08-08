import React from 'react';
import { NavLink } from 'react-router-dom';

export default (props) => {
    return (
        <ul>
            <li><NavLink exact to='/'>Get All</NavLink></li>
            <li><NavLink to='/create'>Create User</NavLink></li>
            <li><NavLink to='/update'>Update User</NavLink></li>
        </ul>
    );
};