import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlertState] = useState(null);

  useEffect(() => {
    (async () => {
      const resp = await axios.get(`https://api.github.com/users?client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

      setLoading(false);
      setUsers(resp.data);
    })();
  }, []);

  const searchUsers = async (queryString) => {
    setLoading(true);

    const resp = await axios.get(`https://api.github.com/search/users?q=
    ${queryString}&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setLoading(false);
    setUsers(resp.data.items);
  };

  const getUserInfo = async (userName) => {
    setLoading(true);

    const resp = await axios.get(`https://api.github.com/users/${userName}?client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setLoading(false);
    setUser(resp.data);
  };

  const getUserRepos = async (userName) => {
    setLoading(true);

    const resp = await axios.get(`https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setLoading(false);
    setRepos(resp.data);
  };

  const setAlert = (msg, type) => {
    setAlertState({
      msg,
      type,
    });

    setTimeout(() => {
      setAlertState(null);
    }, 3000);
  };

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
                  searchUsers={searchUsers}
                  clearResult={() => {
                    setUsers([]);
                    setLoading(false);
                  }}
                  showClear={users && users.length > 0}
                  setAlert={setAlert}
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
                getUserInfo={getUserInfo}
                getUserRepos={getUserRepos}
                loading={loading}
                {...routeProps}
              />
            )}
          />
        </Switch>
      </div>
    </div>
  );
};

export default App;
