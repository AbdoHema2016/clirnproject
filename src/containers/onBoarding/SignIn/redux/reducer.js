import {
  SIGN_IN_SUCCESS_ACTION,
  SIGN_IN_FAILURE_ACTION,
  DO_SIGN_IN_ACTION,
  TOKEN_STORED_ACTION,
  STORE_DEVICE_TOKEN_ACTION,
  REMOVE_TOKEN_ACTION,
  STORE_UDERID_ACTION,
} from './types';
import {RESET_STORE_TO_INITIAL_STATE_ACTION} from '../../../dashBoard/Settings/redux/types';
let initialState = {
  token: '',
  userID: '',
  deviceToken: '',
  loading: false,
};

export const SignInReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_STORE_TO_INITIAL_STATE_ACTION:
      return initialState;
    case SIGN_IN_SUCCESS_ACTION:
      return {
        ...state,
        loading: false,
      };
    case DO_SIGN_IN_ACTION:
      return {
        ...state,
        loading: true,
      };
    case STORE_UDERID_ACTION:
      return {
        ...state,
        userID: action.payload,
      };
    case SIGN_IN_FAILURE_ACTION:
      return {
        ...state,
        loading: false,
      };
    case TOKEN_STORED_ACTION:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        userID: action.payload.id,
      };
    case STORE_DEVICE_TOKEN_ACTION:
      return {
        ...state,
        loading: false,
        deviceToken: action.payload,
      };
    case REMOVE_TOKEN_ACTION:
      return {
        ...state,
        loading: false,
        token: null,
        userID: '',
      };
    default:
      return {
        ...state,
      };
  }
};
