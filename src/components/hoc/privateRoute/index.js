import React, { Component } from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import Login from "../../../pages/login";

class privateRoute extends Component {

    render() {
        const { component: Component } = this.props;

        let isLoggedIn = false;
        if (localStorage.getItem("access-token")) {
            isLoggedIn = true;
        }

        return (
            <Route
                render={(props) => {
                    if (isLoggedIn) {
                        return <Component {...props} />;
                    } else {
                        return <Login />
                    }
                }}
            />
        );
    }
}

export default withRouter(privateRoute);
