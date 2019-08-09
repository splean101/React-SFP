import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './../components/Navigation';
import AddUpdateUserForm from './../components/AddUpdateUserForm';
import UserCardList from './../components/UserCardList';
import * as actionCreater from './../actions';
import {connect} from 'react-redux';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            job: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleButtonClickAdd = this.handleButtonClickAdd.bind(this);
        this.handleButtonClickUpdate = this.handleButtonClickUpdate.bind(this);
    }
    componentDidMount() {
        this.props.load();
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleButtonClickAdd(){
        this.props.handleButtonClickAdd(this.state.name, this.state.job);
    }
    handleButtonClickUpdate(){
        this.props.handleButtonClickUpdate(this.state.name, this.state.job);
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
                        <Route render={() => <UserCardList data={this.props.data} />} />
                    </Switch>
                </div>
            </Router>
        )
    }
};
function mapStateToProps (state){
    return {
        data: state.reqResDataReducer.data
    }
};
function mapDispatchToProps (dispatch) {
    return {
        handleButtonClickAdd: actionCreater.handleButtonClickAdd,
        handleButtonClickUpdate: actionCreater.handleButtonClickUpdate,
        load: () => actionCreater.load()(dispatch)
    };
};
export default connect(mapStateToProps, mapDispatchToProps) (App);