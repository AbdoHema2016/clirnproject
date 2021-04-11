import {
  UPDATE_PASSWORD_ACTION,
  UPDATE_PASSWORD_SUCCESS_ACTION,
  UPDATE_PASSWORD_FAILURE_ACTION,
} from './types';

let initialState = {
  loading: false,
  error: '',
};

export const changePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PASSWORD_ACTION:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PASSWORD_SUCCESS_ACTION:
      return {
        loading: false,
        error: '',
      };
    case UPDATE_PASSWORD_FAILURE_ACTION:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
