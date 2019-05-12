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
    userId: null,
    auth: null,
  }

  isRegisterHandler = (info) => {
    this.setState({ isRegister: info, registerMssg: !info })
  }

  userHandler = (payload) => {
    this.setState({ 
      userId: payload.id, 
      isLogged: true, 
      auth: {username: payload.name, password: payload.password} 
    })
  }

  logoutHandler = () => {
    this.setState({ userId: null, isLogged: false, registerMssg: false })
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
            userHandler={this.userHandler} /> :
          <Main 
            userId={this.state.userId}
            logoutHandler={this.logoutHandler}
            auth={this.state.auth} />
        )
        }
      </div>
    );
  }
}

export default App;
