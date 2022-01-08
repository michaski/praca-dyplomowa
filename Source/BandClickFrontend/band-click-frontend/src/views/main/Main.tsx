import React from "react";
import { useSelector } from "react-redux";
import auth from "../../services/auth/auth";
import authSelector from "../../store/selectors/auth.selector";

const Main = (props: any) => {
    const user = useSelector(authSelector.getUser);

    return (
        <div>
            <h1>Welcome {user.username}!</h1>
            <p>You are now logged in</p>
            <button className="btn btn-primary" onClick={() => {
                auth.logout()
                    .then(() => {
                        props.history.push('/login');
                    });
            }}>Logout</button>
        </div>
    );
}

export default Main;
