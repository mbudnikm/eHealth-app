import React, { Component } from 'react';
import './App.css';
import Header from "./Components/Header";
import Content from "./Components/Content";
import Login from "./Components/Login"
import Register from './Components/Register';

class App extends Component {
  state = {
    isLogged: false
  }

  isLoggedHandler = () => {
    this.setState({
      isLogged: !this.state.isLogged
    })
  }

  render() {
    return (
      <div className="App">
        {/* [<Header />, 
        <Content /> ]*/}
        {/* <Login /> */ }
        { !this.state.isLogged ? <Register /> : <Login />
        }
      </div>
    );
  }
}

export default App;
