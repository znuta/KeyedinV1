import {
  SEND_OTP,
  SEND_OTP_SUCCESS,
  SEND_OTP_ERROR,
  SET_USER_DETAILS,
  SET_LOADING,
  SAVE_TOKEN,
  SAVE_AVATAR,
  SAVE_GOVID,
  COMPLETE_REGISTRATION,
  SET_EDUCATION_DETAILS,
  SET_EXPERT_DETAILS,
  SET_RATE_DETAILS,
  SAVE_ID,
  SET_CATEGORY,
  LOGGED_IN,
  LOGOUT,
  SET_LOCATION,
  SET_DISTANCE,
  SAVE_BALANCE,
  GET_ALL_JOBS,
  SET_ALL_CATEGORIES,
  SET_EXPERIENCE_DETAILS,
} from "../action-types";

const INITIAL_STATE = {
  hasAccount: false,
  loading: false,
  error: null,
  otpSuccess: null,
  allJobs: false,
  userData: {
    first_name: "",
    last_name: "",
    type: "Artisan",
    email: "",
    password: "",
    password_confirmation: "",
    city_id: 0,
    state_id: 0,
    country_id: 0,
    phone: "",
    category_id: null,
    verified: false,
  },
  educationData: [],
  token: "",
  user_id: "",
  avatar: "",
  govId: "",
  regComplete: false,
  verified: false,
  category: "",
  expertise: {
    bio: "",
    core_skill: "",
    serviceCategory: "",
    level: "",
  },
  rates: {
    rate: "",
    rateAmount: "",
  },
  distance: "700",
  location: {
    lng: "",
    lat: "",
  },
  wallet_balance: "",
  allCategories: [],
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEND_OTP:
      console.log("To send OTP");
      return {
        ...state,
        loading: true,
      };
    case SEND_OTP_SUCCESS:
      console.log("OTP Success", action);
      return {
        ...state,
        loading: false,
        userData: {
          ...state.userData,
          phone: action.phone,
        },
      };
    case SEND_OTP_ERROR:
      console.log("OTP Failed");
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case SET_LOCATION:
      console.log("Location sent");
      return {
        ...state,
        location: {
          lng: action.data.lng,
          lat: action.data.lat,
        },
      };
    
    case SET_USER_DETAILS:
      console.log("sending user data...", action);
      return {
        ...state,
        loading: false,
        userData: {
          ...state.userData,
          ...action.data
        },
      };
    
      // case "API_SCHOOL_DATA":
      //   console.log("sending user data...", action);
      //   return {
      //     ...state,
      //     loading: false,
      //     educationData: [
      //       ...state.educationData,
      //       ...action.data,
      //     ],
      //   };
    
    case SET_EXPERT_DETAILS:
      console.log("sending user data...");
      return {
        ...state,
        expertise: {
          ...state.expertise,
          ...action.data,
        },
      };
    case SET_RATE_DETAILS:
      console.log("sending user data...");
      return {
        ...state,
        //loading: false,
        rates: {
          ...state.rates,
          rate: action.data.rate,
          rateAmount: action.data.rateAmount,
        },
      };
    case SET_EDUCATION_DETAILS:
      return {
        ...state,
        education: action.data,
      };
    case SET_EXPERIENCE_DETAILS:
      return {
        ...state,
        experience: action.data,
      };
    case SET_LOADING:
      // console.log("Loading,...");
      return {
        ...state,
        loading: action.status,
      };
    case GET_ALL_JOBS:
      // console.log("Loading,...");
      return {
        ...state,
        allJobs: action.status,
      };
    case SET_ALL_CATEGORIES:
      // console.log("Loading,...");
      return {
        ...state,
        allCategories: action.payload,
      };
    case SET_CATEGORY:
      // console.log("Loading,...");
      return {
        ...state,
        category: action.category,
      };
    case SAVE_TOKEN:
      console.log("Saving Token...");
      return {
        ...state,
        //isLoggedIn: true,
        token: action.token,
      };
    case SAVE_ID:
      console.log("Saving Id...");
      return {
        ...state,
        //isLoggedIn: true,
        user_id: action._id,
      };
    case SAVE_BALANCE:
      console.log("Saving Id...");
      return {
        ...state,
        wallet_balance: action.data,
      };
    case SAVE_AVATAR:
      console.log("Saving User Avatar");
      return {
        ...state,
        loading: false,
        avatar: action.filepath,
      };
    case SAVE_GOVID:
      console.log("Saving User Gov Issued ID");
      return {
        ...state,
        loading: false,
        govId: action.filepath,
      };
    case "SAVE_EXPERTISE":
      console.log("Saving User Expertise");
      return {
        ...state,
        loading: false,
        expertise: action.data,
      };
    case COMPLETE_REGISTRATION:
      console.log("Completing reg...");
      return {
        ...state,
        loading: false,
        regComplete: action.status,
      };
    case SET_DISTANCE:
      console.log("Completing reg...");
      return {
        ...state,
        distance: action.value,
      };
    case LOGGED_IN:
      console.log("Login ...");
      return {
        ...state,
        loading: false,
        hasAccount: action.status,
      };
    case "VERIFIED":
      console.log("Verified...");
      return {
        ...state,
        verified: action.status,
      };
    // case LOGOUT:
    //   console.log("Logging out ...");
    //   return {
    //     ...state,
    //     hasAccount: true,
    //     regComplete: false,
    //   };
    // case LOGOUT:
      // console.log("Logging out ...");
      // return {
      //   ...INITIAL_STATE,
      //   hasAccount: true,
      //   regComplete: false,
      // };
    default:
      return state;
  }

  return state;
};

export const getOTPError = (state) => state.error;
export const getOTPSuccess = (state) => state.otpSuccess;
export const getLoading = (state) => state.loading;
export const getUserData = () => INITIAL_STATE.userData;
export const getEducationData = () => INITIAL_STATE.educationData;

export const getAvatar = () => {
  return INITIAL_STATE.avatar;
};
export const getGovId = () => {
  return INITIAL_STATE.govId;
};

export default authReducer;
