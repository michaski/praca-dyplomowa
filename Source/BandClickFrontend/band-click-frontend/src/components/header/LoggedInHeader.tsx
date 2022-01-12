import React from "react";
import { useSelector } from "react-redux";
import {useHistory} from "react-router";
import auth from "../../services/auth/auth";
import authSelector from "../../store/selectors/auth.selector";

const LoggedInHeader = (props: any) => {
    const user = useSelector(authSelector.getUser);
    const history = useHistory();
    const redirectTo = (path: string, name: string) =>
        <a href="#" className="nav-link text-light p-2" onClick={() => { history.push(path) }}>{name}</a>
    return (
        <header className="row text-light">
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
                            {redirectTo('bands', 'Zespoły')}
                            {redirectTo('shared', 'Udostępnione')}
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
