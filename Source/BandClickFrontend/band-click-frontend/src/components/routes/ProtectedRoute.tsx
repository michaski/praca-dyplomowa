import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import authSelector from "../../store/selectors/auth.selector";


const ProtectedRoute = ({component: Component, ...rest}: any) => {
    const isLoggedIn = useSelector(authSelector.isLoggedIn);

    return (
        <Route {...rest} render={
            routeProps => {
                if (isLoggedIn) {
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
