import {
  REQ_START,
  GET_USER_LIST,
  USER_SUCCESS,
  USER_FAILURE,
} from "./actionTypes";

//Initial state///

const initialState = {
  id: "",
  username: "",
  name: "",
  email: "",
  phone: "",
  website: "",
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
  },
  company: {
    name: "",
  },
  data: [],
  loading: false,
  error: "",
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//? REDUCER FUNCTION.
const userReducer = (state = initialState, action) => {
  console.log("fired");
  switch (action.type) {
    case REQ_START: {
      console.log("Getting User Data");
      return { ...state, loading: true, data: [], error: "" };
    }

    case USER_SUCCESS: {
      console.log("Successfully Got List");
      console.log(action.data);
      return {
        ...state,
        data: action.data,
        error: "",
        loading: false,
      };
    }

    case USER_FAILURE: {
      return {
        ...state,
        data: [],
        error: action.error,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
