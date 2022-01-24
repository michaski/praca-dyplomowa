import { useEffect } from "react";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { showAlert } from "../../components/alerts/Alert";
import Header from "../../components/header/Header";
import auth from "../../services/auth/auth";
import LoginService from "../../services/auth/loginService";
import './login.css';

const Login = (props: any) => {
    const history = useHistory();
    let email = '';
    let password = '';

    useEffect(() => {
        if (auth.getToken() !== '') {
            history.push('/app');
        }
    });

    return (
        <div className="container-fluid px-0">
            <Header />
            <div className="container">
                <Form className="login-form border" onSubmit={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    await auth.login(email, password)
                    .then(() => {
                        history.push('/app');
                    });
                }}>
                    <Row>
                        <h1>Logowanie</h1>
                    </Row>
                    <Row className="mb-3">
                        <Form.Label htmlFor="emailInput" className="col-sm-2 col-form-label">Email</Form.Label>
                        <Col sm="10">
                            <Form.Control type="email" className="col-sm-10 form-control" id="emailInput" placeholder="name@example.com" onChange={(e) => email = e.target.value} />   
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Form.Label htmlFor="passwordInput" className="col-sm-2 col-form-label">Hasło</Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" className="col-sm-10 form-control" id="passwordInput" placeholder="Hasło" onChange={(e) => password = e.target.value} />   
                        </Col>
                    </Row>
                    <Row>
                        <Form.Control type="submit" role="button" className="btn btn-primary form-submit" value="Zaloguj się" />
                    </Row>
                </Form>
            </div>
        </div>
    );
}

export default Login;
