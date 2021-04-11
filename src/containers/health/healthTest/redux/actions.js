import {
  EDIT_TEST_FIELDS_ACTION,
  TEST_DATA_API_FAILURE,
  TEST_DATA_API_SUCCESS,
  SUBMIT_TEST_DATA_ACTION,
  ADD_TEST_FIELDS_ACTION,
  UPDATE_TEST_FIELD_TYPE_AND_INDEX_ACTION,
  CHECK_MISSING_FIELDS_ACTION,
  DELETE_TEST_DETAIL_ROW_ACTION,
  CHECK_MISSING_FIELDS_IN_TESTOBJECT_ACTION,
  SAVE_TEST_DETAIL_FROM_API_ACTION,
  UPLOAD_HEALTH_TEST_IMAGE_ACTION,
  UPLOAD_HEALTH_TEST_IMAGE_FAILURE_ACTION,
  EDIT_HEALTH_TEST_DATA_AFTER_IMAGE_UPLOAD_ACTION,
  UPDATE_MISSING_FIELD_ACTION,
  UPDATE_TEST_ACTION,
  UPDATE_TEST_SUCCESS,
  UPDATE_TEST_FAILURE,
} from './types';
import {Platform} from 'react-native';

export const editHealthDataAction = (data) => ({
  type: EDIT_TEST_FIELDS_ACTION,
  payload: data,
});

export const saveTestDetailsFromAPIAction = (data) => ({
  type: SAVE_TEST_DETAIL_FROM_API_ACTION,
  payload: data,
});

export const updateTypeAndIndexAction = (data) => ({
  type: UPDATE_TEST_FIELD_TYPE_AND_INDEX_ACTION,
  payload: data,
});

export const deleteTestDetailRowAction = (index) => ({
  type: DELETE_TEST_DETAIL_ROW_ACTION,
  payload: index,
});

export const addHealthDataFieldsAction = (data) => ({
  type: ADD_TEST_FIELDS_ACTION,
  payload: data,
});

export const checkMissingFieldsAction = (data) => ({
  type: CHECK_MISSING_FIELDS_ACTION,
  payload: data,
});

export const checkMissingFieldsInTestObjectAction = () => ({
  type: CHECK_MISSING_FIELDS_IN_TESTOBJECT_ACTION,
});

export const submitHealthTestDataAction = (data, token, userID, via) => ({
  type: SUBMIT_TEST_DATA_ACTION,
  payload: {
    data: data,
    token: token,
    userID: userID,
    via: via,
    device: Platform.OS,
  },
});

export const updateHealthDataAction = (data) => ({
  type: UPDATE_TEST_ACTION,
  payload: data,
});

export const testApiSuccessAction = (feeling) => ({
  type: TEST_DATA_API_SUCCESS,
  payload: feeling,
});

export const testApiFailureAction = (error) => ({
  type: TEST_DATA_API_FAILURE,
  payload: error,
});

export const updateTestSuccessAction = () => ({
  type: UPDATE_TEST_SUCCESS,
});

export const updateTestFailureAction = (error) => ({
  type: UPDATE_TEST_FAILURE,
  payload: error,
});

export const storeTokenAction = (error) => ({
  type: TEST_DATA_API_FAILURE,
  payload: error,
});

export const uploadImageAction = (data, token, userID, docType, index) => ({
  type: UPLOAD_HEALTH_TEST_IMAGE_ACTION,
  payload: {data, token, userID, docType, index},
});

export const uploadImageFailureAction = (data) => ({
  type: UPLOAD_HEALTH_TEST_IMAGE_FAILURE_ACTION,
  payload: data,
});

export const uploadHealthTestAction = (data, index) => ({
  type: EDIT_HEALTH_TEST_DATA_AFTER_IMAGE_UPLOAD_ACTION,
  payload: {data: data, index: index},
});

export const updateMissingFieldAction = (index) => ({
  type: UPDATE_MISSING_FIELD_ACTION,
  payload: index,
});
