import {
  GET_USERS,
  SEARCH_USERS,
  GET_USER,
  GET_REPOS,
  CLEAR_USERS,
} from "./types";
import { setAlert, removeAlert } from "./alertAction";
import { setLoading, unsetLoading } from "./loadingActions";
import axios from "axios";

export const getUsers = () => async (dispatch) => {
  dispatch(setLoading());
  const resp = await axios.get(`https://api.github.com/users?client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  dispatch({
    type: GET_USERS,
    payload: resp.data,
  });
  dispatch(unsetLoading());
};

export const searchUsers = (queryString) => async (dispatch) => {
  if (!queryString) {
    dispatch(setAlert("Whom do you wish to search for?", "danger"));
    setTimeout(() => {
      dispatch(removeAlert());
    }, 2500);
  } else {
    dispatch(setLoading());

    const resp = await axios.get(`https://api.github.com/search/users?q=
      ${queryString}&client_id=
      ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
      ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    dispatch({
      type: SEARCH_USERS,
      payload: resp.data.items,
    });
    dispatch(unsetLoading());
  }
};

export const getUserInfo = (userName) => async (dispatch) => {
  dispatch(setLoading());
  const resp = await axios.get(`https://api.github.com/users/${userName}?client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  dispatch({
    type: GET_USER,
    payload: resp.data,
  });
};

export const getUserRepos = (userName) => async (dispatch) => {
  const resp = await axios.get(`https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
    ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  dispatch({
    type: GET_REPOS,
    payload: resp.data,
  });
  dispatch(unsetLoading());
};

export const clearUsers = () => (dispatch) => {
  dispatch({
    type: CLEAR_USERS,
  });
};
