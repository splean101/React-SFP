import * as types from './../constants/ActionTypes';

function DATA_REQUEST() {
    return {
        type: types.DATA_REQUEST
    };
};
function DATA_SUCCESS(data) {
    return {
        type: types.NEW_DATA,
        data: data
    };
};
function DATA_ERROR(err) {
    return {
        type: types.DATA_ERROR,
        error: err
    };
};
export const load = () => {
    return async (dispatch) => {
        dispatch(DATA_REQUEST());
        try {
            const response = await fetch('https://reqres.in/api/users');
            const result = await response.json();
            dispatch(DATA_SUCCESS(result.data));
        } catch (err) {
            dispatch(DATA_ERROR(err));
        }

    };
};
export const handleButtonClickAdd = async (name, job) => {
    const response = await fetch(
        'https://reqres.in/api/users',
        {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ name, job })
        });
    const result = await response.json();
    console.dir(result);
};
export const handleButtonClickUpdate = async (name, job) => {
    const response = await fetch(
        'https://reqres.in/api/users/3',
        {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({ name, job })
        });
    const result = await response.json();
    console.dir(result);
};
