const {
  PROJECT_MODAL_ACTIVE,
  SAVE_PROJECT_OVERVIEW,
  SAVE_PROJECT_DETAILS,
  SET_PROJECT_TITLE,
  SET_PROJECT_RESPONSE,
  SET_SHOW_TOAST,
  GET_PROJECTS,
  SET_ALL_PROJECTS,
  SAVE_PROJECT,
} = require("../action-types");

const today = new Date();
const formattedToday =
  today.getDate() + "-0" + (today.getMonth() + 1) + "-" + today.getFullYear();

const INITIAL_STATE = {
  projectModalActive: false,
  projects: [],
  newProjectData: {
    title: "",
    description: "",
    job_mode: "repetitive",
    budget_min: "0",
    budget_max: "0",
    plan_date: formattedToday,
    start_date: formattedToday,
    end_date: formattedToday,
    adjustment: "flexible",
    project_scale: "small",
    milestone_needed: 0,
    skills: [],
    skill_set_id: 1,
    category_id: 1,
    country_id: 1,
    state_id: 15,
    city_id: 10,
  },
  response: "",
  response_type: "error",
  showToast: false,
  projectSaved: false,
};

const projectsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROJECT_MODAL_ACTIVE:
      if(action.state == false ){
        return {
          ...INITIAL_STATE
        }
      }
      return {
        ...state,
        projectModalActive: action.state,
      };
    case SAVE_PROJECT_OVERVIEW:
      // console.log("overview reducer");
      return {
        ...state,
        newProjectData: {
          ...state.newProjectData,
          title: action.state.title,
          description: action.state.description,
          job_mode: action.state.job_mode,
          skills: action.state.skills,
        },
      };
    case SAVE_PROJECT_DETAILS:
      // console.log(action.state);
      return {
        ...state,
        newProjectData: {
          ...state.newProjectData,
          adjustment: action.state.adjustment,
          budget_min: action.state.budget_min,
          budget_max: action.state.budget_max,
          start_date: action.state.start_date,
          plan_date: action.state.start_date,
          end_date: action.state.end_date,
        },
      };
    case SET_PROJECT_TITLE:
      return {
        ...state,
        newProjectData: {
          ...state.newProjectData,
          title: action.state,
        },
      };
    case SET_PROJECT_RESPONSE:
      return {
        ...state,
        response: action.state.message,
        response_type: action.state.type,
      };
    case SET_SHOW_TOAST:
      return {
        ...state,
        showToast: action.state,
      };
    case SET_ALL_PROJECTS:
      console.log("at reducer...");
      return {
        ...state,
        projects: action.projects,
      };
    default:
      return state;
  }
};

export default projectsReducer;

// console.log("received \n" + JSON.stringify(action.state));
