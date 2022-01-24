import React, { useEffect } from "react";
import { Button, Col, Container, Nav, Navbar, NavbarBrand, NavDropdown, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import {useHistory} from "react-router";
import { useAction } from "../../hooks/useAction";
import auth from "../../services/auth/auth";
import { AuthService } from "../../services/auth/authService";
import UserService from "../../services/user/userService";
import authSelector from "../../store/selectors/auth.selector";
import './header.css';

const LoggedInHeader = (props: any) => {
    const user = useSelector(authSelector.getUser);
    const history = useHistory();
    const redirectTo = (path: string, name: string) =>
        <a className="p-2" href="" onClick={() => { history.push(path) }}>{name}</a>
    
    const authActions = useAction(AuthService);

    useEffect(() => {
        if (!user || user.id === '') {
            UserService.getUserByEmail(localStorage.getItem('email') as string)
            .then(result => {
                authActions.setUser(result);
            })
        }
    });

    return (
        <header className="row">
            <Container className="px-0">
                <Navbar collapseOnSelect expand="lg" className="px-4 py-4 border-bottom sticky-top app-header navbar-dark">
                    <Navbar.Brand href="/app">Band Click</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mx-auto nav-items app-nav-items align-items-stretch">
                            <Nav.Link href="/app">Metronom</Nav.Link>
                            <NavDropdown title="Zespoły" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/bands/all">Wszystkie zespoły</NavDropdown.Item>
                                <NavDropdown.Item href="/bands/managed">Zarządzane zespoły</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/shared">Udostępnione</Nav.Link>
                        </Nav>
                        <Nav>
                            <NavDropdown align="end" title={user.username} className="user-dropdown nav-items" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/account/edit">Zarządzaj kontem</NavDropdown.Item>
                                <NavDropdown.Item onClick={async () => {
                                await auth.logout()
                                .then(() => {
                                    history.push('/');
                                });
                            }}>Wyloguj</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        </header>
    );
}

export default LoggedInHeader;
