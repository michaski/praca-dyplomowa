import Header from "../../components/header/Header";
import auth from "../../services/auth/auth";

const Login = (props: any) => {
    let email = '';
    let password = '';

    return (
        <div className="container-fluid">
            <Header />
            <div className="container">
                <div className="row">
                    <h1>Logowanie</h1>
                </div>
                <div className="row">
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
                        <input type="submit" className="btn btn-primary" value="Login" onClick={async (e) => {
                            await auth.login(email, password)
                                .then(() => {
                                    props.history.push('/app');
                                });
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
