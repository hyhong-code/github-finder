import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    users: null,
    loading: true,
  };

  async componentDidMount() {
    const resp = await axios.get(`https://api.github.com/users?client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: resp.data, loading: false });
  }

  searchUsers = async (queryString) => {
    console.log(queryString);
    this.setState({ loading: true });

    const resp = await axios.get(`https://api.github.com/search/users?q=
    ${queryString}&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: resp.data.items, loading: false });
  };

  render() {
    const { loading, users } = this.state;
    return (
      <div>
        <Navbar />
        <div className="container">
          <Search
            searchUsers={this.searchUsers}
            clearResult={() => this.setState({ users: [], loading: false })}
            showClear={users && users.length > 0}
          />
          <Users users={users} loading={loading} />
        </div>
      </div>
    );
  }
}

export default App;
