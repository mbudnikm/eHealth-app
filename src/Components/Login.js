import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
  } from "react-router-dom";
import Register from "./Register"
  

class Login extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          login: "",
          password: ""
        };
    }

    render() {
        return (
            <Router>
                <div>
                    <Link to="/register" className="float-right p-4">Nie masz jeszcze konta? Zarejestruj się</Link>
                    <div className="d-flex flex-column col-4">
                        <h2 className="p-4">Logowanie</h2>
                        <form>
                        <div className="form-group mb-4">
                            <label for="userLoginInput" className="float-left">Nazwa użytkownika</label>
                            <input type="text" className="form-control form-control-lg" id="userLoginInput" placeholder="Wpisz nazwę użytkownika..." />
                        </div>
                        <div className="form-group mb-4">
                            <label for="userPassowordInput" className="float-left">Hasło</label>
                            <input type="password" className="form-control form-control-lg" id="userPasswordInput" placeholder="Wpisz hasło użytkownika..." />
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>Zaloguj się</button>
                        </form>
                    </div>
                </div>
                <Route path="/register" component={Register} />
            </Router>
        );
    }
}

export default Login;