import React, { Component } from 'react';
import './App.css';
import Main from "./Components/Main";
import Login from "./Components/Login"
import Register from './Components/Register';

class App extends Component {
  state = {
    isLogged: false,
    isRegister: false,
    registerMssg: false,
    userId: null
  }

  isRegisterHandler = (info) => {
    this.setState({ isRegister: info, registerMssg: !info })
  }

  userIdHandler = (id) => {
    this.setState({ userId: id, isLogged: true })
  }

  logoutHandler = () => {
    this.setState({ userId: null, isLogged: false })
  }


  render() {
    return (
      <div className="App">
        { 
        (!this.state.isLogged && this.state.isRegister) ? 
          <Register isRegisterHandler={this.isRegisterHandler}/> : 
        (!this.state.isLogged && !this.state.isRegister ? 
          <Login 
            registerMssg={this.state.registerMssg}
            isRegisterHandler={this.isRegisterHandler}
            userIdHandler={this.userIdHandler} /> :
          <Main 
            userId={this.state.userId}
            logoutHandler={this.logoutHandler}/>
        )
        }
      </div>
    );
  }
}

export default App;
