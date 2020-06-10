import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ clearResult, showClear, setAlert, searchUsers }) => {
  const [text, setText] = useState("");

  const handleChange = (evt) => {
    setText(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!text) {
      return setAlert("Please enter something", "light");
    }
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
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  showClear: PropTypes.bool,
  clearResult: PropTypes.func.isRequired,
};

export default Search;
