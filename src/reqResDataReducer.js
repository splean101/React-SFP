import * as types from './../constants/ActionTypes';


const initialState = {
    requestState: null, // 'START', 'ERROR'
    data: []
};
//const reqResDataReducer = 
export default (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case types.NEW_DATA:
            newState.requestState = null;
            newState.data = action.data;
            return newState;

        case types.DATA_REQUEST:
            newState.requestState = 'START';
            return newState;

        case types.DATA_ERROR:
            newState.requestState = 'ERROR';
            return newState;

        default:
            return state;
    }
};