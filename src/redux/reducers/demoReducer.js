const { SAVE_PROJECT } = require("../action-types");

const INITIAL_STATE = {
  projects: [],
};

const demoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_PROJECT:
      console.log(action.state);
    //   let newState = [...INITIAL_STATE.projects, action.state];
      return {
        ...state,
        // projects: [...state.projects, action.state.map(proj => { return proj })],
        projects: [state.projects, action.state],
        // projects: INITIAL_STATE.projects,
      };
    default:
      return state;
  }
};

export default demoReducer;
