import { React, useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const userState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
};

const Signup = () => {
    const [user, setUser] = useState(userState);
    const { firstName, lastName, email, password } = user;

    const [registerStatus, setRegisterStatus] = useState(false);

    const register = async () => {
        Axios.post(process.env.REACT_APP_API_URL + "/api/v1/auth/register", {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
        }).then((response) => {
            setRegisterStatus(true);
            setUser({});
        });
    };

    useEffect(() => {
        setUser({});
    }, []);

    return (

        <div className="App">
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <h3>Sign Up</h3>

                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" value={firstName} className="form-control" placeholder="First name"
                            onChange={(e) => {
                                setUser((prevState) => ({
                                    ...prevState,
                                    firstName: e.target.value
                                }));
                            }}
                        />
                    </div>

                    <div className="form-group pt-2">
                        <label>Last name</label>
                        <input type="text" value={lastName} className="form-control" placeholder="Last name"
                            onChange={(e) => {
                                setUser((prevState) => ({
                                    ...prevState,
                                    lastName: e.target.value
                                }));
                            }}
                        />
                    </div>

                    <div className="form-group pt-2">
                        <label>Email address</label>
                        <input type="email" value={email} className="form-control" placeholder="Enter email"
                            onChange={(e) => {
                                setUser((prevState) => ({
                                    ...prevState,
                                    email: e.target.value
                                }));
                            }}
                        />
                    </div>

                    <div className="form-group pt-2 pb-4">
                        <label>Password</label>
                        <input type="password" value={password} className="form-control" placeholder="Enter password"
                            onChange={(e) => {
                                setUser((prevState) => ({
                                    ...prevState,
                                    password: e.target.value
                                }));
                            }}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" onClick={register}>Sign Up</button>

                    {(registerStatus === true) && (
                        <div className="pt-2">
                            <p className="alert alert-success" role="alert">
                                User has been registred! Please Sign in.
                            </p>
                        </div>
                    )}

                    <p className="forgot-password text-right">
                        Already registered  <Link className="nav-link" to={"/sign-in"}>Sign in?</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;