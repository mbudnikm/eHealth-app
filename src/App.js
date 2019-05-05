import React, { Component } from 'react';
import './App.css';
import Header from "./Components/Header";
import Content from "./Components/Content";
import Login from "./Components/Login"
import Register from './Components/Register';

class App extends Component {
  state = {
    isLogged: false,
    isRegister: false
  }

  isLoggedHandler = () => {
    this.setState({
      isLogged: !this.state.isLogged
    })
  }


  render() {
    return (
      <div className="App">
        { 
        (!this.state.isLogged && this.state.isRegister) ? <Register /> : 
        (!this.state.isLogged && !this.state.isRegister ? <Login /> :
          [<Header />, 
            <Content /> ]
        )
        }
      </div>
    );
  }
}

export default App;
