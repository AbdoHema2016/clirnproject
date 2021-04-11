import {
  LOGOUT_ACTION,
  LOGOUT_FAILURE_ACTION,
  LOGOUT_SUCCESS_ACTION,
} from './types';

let initialState = {
  loading: false,
  error: '',
};

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT_ACTION:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_SUCCESS_ACTION:
      return {
        ...state,
        loading: false,
      };
    case LOGOUT_FAILURE_ACTION:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
