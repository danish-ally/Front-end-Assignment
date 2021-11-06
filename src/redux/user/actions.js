import axios from "axios";
import {
  REQ_START,
  GET_USER_LIST,
  USER_SUCCESS,
  USER_FAILURE,
} from "./actionTypes";
// import Cookies from "js-cookie";

export const req = () => {
  console.log("yo");
  return { type: REQ_START };
};

export const reqSuccess = (data) => ({
  type: USER_SUCCESS,
  data,
});

export const reqFailure = (error) => ({
  type: USER_FAILURE,
  error: error,
});

export const reqSuccessGetUser = () => ({
  type: GET_USER_LIST,
});

export const getAllUsers = () => (dispatch) => {
  console.log("yo 34");
  dispatch(req());
  axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      console.log("COMPLETE RESPONSE DATA: ", response.data);
      if (response.status) {
        dispatch(reqSuccess(response.data));
      } else {
        dispatch(reqFailure("Error getting Users List"));
        console.log("Something's not right! Please try again after some time.");
      }
    })
    .catch((err) => {
      dispatch(reqFailure(err.message));
    });
};
