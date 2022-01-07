import React from "react";
import auth from "../../services/auth/auth";

const Main = (props: any) => {
    return (
        <div>
            <h1>Welcome {auth.user.userName}!</h1>
            <p>You are now logged in</p>
            <button className="btn btn-primary" onClick={() => {
                auth.logout();
                props.history.push('/login');
            }}>Logout</button>
        </div>
    );
}

export default Main;
