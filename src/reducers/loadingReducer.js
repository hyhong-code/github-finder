import { SET_LOADING, UNSET_LOADING } from "../actions/types";

const loadingReducer = (state = true, action) => {
  const { type } = action;
  switch (type) {
    case SET_LOADING:
      return true;
    case UNSET_LOADING:
      return false;
    default:
      return state;
  }
};

export default loadingReducer;
