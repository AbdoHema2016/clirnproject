import {
  EDIT_EMAIL_FOR_FORGOTTEN_PASSWORD_ACTION,
  FORGOTTEN_PASSWORD_ACTION,
  FORGOTTEN_PASSWORD_SUCCESS_ACTION,
  FORGOTTEN_PASSWORD_FAILURE_ACTION,
} from './types';

export const forgottenPasswordAction = (email) => ({
  type: FORGOTTEN_PASSWORD_ACTION,
  payload: email,
});

export const addEmailAction = (email, status) => ({
  type: EDIT_EMAIL_FOR_FORGOTTEN_PASSWORD_ACTION,
  payload: {email: email, status: status},
});

export const forgottenPassworSuccessdAction = () => ({
  type: FORGOTTEN_PASSWORD_SUCCESS_ACTION,
});

export const forgottenPasswordFailureAction = (error) => ({
  type: FORGOTTEN_PASSWORD_FAILURE_ACTION,
  payload: error,
});
