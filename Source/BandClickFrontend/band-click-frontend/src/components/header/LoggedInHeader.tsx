import React from "react";
import { Button, Col, Container, Nav, Navbar, NavbarBrand, NavDropdown, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import {useHistory} from "react-router";
import auth from "../../services/auth/auth";
import authSelector from "../../store/selectors/auth.selector";

const LoggedInHeader = (props: any) => {
    const user = useSelector(authSelector.getUser);
    const history = useHistory();
    const redirectTo = (path: string, name: string) =>
        <a className="p-2" href="#" onClick={() => { history.push(path) }}>{name}</a>
    return (
        <header className="row">

        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <a href="/" className="navbar-brand d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                    <span className="fw-bold">Band Click</span>
                </a>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center align-items-center mb-md-0">
                    <li className="nav-item">{redirectTo('/', 'Home')}</li>
                    <li className="nav-item">{redirectTo('shared', 'Udostępnione')}</li>        
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Zespoły
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <li><a className="dropdown-item p-2" href="" onClick={() => { history.push('bands/all') }}>Wszystkie zespoły</a></li>
                            <li><a className="dropdown-item p-2" href="" onClick={() => { history.push('bands/my') }}>Moje zespoły</a></li>
                        </ul>
                    </li>
                </ul>

                <div className="col-md-3 text-end">
                    <button type="button" className="btn btn-outline-primary me-2">Login</button>
                    <button type="button" className="btn btn-primary">Sign-up</button>
                </div>
            </header>
        </div>


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
                    <div className="collapse navbar-collapse d-inline-flex justify-content-center flex-row" id="navbarNavAltMarkup">
                        <div className="navbar">
                            {redirectTo('/', 'Home')}
                            {redirectTo('shared', 'Udostępnione')}
                            <div className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Zespoły
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li><a className="dropdown-item p-2" href="" onClick={() => { history.push('/bands/all') }}>Wszystkie zespoły</a></li>
                                    <li><a className="dropdown-item p-2" href="" onClick={() => { history.push('/bands/my') }}>Moje zespoły</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="collapse navbar-collapse d-inline-flex justify-content-end flex-row" id="navbarNavAltMarkup">
                        <span className="fw-bold">{user.username}</span>
                        <button className="btn btn-primary" onClick={async () => {
                            await auth.logout()
                            .then(() => {
                                history.push('/');
                            });
                        }}>Wyloguj</button>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default LoggedInHeader;
