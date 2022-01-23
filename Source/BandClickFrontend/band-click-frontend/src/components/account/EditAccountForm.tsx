import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col, ButtonGroup, Toast, ToastContainer } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import LoggedInHeader from "../../components/header/LoggedInHeader";
import { useAction } from "../../hooks/useAction";
import auth from "../../services/auth/auth";
import { AuthService } from "../../services/auth/authService";
import UserService from "../../services/user/userService";
import authSelector from "../../store/selectors/auth.selector";

const EditAccountForm = () => {
    const history = useHistory();
    const authActions = useAction(AuthService);
    const [user, setUser] = useState(useSelector(authSelector.getUser));
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (!user || user.id === '') {
            fetchUser();
        }
    });

    const fetchUser = () => {
        UserService.getUserByEmail(localStorage.getItem('email') as string)
        .then(result => {
            setUser(result);
            authActions.setUser(result);
            localStorage.setItem('email', result.email);
        });
    }

    const updateUserInfo = () => {
        localStorage.setItem('email', user.email);
        UserService.update(user)
        .then(_ => {
            fetchUser();
        });
    }

    const changePassword = () => {
        UserService.changePassword({
            id: user.id,
            newPassword: newPassword,
            confirmNewPassword: confirmPassword
        }).then(_ => {
            fetchUser();
        });
    }

    const deleteUser = () => {
        UserService.deleteUser(user.id)
        .then(_ => {
            auth.logout();
            history.push('/');
        });
    }

    return (
    <>
    <Container>
        <Row className="text-start">
            <Col lg={6}>
                <Container>
                    <Form className="border p-4 mt-2" onSubmit={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        updateUserInfo();
                    }}>
                        <Form.Group className="mb-3" as={Row}>
                            <Col md={4}>
                                <Form.Label>Nazwa użytownika</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control type="text" placeholder="Nazwa użytkownika" defaultValue={user.username} onChange={e => {
                                    setUser(previous => {
                                        previous.username = e.target.value;
                                        return previous;
                                    });
                                }} />
                            </Col>
                        </Form.Group>
                        <Form.Group className="mb-3" as={Row}>
                            <Col md={4}>
                                <Form.Label>Email</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control type="email" placeholder="Enter email" defaultValue={user.email} onChange={e => {
                                    setUser(previous => {
                                        previous.email = e.target.value;
                                        return previous;
                                    });
                                }} />
                            </Col>
                        </Form.Group>
                        <Form.Control className="btn btn-primary" type="submit" onClick={updateUserInfo} value="Zapisz" />
                    </Form>
                </Container>
            </Col>

            <Col lg={6}>
                <Container>
                    <Form className="border p-4 mt-2" onSubmit={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        changePassword();
                    }}>
                        <Form.Group className="mb-3" as={Row}>
                            <Col md={4}>
                                <Form.Label>Nowe hasło</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control type="password" placeholder="Hasło" onChange={e => {
                                    setNewPassword(e.target.value);
                                }} />
                            </Col>
                        </Form.Group>
                        <Form.Group className="mb-3" as={Row}>
                            <Col md={4}>
                                <Form.Label>Powtórz hasło</Form.Label>
                            </Col>
                            <Col md={8}>
                                <Form.Control type="password" placeholder="Powtórz hasło" onChange={e => {
                                    setConfirmPassword(e.target.value);
                                }} />
                            </Col>
                        </Form.Group>
                        <Form.Control className="btn btn-secondary" type="submit" onClick={changePassword} value="Zmień hasło" />
                    </Form>
                </Container>
            </Col>
        </Row>
        <Row className="my-4">
            <Button variant="danger" onClick={deleteUser}>Usuń konto</Button>
        </Row>
    </Container>
    </>
    );
}

export default EditAccountForm;
