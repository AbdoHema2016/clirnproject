import {
  LOGOUT_ACTION,
  LOGOUT_FAILURE_ACTION,
  LOGOUT_SUCCESS_ACTION,
  RESET_STORE_TO_INITIAL_STATE_ACTION,
  DELETE_ACCOUNT_ACTION,
} from './types';

export const logoutAction = (data) => ({
  type: LOGOUT_ACTION,
  payload: data,
});

export const logoutSuccessAction = (data) => ({
  type: LOGOUT_SUCCESS_ACTION,
  payload: data,
});

export const logoutFailureAction = (error) => ({
  type: LOGOUT_FAILURE_ACTION,
  payload: error,
});

export const resetStoreToInitialState = () => ({
  type: RESET_STORE_TO_INITIAL_STATE_ACTION,
  payload: '',
});

export const deleteAccountAction = () => ({
  type: DELETE_ACCOUNT_ACTION,
});
