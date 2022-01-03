import LoginService from "../../services/auth/loginService";

const Login = () => {
    return (
        <div>
            <button className="btn btn-primary" onClick={() => LoginService.login("string2@mail.com", "String123!")}>Login</button>
        </div>
    );
}

export default Login;
