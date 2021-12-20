import { SET_CONVERSATIONS } from "../action-types";

const INITIAL_STATE = {
  conversations: [],
};

const chatReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CONVERSATIONS:
      return {
        ...state,
        conversations: [...action.payload],
      };
    default:
      return state;
  }
};

export default chatReducer;
