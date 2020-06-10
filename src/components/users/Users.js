import React, { Fragment, useEffect } from "react";
import UserItem from "./UserItem";
import PropTypes from "prop-types";
import Spinner from "../Spinner";
import { connect } from "react-redux";
import { getUsers } from "../../actions/githubActions";

const Users = ({ github: { users }, loading, getUsers }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <Fragment>
      {loading && <Spinner />}
      {!loading && users !== null && (
        <div style={userStyle}>
          {users.map((user) => (
            <UserItem key={user.id} user={user}>
              {user.login} >
            </UserItem>
          ))}
        </div>
      )}
    </Fragment>
  );
};

Users.propTypes = {
  github: PropTypes.object.isRequired,
  lodaing: PropTypes.bool,
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
};

const mapStateToProps = ({ github, loading }) => ({
  github,
  loading,
});

export default connect(mapStateToProps, { getUsers })(Users);
