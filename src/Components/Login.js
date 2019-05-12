import React, { Component } from 'react';
import { handleResponse, loginUser } from "../Shared/services"
import { history } from "../index"

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

    changeisRegisterState = (e) => {
        e.stopPropagation();
        this.props.isRegisterHandler()
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const payload = {
            "name": this.state.user,
            "password": this.state.password
        }
        const response = await handleResponse(async () => await loginUser(payload))
        response.status === 200 && this.props.userHandler({...payload, id: response.data.id})
    }

    render() {
        return (
                <div className="container">
                    <div className="d-flex justify-content-end p-4">
                        <span onClick={() => history.push("/register")} data-id="1">
                            <a href="/register">Nie masz jeszcze konta? Zarejestruj się</a>
                        </span>
                    </div>
                    <div className="container h-100">
                        <div className="col-xs-12 col-s-12 col-md-8 col-l-6 col-xl-6 mx-auto">
                            { this.props.registerMssg && 
                                <h5 className="mt-2 mx-auto" style={{color: "green"}}>
                                    Konto zostało poprawnie utworzone
                                </h5>
                            }
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