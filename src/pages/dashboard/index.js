import { React } from "react";

const Dashboard = () => {
    return (
        <div className="jumbotron pt-3">
            <h1 className="display-4">Hello, {localStorage.getItem("access-user")}</h1>
            <p className="lead">This is your dashboard.</p>
        </div>
    );
}

export default Dashboard;