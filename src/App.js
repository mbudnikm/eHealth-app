import React, { Component } from 'react';
import './App.css';
import Header from "./Components/Header";
import Content from "./Components/Content";
import Login from "./Components/Login"
import Register from './Components/Register';
import { throws } from 'assert';

class App extends Component {
  state = {
    isLogged: false,
    isRegister: true,
    registerMssg: false
  }

  isLoggedHandler = () => {
    this.setState({ isLogged: !this.state.isLogged })
  }

  isRegisterHandler = () => {
    this.setState({ isRegister: false, registerMssg: true })
  }


  render() {
    return (
      <div className="App">
        { 
        (!this.state.isLogged && this.state.isRegister) ? 
          <Register isRegisterHandler={this.isRegisterHandler}/> : 
        (!this.state.isLogged && !this.state.isRegister ? 
          <Login registerMssg={this.state.registerMssg}/> :
          [<Header />, 
            <Content /> ]
        )
        }
      </div>
    );
  }
}

export default App;
