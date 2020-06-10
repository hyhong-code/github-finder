import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";
import { connect } from "react-redux";
import Home from "./components/pages/Home";
import PropTypes from "prop-types";
import "./App.css";

const App = ({ alert }) => {
  return (
    <div>
      <Navbar />
      <div className="container">
        {alert !== null && <Alert alert={alert} />}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/user/:login" component={User} />
        </Switch>
      </div>
    </div>
  );
};

App.propTypes = {
  alert: PropTypes.object,
};

const mapStateToProps = ({ alert }) => ({
  alert,
});

export default connect(mapStateToProps)(App);
