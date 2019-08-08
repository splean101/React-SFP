import React from 'react';

export default (props) => {
    return (
        <table className='blue-border'>
            <tbody>
                <tr>
                    <td>
                        <label>
                            Name:
                                <input
                                type='text'
                                name='name'
                                value={props.name}
                                onChange={props.handleInputChange}
                            />
                        </label>
                    </td>
                    <td>
                        <label>
                            Job:
                                <input
                                type='text'
                                name='job'
                                value={props.job}
                                onChange={props.handleInputChange}
                            />
                        </label>
                    </td>
                </tr>
                <tr>
                    <td colSpan='2'>
                        <button className='width-button' onClick={props.handleButtonClick}>
                            {props.buttonText}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};