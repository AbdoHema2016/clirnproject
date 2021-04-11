import {
  SEND_PUBLIC_KEY,
  PUBLIC_KEY_CREATED,
  PUBLIC_KEY_CREATE_FAIL,
  BIOMETRIC_SIGN_ACTION,
  UPDATE_PUBLIC_KEY,
} from './types';
let initialState = {
  loading: false,
  error: '',
};

export const biometricReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_PUBLIC_KEY:
      return {
        ...state,
        loading: true,
      };
    case PUBLIC_KEY_CREATED:
      return {
        ...state,
        loading: false,
      };

    case PUBLIC_KEY_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case BIOMETRIC_SIGN_ACTION:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_PUBLIC_KEY:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
