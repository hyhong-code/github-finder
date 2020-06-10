import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    users: null,
    loading: true,
  };

  async componentDidMount() {
    const resp = await axios.get("https://api.github.com/users");
    this.setState({ users: resp.data, loading: false });
  }
  render() {
    const { loading, users } = this.state;
    return (
      <div>
        <Navbar />
        <div className="container">{!loading && <Users users={users} />}</div>
      </div>
    );
  }
}

export default App;
