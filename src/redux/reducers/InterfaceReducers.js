const {
  CATEGORY_MODAL_ACTIVE,
  MILESTONE_MODAL_ACTIVE,
  PROJECT_MODAL_ACTIVE,
  PRIVACY_MODAL_ACTIVE,
  TERMS_MODAL_ACTIVE,
} = require("../action-types");

const INITIAL_STATE = {
  categoryModalActive: false,
  milestoneModalActive: false,
  privacyModalActive: false,
  termsModalActive: false,
  // projectModalActive: false,
};

const interfaceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CATEGORY_MODAL_ACTIVE:
      return {
        ...state,
        categoryModalActive: action.state,
      };
    case MILESTONE_MODAL_ACTIVE:
      return {
        ...state,
        milestoneModalActive: action.state,
      };
    case PRIVACY_MODAL_ACTIVE:
      return {
        ...state,
        privacyModalActive: action.state,
      };
    case TERMS_MODAL_ACTIVE:
      return {
        ...state,
        termsModalActive: action.state,
      };
    // case PROJECT_MODAL_ACTIVE:
    //   return {
    //     ...state,
    //     projectModalActive: action.state,
    //   }
    default:
      return state;
  }
};

export default interfaceReducer;
