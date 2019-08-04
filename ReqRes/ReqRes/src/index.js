import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, NavLink, Switch} from "react-router-dom";

const root = document.getElementById("root");

const UserCard = (props) => {
   return (
      <table className="card">
         <tbody>
            <tr>
               <td rowSpan="2">
                  <img src={props.avatar} />
               </td>
               <td>{props.first_name}</td>
               <td>{props.last_name}</td>
            </tr>
            <tr>
               <td colSpan="2">{props.email}</td>
            </tr>
         </tbody>
      </table>
   );
};

const UserCardList = (props) => {
   return (
      <div className="blue-border">
         {props.data.map(
            (user) => <UserCard key={user.id} {...user} />
         )}
      </div>
   );
}

const AddUpdateUserForm = (props) => {
   return (
      <table className="blue-border">
         <tbody>
            <tr>
               <td>
                  <label>
                     Name: 
                     <input 
                        type="text"
                        name="name"
                        value={props.name}
                        onChange={props.handleInputChange}
                     />
                  </label>
               </td>
               <td>
                  <label>
                     Job: 
                     <input 
                        type="text"
                        name="job"
                        value={props.job}
                        onChange={props.handleInputChange}
                     />
                  </label>
               </td>
            </tr>
            <tr>
               <td colSpan="2">
                  <button className="width-button" onClick={props.handleButtonClick}>
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
         <li><NavLink exact to="/">Home</NavLink></li>
         <li><NavLink to="/create">Create User</NavLink></li>
         <li><NavLink to="/update">Update User</NavLink></li>
      </ul>
   );
}

class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         data: [],
         name: "",
         job: ""
      };
      this.handleButtonClickAdd = this.handleButtonClickAdd.bind(this);
      this.handleButtonClickUpdate = this.handleButtonClickUpdate.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
   }
   
   async componentDidMount() { // Load DATA from Server
      const response = await fetch("https://reqres.in/api/users");
      const result = await response.json();
      this.setState({
         data: result.data
      });
   }
   
   handleInputChange(event) { // input enter data update
      const {name, value} = event.target;
      this.setState({
         [name]: value
      });
   }
 
   async handleButtonClickAdd() { // add
      const response = await fetch("https://reqres.in/api/users", {
         headers: {
            "Content-Type": "application/json"
         },
         method: "POST",
         body: JSON.stringify({
            name: this.state.name,
            job: this.state.job
         })
      });
      const result = await response.json();
      console.dir(result);
   }
   
      async handleButtonClickUpdate() { // update
      const response = await fetch("https://reqres.in/api/users/3", {
         headers: {
            "Content-Type": "application/json"
         },
         method: "PUT",
         body: JSON.stringify({
            name: this.state.name,
            job: this.state.job
         })
      });
      const result = await response.json();
      console.dir(result);
   }
   render() {
      return (
         <Router>
            <div>
               <Navigation />
               <Switch>
                  <Route path="/create" render={() =>
                     <AddUpdateUserForm
                        name={this.state.name}
                        job={this.state.job}
                        buttonText="Add"
                        handleInputChange={this.handleInputChange}
                        handleButtonClick={this.handleButtonClickAdd}
                     />}
                  />
                  <Route path="/update" render={() =>
                     <AddUpdateUserForm
                        name={this.state.name}
                        job={this.state.job}
                        buttonText="Update"
                        handleInputChange={this.handleInputChange}
                        handleButtonClick={this.handleButtonClickUpdate}
                     />}
                  />
                  <Route render={()=> <UserCardList data={this.state.data} />} />
               </Switch>
            </div>
         </Router>
      );
   }
}

ReactDOM.render(
   <App />,
   root
);