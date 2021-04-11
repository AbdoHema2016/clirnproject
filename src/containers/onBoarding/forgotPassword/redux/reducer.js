import {
  FORGOTTEN_PASSWORD_ACTION,
  FORGOTTEN_PASSWORD_SUCCESS_ACTION,
  FORGOTTEN_PASSWORD_FAILURE_ACTION,
} from './types';

let initialState = {
  loading: false,
};

export const forgottenPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOTTEN_PASSWORD_SUCCESS_ACTION:
      return {
        ...state,
        loading: false,
      };
    case FORGOTTEN_PASSWORD_ACTION:
      return {
        ...state,
        loading: true,
      };
    case FORGOTTEN_PASSWORD_FAILURE_ACTION:
      return {
        ...state,
        loading: false,
        error: action.payload.status,
      };
    default:
      return {
        ...state,
      };
  }
};
