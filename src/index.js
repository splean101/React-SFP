import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { userInfo } from 'os';

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
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            name: '',
            job: ''
        };
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    async handleButtonClick() {
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
    }
    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }
    async componentDidMount() {
        const response = await fetch('https://reqres.in/api/users');
        const result = await response.json();
        this.setState({
            data: result.data
        })
    }
    render() {
        return (
            <div>
                <UserCardList data={this.state.data} />
                <AddUpdateUserForm
                    name={this.state.name}
                    job={this.state.job}
                    buttonText='ADD'
                    handleButtonClick={this.handleButtonClick}
                    handleInputChange={this.handleInputChange}
                />
            </div>)
    }
}
ReactDOM.render(<App />, document.getElementById("root"));
