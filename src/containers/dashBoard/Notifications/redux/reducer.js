import {
  NOTIFICATIONS_FAILURE_ACTION,
  NOTIFICATIONS_SUCCESS_ACTION,
  GET_NOTIFICATIONS_ACTION,
  DELETE_NOTIFICATIONS_ACTION,
  DELETE_NOTIFICATIONS_FAILURE_ACTION,
  DELETE_NOTIFICATIONS_SUCCESS_ACTION,
  CHANGE_NOTIFICATION_STATUS_ACTION,
} from './types';

import {RESET_STORE_TO_INITIAL_STATE_ACTION} from '../../Settings/redux/types';
let initialState = {
  loading: false,
  notificationsList: [],
  notificationIdToBeDeleted: null,
  error: '',
};

export const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_STORE_TO_INITIAL_STATE_ACTION:
      return initialState;

    case GET_NOTIFICATIONS_ACTION:
      return {
        ...state,
        missingFields: action.payload,
        loading: true,
        error: '',
      };
    case NOTIFICATIONS_SUCCESS_ACTION:
      return {
        ...state,
        notificationsList: action.payload,
        loading: false,
        error: '',
      };
    case NOTIFICATIONS_FAILURE_ACTION:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_NOTIFICATIONS_ACTION:
      return {
        ...state,
        notificationIdToBeDeleted: action.payload,
        error: '',
      };
    case DELETE_NOTIFICATIONS_FAILURE_ACTION:
      return {
        ...state,
        error: '',
      };
    case DELETE_NOTIFICATIONS_SUCCESS_ACTION:
      return {
        ...state,
        error: '',
      };
    case CHANGE_NOTIFICATION_STATUS_ACTION:
      return {
        ...state,
        notificationsList: action.payload,
        error: '',
      };
    default:
      return {...state};
  }
};
