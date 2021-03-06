import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert = (msg, type) => (dispatch) => {
  dispatch({
    type: SET_ALERT,
    payload: {
      msg,
      type,
    },
  });
};

export const removeAlert = () => (dispatch) => {
  dispatch({
    type: REMOVE_ALERT,
  });
};
