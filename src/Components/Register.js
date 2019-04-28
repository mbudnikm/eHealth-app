import React, { Component } from 'react';
  
class Register extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          login: "",
          password: "",
          repeatedPassword: ""
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
            <div className="container h-100 pt-5">
                <div className="col-xs-12 col-s-12 col-md-8 col-l-6 col-xl-6 mx-auto">
                    <h2 className="p-4">Rejestracja</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group mb-4">
                            <label htmlFor="login" className="float-left">Nazwa użytkownika</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="login" 
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
                        <div className="form-group mb-4">
                            <label htmlFor="repeatedPassoword" className="float-left">Potwierdź hasło</label>
                            <input 
                                type="password" 
                                className="form-control form-control-lg" 
                                id="repeatedPassword" 
                                onChange={this.handleChange}
                                placeholder="Wpisz hasło użytkownika..." />
                        </div>
                        <button type="submit" className="btn btn-success btn-lg w-100">Załóż konto</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;