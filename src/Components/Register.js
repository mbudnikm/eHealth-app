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

    render() {
        return (
            <div className="container h-100 pt-5">
                <div className="col-4 mx-auto">
                    <h2 className="p-4">Rejestracja</h2>
                    <form>
                        <div className="form-group mb-4">
                            <label for="userNameInput" className="float-left">Nazwa użytkownika</label>
                            <input type="text" className="form-control form-control-lg" id="userNameInput" placeholder="Wpisz nazwę użytkownika..." />
                        </div>
                        <div className="form-group mb-4">
                            <label for="userPassowordInput" className="float-left">Hasło</label>
                            <input type="password" className="form-control form-control-lg" id="userPasswordInput" placeholder="Wpisz hasło użytkownika..." />
                        </div>
                        <div className="form-group mb-4">
                            <label for="repeatedPassowordInput" className="float-left">Potwierdź hasło</label>
                            <input type="password" className="form-control form-control-lg" id="repeatedPasswordInput" placeholder="Wpisz hasło użytkownika..." />
                        </div>
                        <button type="submit" className="btn btn-success btn-lg" style={{ width: '100%' }}>Załóż konto</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Register;