import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col, ButtonGroup, Toast, ToastContainer } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import EditAccountForm from "../../components/account/EditAccountForm";
import LoggedInHeader from "../../components/header/LoggedInHeader";
import { useAction } from "../../hooks/useAction";
import auth from "../../services/auth/auth";
import { AuthService } from "../../services/auth/authService";
import UserService from "../../services/user/userService";
import authSelector from "../../store/selectors/auth.selector";

const EditAccount = () => {

    return (
    <>
    <LoggedInHeader />
    <h1 className="mt-4 mb-4">
        <span className="border-bottom pb-2"><span className="px-4">Dane użytkownika</span></span>
    </h1>
    <EditAccountForm />
    </>
    );
}

export default EditAccount;
