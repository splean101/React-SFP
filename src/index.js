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
class AddUpdateUserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            job: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }
    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }
    async handleButtonClick() {
        const response = await fetch(
            'https://reqres.in/api/users',
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(this.state)
            });
        const result = await response.json();
    }
    render() {
        return (
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label>
                                Name:
                                <input
                                    type='text'
                                    name='name'
                                    value={this.state.name}
                                    onChange={this.handleInputChange}
                                />
                            </label>
                        </td>
                        <td>
                            <label>
                                Job:
                                <input
                                    type='text'
                                    name='job'
                                    value={this.state.job}
                                    onChange={this.handleInputChange}
                                />
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan='2'>
                            <button
                                className='width-button'
                                onClick={this.handleButtonClick}
                            >
                                {this.props.buttonText}
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }

}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
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
                <AddUpdateUserForm buttonText='ADD' />
            </div>)

    }
}
ReactDOM.render(<App />, document.getElementById("root"));
