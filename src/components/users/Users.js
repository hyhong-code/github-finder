import React, { Fragment } from "react";
import UserItem from "./UserItem";
import PropTypes from "prop-types";
import Spinner from "../Spinner";

const Users = ({ users, loading }) => {
  return (
    <Fragment>
      {loading && <Spinner />}
      {users !== null && (
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
  users: PropTypes.array,
  lodaing: PropTypes.bool,
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
};

export default Users;
