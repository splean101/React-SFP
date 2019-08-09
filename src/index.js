import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import App from './containers/App';
import reqResDataReducer from './reducers';
import {Provider} from 'react-redux';

const store = createStore(reqResDataReducer);
//console.log(store.getState());
//store.subscribe(() => console.log(store.getState()));

//BUILD
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,    
    document.getElementById("root")
);