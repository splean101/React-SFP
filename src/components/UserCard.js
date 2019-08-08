import React from 'react';

export default (props) => {
    return (
        <table className="card">
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
};