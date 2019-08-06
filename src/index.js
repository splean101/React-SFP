import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import { createStore } from 'redux';

const UserCard = (props) => {
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
const UserCardList = (props) => {
    return (
        <div className='blue-border'>
            {props.data.map(
                (user) => <UserCard key={user.id} {...user} />
            )}
        </div>
    )
};
const AddUpdateUserForm = (props) => {
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
}
const Navigation = (props) => {
    return (
        <ul>
            <li><NavLink exact to='/'>Get All</NavLink></li>
            <li><NavLink to='/create'>Create User</NavLink></li>
            <li><NavLink to='/update'>Update User</NavLink></li>
        </ul>
    );
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            name: '',
            job: ''
        };
        this.handleButtonClickAdd = this.handleButtonClickAdd.bind(this);
        this.handleButtonClickUpdate = this.handleButtonClickUpdate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    async componentDidMount() {
        const response = await fetch('https://reqres.in/api/users');
        const result = await response.json();
        this.setState({
            data: result.data
        })
    }
    async handleButtonClickAdd() {
        const response = await fetch(
            'https://reqres.in/api/users',
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    name: this.state.name,
                    job: this.state.job
                })
            });
        const result = await response.json();
        console.dir(result);
    }
    async handleButtonClickUpdate() {
        const response = await fetch(
            'https://reqres.in/api/users/3',
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify({
                    name: this.state.name,
                    job: this.state.job
                })
            });
        const result = await response.json();
        console.dir(result);
    }
    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }
    render() {
        return (
            <Router>
                <div>
                    <Navigation />
                    <Switch>
                        <Route path='/create' render={() =>
                            <AddUpdateUserForm
                                name={this.state.name}
                                job={this.state.job}
                                buttonText='ADD'
                                handleButtonClick={this.handleButtonClickAdd}
                                handleInputChange={this.handleInputChange}
                            />
                        }
                        />
                        <Route path='/update' render={() =>
                            <AddUpdateUserForm
                                name={this.state.name}
                                job={this.state.job}
                                buttonText='UPDATE'
                                handleButtonClick={this.handleButtonClickUpdate}
                                handleInputChange={this.handleInputChange}
                            />}
                        />
                        <Route render={() => <UserCardList data={this.state.data} />} />
                    </Switch>
                </div>
            </Router>
        )
    }
};
ReactDOM.render(<App />, document.getElementById("root"));

//...................................................................
const initialState = [];
const reqResDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEW_DATA':
            return action.data;
        default:
            return state;
    }
};
const store = createStore(reqResDataReducer);
store.subscribe(
    () => console.log(store.getState())
);
(async function () {
    const response = await fetch('https://reqres.in/api/users');
    const result = await response.json();
    store.dispatch({
        type: 'NEW_DATA',
        data: result.data
    })
})()