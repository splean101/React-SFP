import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

const First = () => (<div><h2>First component</h2></div>);
const Second = () => (<div><h2>Second component</h2></div>);
const Third = () => (<div><h2>Third component</h2></div>);

const Navigation = () => {
    return <Router>
        <div>
            <ul>
                <li> <NavLink to='/first'>first</NavLink></li>
                <li> <NavLink to='/second'>second</NavLink></li>
                <li> <NavLink to='/third'>third</NavLink></li>
            </ul>
            <Route exact path='/first' component={Second}></Route>
            <Route exact path='/second' component={Third}></Route>
            <Route exact path='/third' component={First}></Route>
        </div>
    </Router>
}

ReactDOM.render(<Navigation />, document.getElementById("div1"));
