import { combineReducers } from "redux";
import userReducer from "./user/reducer";

const rootReducer = combineReducers({
  userState: userReducer,
});

export default rootReducer;
