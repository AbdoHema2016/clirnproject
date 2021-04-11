import {
  SEND_OTP_ACTION,
  EDIT_OTP_ACTION,
  OTP_FAILURE_ACTION,
  OTP_SUCCESS_ACTION,
  RESEND_OTP_SUCCESS_ACTION,
  RESEND_OTP_FAILURE_ACTION,
  RESEND_OTP_ACTION,
  RESET_OTP_TO_INITIAL_STATE,
} from './types';

export const sendOtpAction = (otp, token, step) => ({
  type: SEND_OTP_ACTION,
  payload: {otp: otp, token: token, step: step},
});

export const resendOtpAction = (token) => ({
  type: RESEND_OTP_ACTION,
  payload: token,
});

export const resetOtpAction = () => ({
  type: RESET_OTP_TO_INITIAL_STATE,
  payload: '',
});

export const editOtpAction = (otp) => ({
  type: EDIT_OTP_ACTION,
  payload: otp,
});

export const otpSuccessAction = (otp) => ({
  type: OTP_SUCCESS_ACTION,
  payload: otp,
});

export const otpFailureAction = (error) => ({
  type: OTP_FAILURE_ACTION,
  payload: error,
});

export const resendOtpSuccessAction = (error) => ({
  type: RESEND_OTP_SUCCESS_ACTION,
  payload: error,
});

export const resendOtpFailureAction = (error) => ({
  type: RESEND_OTP_FAILURE_ACTION,
  payload: error,
});
