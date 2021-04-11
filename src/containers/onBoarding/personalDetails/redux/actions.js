import {
  EDIT_PERSONALDETAILS_ACTION,
  MISSING_FILEDS_ACTION,
  PERSONAL_DETAILS_FAILURE_ACTION,
  PERSONAL_DETAILS_SUCCESS_ACTION,
  ADD_PERSONAL_DETAILS_ACTION,
  PERSONAL_DETAILS_ACCESS_TOKEN_ACTION,
  SIGNUP_STEP_ACTION,
  STORE_USERID_ACTION,
} from './types';

export const addPersonalDetailsAction = (details) => {
  return {
    type: ADD_PERSONAL_DETAILS_ACTION,
    payload: details,
  };
};

export const storeAccessTokenAction = (token) => {
  return {
    type: PERSONAL_DETAILS_ACCESS_TOKEN_ACTION,
    payload: token,
  };
};

export const signUpStepAction = (step) => {
  return {
    type: SIGNUP_STEP_ACTION,
    payload: step,
  };
};

export const editPersonalDetailsAction = (details) => {
  return {
    type: EDIT_PERSONALDETAILS_ACTION,
    payload: details,
  };
};

export const missingFieldsAction = (status) => {
  return {
    type: MISSING_FILEDS_ACTION,
    payload: status,
  };
};

export const personalDetailsSuccessAction = (response) => {
  return {
    type: PERSONAL_DETAILS_SUCCESS_ACTION,
    payload: response,
  };
};

export const personalDetailsFailureAction = (error) => {
  return {
    type: PERSONAL_DETAILS_FAILURE_ACTION,
    payload: error,
  };
};

export const storeUserIdInPersonalDetailsAction = (id) => {
  return {
    type: STORE_USERID_ACTION,
    payload: id,
  };
};
