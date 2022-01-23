import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import {useHistory} from "react-router";

const Header = () => {
    const history = useHistory();
    const redirectTo = (path: string, name: string) =>
        <a className="nav-link text-light p-2" onClick={() => { history.push(path) }}>{name}</a>
    return (
        <header className="row">
            <Container className="px-0">
                <Navbar collapseOnSelect expand="lg" className="px-3 py-4 border-bottom sticky-top app-header navbar-dark">
                    <Navbar.Brand href="/">Band Click</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mx-auto nav-items homepage-nav-items align-items-stretch">
                            <Nav.Link href="/">Metronom</Nav.Link>
                            <Nav.Link href="/shared">Udostępnione</Nav.Link>
                        </Nav>
                        <Nav className="nav-items">
                            <Nav.Link href="/login">Logowanie</Nav.Link>
                            <Nav.Link href="/register">Zarejestruj się</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </header>
    );
}

export default Header;
