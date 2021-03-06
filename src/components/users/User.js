import React, { Fragment, useEffect } from "react";
import Spinner from "../Spinner";
import Repos from "../repos/Repos";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserInfo, getUserRepos } from "../../actions/githubActions";
import { setLoading, unsetLoading } from "../../actions/loadingActions";

export const User = ({
  loading,
  github: {
    user: {
      name,
      avatar_url,
      location,
      bio,
      blog,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable,
      company,
    },
    repos,
  },
  getUserInfo,
  getUserRepos,
  match: {
    params: { login },
  },
}) => {
  useEffect(() => {
    getUserInfo(login);

    getUserRepos(login);
  }, [getUserInfo, getUserRepos, login]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/" className="btn btn-light">
        Back to search
      </Link>
      Hireable{" "}
      {hireable ? (
        <i className="fas fa-check text-success"></i>
      ) : (
        <i className="fas fa-times-circle text-danger"></i>
      )}
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatar_url}
            alt="avatar"
            style={{ width: "150px" }}
            className="round-img"
          />
          <h1>{name}</h1>
          {location && <p>Location: {location}</p>}
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio:</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a
            className="btn btn-dark my-1"
            href={html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Github Profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username: </strong> {login}
                </Fragment>
              )}
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company: </strong> {company}
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>Website: </strong>{" "}
                  <a target="_blank" rel="noopener noreferrer" href={blog}>
                    {blog}
                  </a>
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-light">Public Repos: {public_repos}</div>
        <div className="badge badge-dark">Public Gists: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};

User.propTypes = {
  getUserInfo: PropTypes.func.isRequired,
  getUserRepos: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  github: PropTypes.object.isRequired,
};

const mapStateToProps = ({ github, loading }) => ({
  github,
  loading,
});

export default connect(mapStateToProps, {
  getUserInfo,
  getUserRepos,
  setLoading,
  unsetLoading,
})(User);
