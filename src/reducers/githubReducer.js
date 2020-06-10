import {
  GET_USERS,
  SEARCH_USERS,
  GET_USER,
  GET_REPOS,
  CLEAR_USERS,
} from "../actions/types";

const INITIAL_STATE = {
  users: null,
  user: {},
  repos: [],
};

const githubReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USERS:
    case SEARCH_USERS:
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case GET_USER:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
      };
    default:
      return state;
  }
};

export default githubReducer;
