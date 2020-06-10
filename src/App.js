import React, { Component, Fragment } from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";
import "./App.css";

class App extends Component {
  state = {
    users: null,
    user: {},
    repos: [],
    loading: true,
    alert: null,
  };

  async componentDidMount() {
    const resp = await axios.get(`https://api.github.com/users?client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: resp.data, loading: false });
  }

  searchUsers = async (queryString) => {
    this.setState({ loading: true });

    const resp = await axios.get(`https://api.github.com/search/users?q=
    ${queryString}&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: resp.data.items, loading: false });
  };

  getUserInfo = async (userName) => {
    this.setState({ loading: true });

    const resp = await axios.get(`https://api.github.com/users/${userName}?client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ user: resp.data, loading: false });
  };

  getUserRepos = async (userName) => {
    this.setState({ loading: true });

    const resp = await axios.get(`https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ repos: resp.data, loading: false });
  };

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => {
      this.setState({ alert: null });
    }, 3000);
  };

  render() {
    const { loading, users, alert, user, repos } = this.state;
    return (
      <div>
        <Navbar />
        {alert !== null && <Alert alert={alert} />}
        <div className="container">
          <Switch>
            <Route
              exact
              path="/"
              render={(routeProps) => (
                <Fragment>
                  <Search
                    {...routeProps}
                    searchUsers={this.searchUsers}
                    clearResult={() =>
                      this.setState({ users: [], loading: false })
                    }
                    showClear={users && users.length > 0}
                    setAlert={this.setAlert}
                  />
                  <Users {...routeProps} users={users} loading={loading} />
                </Fragment>
              )}
            />
            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/user/:login"
              render={(routeProps) => (
                <User
                  user={user}
                  repos={repos}
                  getUserInfo={this.getUserInfo}
                  getUserRepos={this.getUserRepos}
                  loading={loading}
                  {...routeProps}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
