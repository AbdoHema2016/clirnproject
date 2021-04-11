import {
  EDIT_CONTACT_DETAILS_ACTION,
  ADD_CONTACT_DETAILS_ACTION,
  POLICY_SERVICE_CHECKED_ACTION,
  MISSING_CONTACT_FILEDS_ACTION,
  CONTACT_DETAILS_FAILURE_ACTION,
  CONTACT_DETAILS_SUCCESS_ACTION,
  GET_COUNTRY_LIST_ACTION,
  GOT_COUNTRY_LIST_SUCCESS_ACTION,
  GOT_COUNTRY_LIST_FAILURE_ACTION,
} from './types';

export const addContactDetailsAction = (details, id, access_token) => ({
  type: ADD_CONTACT_DETAILS_ACTION,
  payload: {details, id, access_token},
});

export const getCountryListAction = () => ({
  type: GET_COUNTRY_LIST_ACTION,
});

export const gotCountryListSuccessAction = (list) => ({
  type: GOT_COUNTRY_LIST_SUCCESS_ACTION,
  payload: list,
});

export const gotCountryListFailurAction = (list) => ({
  type: GOT_COUNTRY_LIST_FAILURE_ACTION,
  payload: list,
});

export const editContactDetailsAction = (details) => ({
  type: EDIT_CONTACT_DETAILS_ACTION,
  payload: details,
});

export const missingContactFieldsAction = (status) => ({
  type: MISSING_CONTACT_FILEDS_ACTION,
  payload: status,
});

export const contactDetailsSuccessAction = (response) => ({
  type: CONTACT_DETAILS_SUCCESS_ACTION,
  payload: response,
});

export const contactDetailsFailureAction = (error) => ({
  type: CONTACT_DETAILS_FAILURE_ACTION,
  payload: error,
});

export const privacyPolicyCheck = (status) => ({
  type: POLICY_SERVICE_CHECKED_ACTION,
  payload: status,
});
