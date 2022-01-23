import React from "react";
import { Container, Form, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import Header from "../../components/header/Header";
import auth from "../../services/auth/auth";
import './register.css';

const Register = (props: any) => {
    const history = useHistory();
    let username = '';
    let email = '';
    let password = '';
    let confirmPassword = '';

    return (
        <div className="container-fluid px-0">
            <Header />
            <Container>
                <Form className="register-form text-md-end text-start border" onSubmit={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    await auth.register({
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
                }}>
                    <Row className="text-center">
                        <h1>Rejestracja</h1>
                    </Row>
                    <Row className="mb-3">
                        <Form.Label htmlFor="usernameInput" className="col-sm-3 col-form-label">Nazwa użytkownika</Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" className="form-control" id="usernameInput" placeholder="Nazwa" onChange={(e) => username = e.target.value} />   
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Form.Label htmlFor="emailInput" className="col-sm-3 col-form-label">Email</Form.Label>
                        <Col sm="9">
                            <Form.Control type="email" className="form-control" id="emailInput" placeholder="name@example.com" onChange={(e) => email = e.target.value} />   
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Form.Label htmlFor="passwordInput" className="col-sm-3 col-form-label">Hasło</Form.Label>
                        <Col sm="9">
                            <Form.Control type="password" className="form-control" id="passwordInput" placeholder="Hasło" onChange={(e) => password = e.target.value} />   
                        </Col>
                        <Form.Text muted>Hasło musi się składać z minimum 6 znaków, w tym conajmniej jednej wielkiej litery, jednej małej litery, znaku i cyfry</Form.Text>
                    </Row>
                    <Row className="mb-3">
                        <Form.Label htmlFor="confirmPasswordInput" className="col-sm-3 col-form-label">Potwierdź hasło</Form.Label>
                        <Col sm="9">
                            <Form.Control type="password" className="form-control" id="confirmPasswordInput" placeholder="Hasło" onChange={(e) => confirmPassword = e.target.value} />   
                        </Col>
                    </Row>
                    <Row>
                        <Form.Control type="submit" role="button" className="btn btn-primary form-submit" value="Zarejestruj się" />
                    </Row>
                </Form>
            </Container>
        </div>
    );
}

export default Register;
