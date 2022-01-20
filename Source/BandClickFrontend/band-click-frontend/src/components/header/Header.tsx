import React from "react";
import {useHistory} from "react-router";

const Header = () => {
    const history = useHistory();
    const redirectTo = (path: string, name: string) =>
        <a className="nav-link text-light p-2" onClick={() => { history.push(path) }}>{name}</a>
    return (
        <header className="row">
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg ">
                <div className="container-fluid justify-content-between">
                    <div className="d-flex">
                        <a className="navbar-brand d-inline-flex" href="/">
                            <span className="fw-bold">Band Click</span>
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse d-inline-flex justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar">
                            {redirectTo('/', 'Home')}
                            {redirectTo('/shared', 'Udostępnione')}
                            {redirectTo('login', 'Logowanie')}
                            {redirectTo('register', 'Zarejestruj się')}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
