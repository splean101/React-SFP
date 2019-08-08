import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import { createStore } from 'redux';

//VIEV, REACT

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
            name: '',
            job: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.storeUpdate = this.storeUpdate.bind(this);
    }
    async componentDidMount() {
        this.unSubscribe = this.props.store.subscribe(this.storeUpdate);

        this.props.load()(this.props.store.dispatch);
    }
    componentWillUnmount() {
        this.unSubscribe();
    }
    storeUpdate() {
        this.setState({});
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
                                handleButtonClick={this.props.handleButtonClickAdd}
                                handleInputChange={this.handleInputChange}
                            />
                        }
                        />
                        <Route path='/update' render={() =>
                            <AddUpdateUserForm
                                name={this.state.name}
                                job={this.state.job}
                                buttonText='UPDATE'
                                handleButtonClick={this.props.handleButtonClickUpdate}
                                handleInputChange={this.handleInputChange}
                            />}
                        />
                        <Route render={() => <UserCardList data={this.props.store.getState().data} />} />
                    </Switch>
                </div>
            </Router>
        )
    }
};

//CONSTANS
//const NEW_DATA = 'NEW_DATA';
//const DATA_REQUEST = 'DATA_REQUEST';
//const DATA_ERROR = 'DATA_ERROR';

//STORE, REDUX

const initialState = {
    requestState: null, // 'START', 'ERROR'
    data: []
};
const reqResDataReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case NEW_DATA:
            newState.requestState = null;
            newState.data = action.data;
            return newState;

        case DATA_REQUEST:
            newState.requestState = 'START';
            return newState;

        case DATA_ERROR:
            newState.requestState = 'ERROR';
            return newState;

        default:
            return state;
    }
};
const store = createStore(reqResDataReducer);
console.log(store.getState());
store.subscribe(() => console.log(store.getState()));

//ACTION CREATOR
const actionCreator = {
    _DATA_REQUEST() {
        return {
            type: DATA_REQUEST
        };
    },
    _DATA_SUCCESS(data) {
        return {
            type: NEW_DATA,
            data: data
        };
    },
    _DATA_ERROR(err) {
        return {
            type: DATA_ERROR,
            error: err
        };
    },
    load() {
        return async (dispatch) => {
            dispatch(this._DATA_REQUEST());
            try {
                const response = await fetch('https://reqres.in/api/users');
                const result = await response.json();
                dispatch(this._DATA_SUCCESS(result.data));
            } catch (err) {
                dispatch(this._DATA_ERROR(err));
            }

        };
    },
    async handleButtonClickAdd(name, job) {
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
    },
    async handleButtonClickUpdate(name, job) {
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
    }
};

//BUILD
ReactDOM.render(
    <App
        store={store}
        load={actionCreator.load.bind(actionCreator)}
        handleButtonClickAdd={actionCreator.handleButtonClickAdd}
        handleButtonClickUpdate={actionCreator.handleButtonClickUpdate}
    />,
    document.getElementById("root")
);