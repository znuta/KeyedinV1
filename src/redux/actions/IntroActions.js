import { SET_FIRST_LAUNCH } from "../action-types";

const setFirstLaunch = (status) => {
    return {
        type: SET_FIRST_LAUNCH,
        payload: status,
    }
};

export { setFirstLaunch };