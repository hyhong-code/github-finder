import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearUsers, searchUsers } from "../../actions/githubActions";

const Search = ({ clearUsers, searchUsers, github }) => {
  const [text, setText] = useState("");

  const handleChange = (evt) => {
    setText(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    searchUsers(text);
    setText("");
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Search users..."
          value={text}
          onChange={handleChange}
          autoComplete="off"
        />
        <input
          type="submit"
          value="Search"
          className="btn btn-dark btn-block"
        />
      </form>
      {github.users !== null && github.users.length > 0 && (
        <button
          className="btn btn-light btn-block"
          style={{ marginTop: "-0.6rem" }}
          onClick={clearUsers}
        >
          Clear Results
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  github: PropTypes.object.isRequired,
  clearUsers: PropTypes.func.isRequired,
};

const mapStateToProps = ({ github }) => ({
  github,
});

export default connect(mapStateToProps, { clearUsers, searchUsers })(Search);
