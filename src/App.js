import React, { Component } from 'react';
import './App.css';
import Header from "./Components/Header";
import Content from "./Components/Content";
import Login from "./Components/Login"

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Header />
        <Content /> */}
        <Login />
      </div>
    );
  }
}

export default App;
