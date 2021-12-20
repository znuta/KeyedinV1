const {
  CATEGORY_MODAL_ACTIVE,
  MILESTONE_MODAL_ACTIVE,
  PROJECT_MODAL_ACTIVE,
  PRIVACY_MODAL_ACTIVE,
  TERMS_MODAL_ACTIVE,
} = require("../action-types");

const categoryModalActive = (state) => {
  return {
    type: CATEGORY_MODAL_ACTIVE,
    state: state,
  };
};

const milestoneModalActive = (state) => {
  return {
    type: MILESTONE_MODAL_ACTIVE,
    state: state,
  };
};

const privacyModalActive = (state) => {
  return {
    type: PRIVACY_MODAL_ACTIVE,
    state: state,
  };
};

const termsModalActive = (state) => {
  return {
    type: TERMS_MODAL_ACTIVE,
    state: state,
  };
};

const projectModalActive = (state) => {
  return {
    type: PROJECT_MODAL_ACTIVE,
    state: state,
  };
};
