import React, { ComponentProps } from "react";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";
import auth from "../../services/auth/auth";


const ProtectedRoute = ({component: Component, ...rest}: any) => {
    return (
        <Route {...rest} render={
            routeProps => {
                if (auth.isUserLoggedIn()) {
                    console.log("User is logged in. Redirecting to app...");
                    return <Component {...routeProps} />;
                } else {
                    return <Redirect to={
                        {
                            pathname: '/login',
                            state: {
                                from: routeProps.location
                            }
                        }
                    } />
                }
            }
        } />
    );
}

export default ProtectedRoute;
