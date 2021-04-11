import {
  GET_VACCINATIONS_ACTION,
  VACCINATIONS_SUCCESS_ACTION,
  VACCINATIONS_FAIL_ACTION,
  DELETE_VACCINE_ACTION,
  DELETE_VACCINE_SUCCESS_ACTION,
  DELETE_VACCINE_FAIL_ACTION,
  UPLOAD_VACCINE_IMAGE,
  UPLOAD_VACCINE_IMAGE_FAILURE,
  UPLOAD_VACCINE_DETAILS,
  UPLOAD_VACCINE_IMAGE_SUCCESS,
  RESET_VACCINE_DETAILS,
  UPLOAD_VACCINE_DETAILS_FAILURE,
  UPLOAD_VACCINE_DETAILS_SUCCESS,
  EDIT_VACCINE_DETAILS,
  EDIT_VACCINE_DETAILS_FAILURE,
  EDIT_VACCINE_DETAILS_SUCCESS,
  SHOW_VACCINE_MODAL_ACTION,
  SET_VACCINE_FIELDS_TO_BE_EDITED,
  SET_VACCINE_NAME_ACTION,
  SET_VACCINE_CENTRE_ACTION,
  SET_VACCINE_ADD_DATE_ACTION,
  SET_VACCINE_EXPIRE_DATE_ACTION,
  SET_VACCINE_DOCUMENT_ACTION,
  GET_VACCINE_DETAILS_ACTION,
  GET_VACCINE_DETAILS_FAILURE_ACTION,
  GET_VACCINE_DETAILS_SUCCESS_ACTION,
  REVIEW_VACCINE_ACTION,
  REVIEW_VACCINE_FAILURE_ACTION,
  REVIEW_VACCINE_SUCCESS_ACTION,
  GET_VACCINE_TYPES_ACTION,
  SET_VACCINE_TYPES_SUCCESS_ACTION,
  GET_VACCINE_TYPES_FAILURE_ACTION,
} from './types';

export const getVaccinationAction = () => ({
  type: GET_VACCINATIONS_ACTION,
});

export const vaccinationActionSuccess = (data) => ({
  type: VACCINATIONS_SUCCESS_ACTION,
  payload: data,
});

export const vaccinationActionFail = (error) => ({
  type: VACCINATIONS_FAIL_ACTION,
  payload: error,
});

export const deleteVaccineAction = (payload) => ({
  type: DELETE_VACCINE_ACTION,
  payload,
});
export const deleteVaccineSuccess = () => ({
  type: DELETE_VACCINE_SUCCESS_ACTION,
});
export const deleteVaccineFail = (error) => ({
  type: DELETE_VACCINE_FAIL_ACTION,
  payload: error,
});
export const uploadVaccineImageAction = (data, token, userID, docType, cb) => ({
  type: UPLOAD_VACCINE_IMAGE,
  payload: {data, token, userID, docType, cb},
});

export const uploadImageFailureAction = (data) => ({
  type: UPLOAD_VACCINE_IMAGE_FAILURE,
  payload: data,
});

export const uploadImageSuccessAction = (data) => ({
  type: UPLOAD_VACCINE_IMAGE_SUCCESS,
  payload: data,
});

export const uploadVaccineDetailsAction = (data) => ({
  type: UPLOAD_VACCINE_DETAILS,
  payload: data,
});

export const uploadVaccineDetailsSuccessAction = (data) => ({
  type: UPLOAD_VACCINE_DETAILS_SUCCESS,
  payload: data,
});

export const uploadVaccineDetailsFailureAction = (data) => ({
  type: UPLOAD_VACCINE_DETAILS_FAILURE,
  payload: data,
});

export const editVaccineDetailsAction = (data) => ({
  type: EDIT_VACCINE_DETAILS,
  payload: data,
});

export const editVaccineDetailsSuccessAction = (data) => ({
  type: EDIT_VACCINE_DETAILS_SUCCESS,
  payload: data,
});

export const editVaccineDetailsFailureAction = (data) => ({
  type: EDIT_VACCINE_DETAILS_FAILURE,
  payload: data,
});
export const resetDetailsAction = () => ({
  type: RESET_VACCINE_DETAILS,
});

export const showVaccineModalAction = (status) => ({
  type: SHOW_VACCINE_MODAL_ACTION,
  payload: status,
});
export const setVaccineFieldsToBeEditedAction = (data) => ({
  type: SET_VACCINE_FIELDS_TO_BE_EDITED,
  payload: data,
});
export const setVaccineNameAction = (name) => ({
  type: SET_VACCINE_NAME_ACTION,
  payload: name,
});
export const setVaccineCentreNameAction = (data) => ({
  type: SET_VACCINE_CENTRE_ACTION,
  payload: data,
});
export const setVaccineAddDateAction = (data) => ({
  type: SET_VACCINE_ADD_DATE_ACTION,
  payload: data,
});
export const setVaccineExpireDateAction = (data) => ({
  type: SET_VACCINE_EXPIRE_DATE_ACTION,
  payload: data,
});
export const setVaccineDocumentAction = (data) => ({
  type: SET_VACCINE_DOCUMENT_ACTION,
  payload: data,
});
export const getVaccineDetailsAction = (data) => ({
  type: GET_VACCINE_DETAILS_ACTION,
  payload: data,
});
export const getVaccineDetailsSuccessAction = (data) => ({
  type: GET_VACCINE_DETAILS_SUCCESS_ACTION,
  payload: data,
});
export const getVaccineDetailsFailureAction = (error) => ({
  type: GET_VACCINE_DETAILS_FAILURE_ACTION,
  payload: error,
});
export const reviewVaccineAction = (data) => ({
  type: REVIEW_VACCINE_ACTION,
  payload: data,
});
export const reviewVaccineSuccessAction = (data) => ({
  type: REVIEW_VACCINE_SUCCESS_ACTION,
  payload: data,
});
export const reivewVaccineFailureAction = (error) => ({
  type: REVIEW_VACCINE_FAILURE_ACTION,
  payload: error,
});

export const getVaccineTypesAction = () => ({
  type: GET_VACCINE_TYPES_ACTION,
});
export const setVaccineTypesSuccessAction = (data) => ({
  type: SET_VACCINE_TYPES_SUCCESS_ACTION,
  payload: data,
});
export const getVaccineTypesFailureAction = (error) => ({
  type: GET_VACCINE_TYPES_FAILURE_ACTION,
  payload: error,
});
