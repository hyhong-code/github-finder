import { combineReducers } from "redux";
import github from "./githubReducer";
import loading from "./loadingReducer";
import alert from "./alertReducer";

const rootReducer = combineReducers({
  github,
  loading,
  alert,
});

export default rootReducer;
