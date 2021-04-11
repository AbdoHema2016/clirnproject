import {
  UPDATE_CONTACT_DETAILS_ACTION,
  UPDATE_CONTACT_DETAILS_FAILURE_ACTION,
  UPDATE_CONTACT_DETAILS_SUCCESS_ACTION,
  SET_PERSONAL_DETAILS,
  GET_CONTACT_DETAILS,
  GET_CONTACT_DETAILS_FAILURE,
  GET_CONTACT_DETAILS_SUCCESS,
} from './types';

export const updateContactDetailsAction = (details, id, token) => ({
  type: UPDATE_CONTACT_DETAILS_ACTION,
  payload: {details: details, id: id, access_token: token},
});

export const updateContactDetailsSuccessAction = (data) => ({
  type: UPDATE_CONTACT_DETAILS_SUCCESS_ACTION,
  payload: data,
});

export const updateContactDetailsFailureAction = (error) => ({
  type: UPDATE_CONTACT_DETAILS_FAILURE_ACTION,
  payload: error,
});

export const setPersonalDetails = (details) => ({
  type: SET_PERSONAL_DETAILS,
  payload: details,
});

export const getContactDetails = (details) => ({
  type: GET_CONTACT_DETAILS,
  payload: details,
});

export const getContactDetailsSuccess = (data) => ({
  type: GET_CONTACT_DETAILS_SUCCESS,
  payload: data,
});

export const getContactDetailsFailure = (error) => ({
  type: GET_CONTACT_DETAILS_FAILURE,
  payload: error,
});
