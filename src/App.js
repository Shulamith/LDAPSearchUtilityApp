import React, { Component } from 'react';
import './App.css';
import { Button, Table } from 'antd';
import axios from 'axios';
import FlagTable from './Components/userAccountControlFlags';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { apiResponse: '', username: '' }; //firstname:'', lastname:'', password:'',
    this.dataSource = [
      {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
      },
      {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
      },
    ];

   this.columns = [
      {
        title: 'UserAccountControl',
        dataIndex: 'accountControl',
        key: 'accountControl',
      },
      {
        title: 'Value',
        dataIndex: 'value',
        key: 'value',
      },
    ];
  }
  callAPI = () => {
    axios.post("/API/LDAP/Search", {
      //firstname: this.state.firstname,
      //lastname: this.state.lastname,
      //password: this.state.password,
      username: this.state.username
    })
      .then(res => this.setState({ apiResponse: res.data }));
  }
  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }
 

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Enter the D.O.T. username you would like to check.
          </p>
        </header>
        {this.state.apiResponse.username &&
          <body className="App-response">
            <p> User: {this.state.apiResponse.username}</p>
            <p> UserAccountControl : {this.state.apiResponse.userAccountControl} </p>
            <p>LockoutTime: {this.state.apiResponse.lockoutTime} {this.state.apiResponse.lockedMSG}</p>
            <FlagTable dataSource = {this.state.apiResponse.userAccountControlFlags} columns = {this.columns}/>
          </body>

        }
        <form className="App-form" >
          {/* <span><label> First Name: 
              <input className="App-form-input" name="firstname" type="text" color="black" onChange={this.handleInputChange} />
            </label></span>  */}
          {/* <span><label> Last Name:
              <input className="App-form-input" name="lastname" type="text" onChange={this.handleInputChange}  />
            </label> </span>
            <span><label> Password:
              <input className="App-form-input" name="password" type="password" onChange={this.handleInputChange}/>
            </label> </span> */}
          <span><label> Check D.O.T. Username:
              <input className="App-form-input" name="username" type="text" onChange={this.handleInputChange} />
          </label> </span>
          <Button type="submit" size="middle" onClick={this.callAPI}> Check User </Button>
        </form >
      </div>
    );
  }
}
export default App;