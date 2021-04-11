import {
  OTP_FAILURE_ACTION,
  OTP_SUCCESS_ACTION,
  EDIT_OTP_ACTION,
  SEND_OTP_ACTION,
  RESEND_OTP_FAILURE_ACTION,
  RESEND_OTP_SUCCESS_ACTION,
  RESET_OTP_TO_INITIAL_STATE,
  RESEND_OTP_ACTION,
} from './types';
import {RESET_STORE_TO_INITIAL_STATE_ACTION} from '../../../dashBoard/Settings/redux/types';

let initialState = {
  otp: '',
  loading: false,
  error: '',
};

export const otpReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_STORE_TO_INITIAL_STATE_ACTION:
      return initialState;
    case RESEND_OTP_ACTION:
      return initialState;
    case RESET_OTP_TO_INITIAL_STATE:
      return initialState;
    case SEND_OTP_ACTION:
      return {
        ...state,
        otp: action.payload,
        loading: true,
        error: '',
      };
    case EDIT_OTP_ACTION:
      return {
        ...state,
        otp: action.payload,
        loading: false,
        error: '',
      };
    case OTP_FAILURE_ACTION || RESEND_OTP_FAILURE_ACTION:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case OTP_SUCCESS_ACTION || RESEND_OTP_SUCCESS_ACTION:
      return {
        ...state,
        loading: false,
        error: '',
      };
    default:
      return {
        ...state,
      };
  }
};
