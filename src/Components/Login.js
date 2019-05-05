import React, { Component } from 'react';
  

class Login extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          user: "",
          password: ""
        };
    }

    handleChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    render() {
        return (
                <div className="container">
                    <div className="d-flex justify-content-end p-4" onClick={this.props.isRegisterHandler}>
                        <a href="/register">Nie masz jeszcze konta? Zarejestruj się</a>
                    </div>
                    <div className="container h-100">
                        <div className="col-xs-12 col-s-12 col-md-8 col-l-6 col-xl-6 mx-auto">
                            <h2 className="p-4">Logowanie</h2>
                            <form onSubmit={this.handleSubmit}>
                            <div className="form-group mb-4">
                                <label htmlFor="user" className="float-left">Nazwa użytkownika</label>
                                <input 
                                    type="text" 
                                    className="form-control form-control-lg" 
                                    id="user" 
                                    onChange={this.handleChange}
                                    placeholder="Wpisz nazwę użytkownika..." />
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="password" className="float-left">Hasło</label>
                                <input 
                                    type="password" 
                                    className="form-control form-control-lg" 
                                    id="password" 
                                    onChange={this.handleChange}
                                    placeholder="Wpisz hasło użytkownika..." />
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg w-100">Zaloguj się</button>
                            </form>
                        </div>
                    </div>
                </div>
                
        );
    }
}

export default Login;