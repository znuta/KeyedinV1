import { combineReducers, createStore } from "redux";
import { SET_FIRST_LAUNCH } from "../action-types";

const INITIAL_STATE = {
  firstLaunch: true,
};

const introReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_FIRST_LAUNCH:
      return {
        ...state,
        firstLaunch: action.payload,
      };
    default:
      return state;
  }
};

export default introReducer;
