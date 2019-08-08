import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './../components/Navigation';
import AddUpdateUserForm from './../components/AddUpdateUserForm';
import UserCardList from './../components/UserCardList';

export default class App extends React.Component {
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
                        <Route render={() => <UserCardList data={this.props.store.getState().reqResDataReducer.data} />} />
                    </Switch>
                </div>
            </Router>
        )
    }
};