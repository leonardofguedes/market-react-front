import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  auth: {
    isLoading: false,
    user: null,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        auth: {
          ...state.auth,
          isLoading: true,
        },
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        auth: {
          ...state.auth,
          isLoading: false,
          user: action.payload,
        },
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        auth: {
          ...state.auth,
          isLoading: false,
        },
      };
    case "LOGOUT":
      return {
        ...state,
        auth: {
          ...state.auth,
          user: null,
        },
      };
    default:
      return state;
  }
};

const store = configureStore({
  reducer,
});

export default store;
