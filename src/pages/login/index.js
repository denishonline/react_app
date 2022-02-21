import { React, useState } from "react";
import Axios from "axios";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import SignUp from "./../../pages/signup";

const Login = () => {
    const [email, setUername] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState(true);

    const login = () => {
        Axios.post(process.env.REACT_APP_API_URL + "/api/v1/auth/login", {
            email: email,
            password: password,
        }).then((response) => {
            if (!response.data) {
                setLoginStatus(false);
            } else {
                localStorage.setItem("access-token", response.data.data.token);
                localStorage.setItem("access-user", response.data.data.first_name + " " + response.data.data.last_name);
                window.location.href = "/";
            }
        });
    };

    return (

        <div className="App">
            < nav className="navbar navbar-light bg-light" >
                <div className="container-fluid">
                    <Link className="navbar-brand" to={"/sign-in"}>React node demo</Link>
                    <form className="d-flex">
                        <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                    </form>
                </div>
            </nav >

            <div className="auth-wrapper">
                <div className="auth-inner">
                    <Router>
                        <Switch>
                            <Route path="/sign-up" component={SignUp} />
                        </Switch>
                    </Router>
                    <div>
                        <h3>Sign in</h3>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter email"
                                onChange={(e) => {
                                    setUername(e.target.value);
                                    setLoginStatus(true);
                                }}
                            />
                        </div>

                        <div className="form-group pt-2">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setLoginStatus(true);
                                }}
                            />
                        </div>

                        {(loginStatus === false) && (
                            <div className="pt-2">
                                <div className="alert alert-danger" role="alert">
                                    Wrong username or pasword
                                </div>
                            </div>
                        )}

                        <div className="form-group d-flex flex-row align-items-center py-2">
                            {/* <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label">&nbsp;Remember me</label> */}
                        </div>

                        <button
                            //type="submit"
                            className="btn btn-dark btn-lg btn-block"
                            onClick={login}
                        >
                            Sign in
                        </button>
                        <p className="forgot-password text-right">
                            {/* Forgot <a href="#">password?</a> */}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;