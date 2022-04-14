import { combineReducers } from "redux";
import introReducer from "./IntroReducer";
import authReducer from "./AuthReducer";
import interfaceReducer from "./InterfaceReducers";
import projectsReducer from "./ProjectsReducer";
import demoReducer from "./demoReducer";
import todosReducer from "./education";
import employmentReducer from "./employmentReducer";
import expertReducer from "./expertise";
import linkReducer from "./linkReducer";
import portfolioReducer from "./portfolioReducer";
import milestoneReducer from "./milestoneReducer";
import chatReducer from "./ChatReducer";
import {AppNotification} from './Notification';

const rootReducer = combineReducers({
  intro: introReducer,
  auth: authReducer,
  ui: interfaceReducer,
  projects: projectsReducer,
  demo: demoReducer,
  todo: todosReducer, //education
  employ: employmentReducer,
  expert: expertReducer,
  link: linkReducer,
  portfolio: portfolioReducer,
  milestone: milestoneReducer,
  chat: chatReducer,
  notification: AppNotification,
});

export default rootReducer;
