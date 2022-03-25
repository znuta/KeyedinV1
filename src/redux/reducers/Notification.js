import {HIDE_NOTIFICATION, SHOW_NOTIFICATION} from 'src/redux/action-types';

const initialState = {};

export const AppNotification = (state = initialState, action) => {
  switch (action.type) {
    case HIDE_NOTIFICATION:
      return {};
    case SHOW_NOTIFICATION:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};