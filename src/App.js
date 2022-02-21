import { React } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PrivateRoute from "./components/hoc/privateRoute";


import "./App.css";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Application from "./pages/application";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/sign-up" component={SignUp} />
        <PrivateRoute component={Application} />
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;