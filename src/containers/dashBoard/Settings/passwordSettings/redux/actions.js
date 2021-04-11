import {
  UPDATE_PASSWORD_ACTION,
  UPDATE_PASSWORD_FAILURE_ACTION,
  UPDATE_PASSWORD_SUCCESS_ACTION,
} from './types';

export const updatePasswordAction = ({
  id,
  token,
  password,
  new_password,
  confirm_new_password,
}) => ({
  type: UPDATE_PASSWORD_ACTION,
  payload: {
    id: id,
    access_token: token,
    details: {
      password: password,
      new_password: new_password,
      confirm_new_password: confirm_new_password,
    },
  },
});

export const updatePasswordSuccessAction = (data) => ({
  type: UPDATE_PASSWORD_SUCCESS_ACTION,
  payload: data,
});

export const updatePasswordFailureAction = (error) => ({
  type: UPDATE_PASSWORD_FAILURE_ACTION,
  payload: error,
});
