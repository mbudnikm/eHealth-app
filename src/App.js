import React, { Component } from 'react';
import './App.css';
import Main from "./Components/Main";
import Login from "./Components/Login"
import Register from './Components/Register';
import { Route, Switch } from "react-router-dom"
import { history } from "./index"

class App extends Component {
  state = {
    registerMssg: false,
    userId: null,
    auth: null,
  }

  componentWillMount() {
    history.push("/")
  }

  registerMssgHandler = () => {
    this.setState({ registerMssg: !this.state.registerMssg })
    history.push("/")
  }

  userHandler = (payload) => {
    this.setState({ 
      userId: payload.id, 
      auth: { 
        username: payload.name, 
        password: payload.password
      }
    })
    history.push('/app')
  }

  logoutHandler = () => {
    this.setState({ userId: null, registerMssg: false })
    history.push("/")
  }


  render() {
    const userInfo = {
      userId: this.state.userId,
      auth: this.state.auth
    }

    return (
      <div className="App">
        <Switch>
          <Route exact path="/app" render={() => (
            <>
              <Main 
              userInfo={userInfo}
              logoutHandler={this.logoutHandler}/>
            </>
          )} />
          <Route path="/register" render={() => (
            <>
              <Register registerMssgHandler={this.registerMssgHandler}/>
            </>
          )}/>
          <Route path="/" render={() => (
            <>
              <Login 
                registerMssg={this.state.registerMssg}
                isRegisterHandler={this.isRegisterHandler}
                userHandler={this.userHandler} />
            </>
          )}/>
        </Switch>
      </div>
    );
  }
}

export default App;