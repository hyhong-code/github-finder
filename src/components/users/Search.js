import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
  state = {
    text: "",
  };

  handleChange = (evt) => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.props.searchUsers(this.state.text);
    this.setState({ text: "" });
  };

  render() {
    const { text } = this.state;
    const { clearResult, showClear } = this.props;

    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="text"
            placeholder="Search users..."
            value={text}
            onChange={this.handleChange}
            autoComplete="off"
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>
        {showClear && (
          <button
            className="btn btn-light btn-block"
            style={{ marginTop: "-0.6rem" }}
            onClick={clearResult}
          >
            Clear Results
          </button>
        )}
      </div>
    );
  }
}

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
};

export default Search;
