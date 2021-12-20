import { BASEURL } from "../../constants/Services";

const {
  PROJECT_MODAL_ACTIVE,
  SAVE_PROJECT_DETAILS,
  SAVE_PROJECT_OVERVIEW,
  SET_PROJECT_TITLE,
  SET_PROJECT_RESPONSE,
  SET_SHOW_TOAST,
  SET_ALL_PROJECTS,
  SAVE_PROJECT,
} = require("../action-types");

const projectModalActive = (state) => {
  return {
    type: PROJECT_MODAL_ACTIVE,
    state: state,
  };
};

const saveProjectOverview = (state) => {
  return {
    type: SAVE_PROJECT_OVERVIEW,
    state: state,
  };
};

const saveProjectDetails = (state) => {
  return {
    type: SAVE_PROJECT_DETAILS,
    state: state,
  };
};

const setProjectTitle = (state) => {
  return {
    type: SET_PROJECT_TITLE,
    state: state,
  };
};

const setProjectResponse = (state) => {
  return {
    type: SET_PROJECT_RESPONSE,
    state: state,
  };
};

const setShowToast = (state) => {
  return {
    type: SET_SHOW_TOAST,
    state: state,
  };
};

const setAllProjects = (projects) => {
  return {
    type: SET_ALL_PROJECTS,
    projects: projects,
  };
};

export const getUserProjects = (token) => dispatch => {
  console.log("Retrieving jobs...");
  let uri = BASEURL + "/employer/employer-jobs";

  try {
    fetch(uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch(setAllProjects(res.data));
        return;
      })
      .catch((error) => {
        console.log("at error", error);
      });
  } catch (error) {
    console.log(error);
  }
};

export const createProjectMilestone = (milestone) => dispatch => {
  console.log("To create project milestone", milestone)
}

// export const postProject = (token) => dispatch {
//   console.log("Posting job...");
//   let uri = BASEURL + "/employer/employer-jobs";
// }
