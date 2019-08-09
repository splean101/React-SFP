import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import App from './containers/App';
import reqResDataReducer from './reducers';
import * as actionCreator from './actions';

const store = createStore(reqResDataReducer);
//console.log(store.getState());
//store.subscribe(() => console.log(store.getState()));

//BUILD
ReactDOM.render(
    <App
        store={store}
        load={actionCreator.load}
        handleButtonClickAdd={actionCreator.handleButtonClickAdd}
        handleButtonClickUpdate={actionCreator.handleButtonClickUpdate}
    />,
    document.getElementById("root")
);