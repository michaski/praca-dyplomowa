import React from "react";
import { useHistory } from "react-router";
import Header from "../../components/header/Header";
import auth from "../../services/auth/auth";

const Register = () => {
    const history = useHistory();
    let username = '';
    let email = '';
    let password = '';
    let confirmPassword = '';

    return (
        <div className="container-fluid">
            <Header />
            <div className="container">
                <div className="row">
                    <h1>Rejestracja</h1>
                </div>
                <div className="row">
                    <div className="mb-3 row">
                        <label htmlFor="usernameInput" className="col-sm-2 col-form-label">Nazwa użytkownika</label>
                        <div className="col-sm-10">
                            <input type="text" className="col-sm-10 form-control" id="usernameInput" placeholder="Nazwa użytkownika" onChange={(e) => username = e.target.value} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="emailInput" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" className="col-sm-10 form-control" id="emailInput" placeholder="name@example.com" onChange={(e) => email = e.target.value} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="passwordInput" className="col-sm-2 col-form-label">Hasło</label>
                        <div className="col-sm-10">
                            <input type="password" className="col-sm-10 form-control" id="passwordInput" onChange={(e) => password = e.target.value} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="confirmPasswordInput" className="col-sm-2 col-form-label">Powtórz hasło</label>
                        <div className="col-sm-10">
                            <input type="password" className="col-sm-10 form-control" id="confirmPasswordInput" onChange={(e) => confirmPassword = e.target.value} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <input type="submit" className="btn btn-primary" value="Login" onClick={async (e) => {
                            auth.register({
                                email: email,
                                username: username,
                                password: password,
                                confirmPassword
                            })
                                .then(succeeded => {
                                    if (succeeded) {
                                        alert("Użytkownik zarejestrowany");
                                        history.push('/login');
                                    }
                                });
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
