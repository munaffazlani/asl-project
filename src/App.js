import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect,
} from "react-router-dom";
import LoginForm from "./containers/loginForm/loginForm";
import Dashboard from "./containers/dashboard/dashboard";
import PrivateRoute from "./components/common/privateRoute";
import ForgotPassword from "./containers/forgotPassword/forgotPassword";
import ChangePassword from "./containers/changePassword/changePassword";
import "./App.css";
import "antd/dist/antd.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/">
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Route>
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/forgotPassword" component={ForgotPassword} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/changePassword" component={ChangePassword} />
      </div>
    </Router>
  );
}

export default App;
