import React, { Component } from 'react';
import { handleResponse, registerUser } from "../Shared/services"

class Register extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          login: "",
          password: "",
          repeatedPassword: "",
          msg1: false,
          msg2: false,
          msg3: false,
          msg4: false
        };
    }

    handleChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        this.setState({ msg1: false, msg2: false, msg3: false})

        if (this.state.login.replace(/\s+/g, '').length < 2 
            && this.state.password.length < 8 
            && this.state.password !== this.state.repeatedPassword) {
            this.setState({ msg1: true, msg2: true, msg3: true })
            return
        } else if(this.state.password !== this.state.repeatedPassword 
            && this.state.login.replace(/\s+/g, '').length < 2) {
            this.setState({ msg1: true, msg3: true })
            return
        } else if (this.state.login.replace(/\s+/g, '').length < 2 
            && this.state.password.length < 8) {
            this.setState({ msg1: true, msg2: true })
            return
        } else if (this.state.login.replace(/\s+/g, '').length < 2) {
            this.setState({ msg1: true })
            return
        } else if (this.state.password !== this.state.repeatedPassword) {
            this.setState({ msg3: true })
            return
        } else if (this.state.password.length < 8) {
            this.setState({ msg2: true })
            // return
        }

        const payload = {
            "name": this.state.login,
            "password": this.state.password
        }
        const response = await handleResponse(async () => await registerUser(payload))
        response.status === 200 && this.props.isRegisterHandler()
        response.status === 500 && this.setState({ msg4: true })
    }

    render() {
        return (
            <div className="container h-100 pt-5">
                <div className="col-xs-12 col-s-12 col-md-8 col-l-6 col-xl-6 mx-auto">
                    <h2 className="p-4">Rejestracja</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group mb-2">
                            <label htmlFor="login" className="float-left">Nazwa użytkownika</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="login" 
                                onChange={this.handleChange}
                                placeholder="Wpisz nazwę użytkownika..." />
                            { this.state.msg1 && 
                                <span className="mt-2 mx-auto" style={{color: "red"}}>
                                    Nazwa użytkownika musi składać się z co najmniej 2 znaków
                                </span>
                            }
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="password" className="float-left">Hasło</label>
                            <input 
                                type="password" 
                                className="form-control form-control-lg" 
                                id="password" 
                                onChange={this.handleChange}
                                placeholder="Wpisz hasło użytkownika..." />
                            { this.state.msg2 && 
                                <span className="mt-2 mx-auto" style={{color: "red"}}>
                                    Hasło musi zawierać minimum 8 znaków
                                </span>
                            }
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="repeatedPassoword" className="float-left">Potwierdź hasło</label>
                            <input 
                                type="password" 
                                className="form-control form-control-lg" 
                                id="repeatedPassword" 
                                onChange={this.handleChange}
                                placeholder="Wpisz hasło użytkownika..." />
                                { this.state.msg3 && 
                                    <span className="mt-2 mx-auto" style={{color: "red"}}>
                                        Hasło i powtórzone hasło muszą być identyczne
                                    </span>
                                }
                        </div>
                        { this.state.msg4 && 
                            <span className="mt-2 mx-auto" style={{color: "red"}}>
                                Konto o podanej nazwie istnieje już w bazie danych. Proszę wpisać inną nazwę użytkownika
                            </span>
                        }
                        <button type="submit" className="btn btn-success btn-lg w-100">Załóż konto</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;