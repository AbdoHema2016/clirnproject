import {
  GET_HEALTH_TESTS_ACTION,
  HEALTH_TEST_SUCCESS_ACTION,
  HEALTH_TEST_FAIL_ACTION,
  HEALTH_TEST_ID,
  HEALTH_TEST_DETAILS_ACTION,
  HEALTH_TEST_DETAILS_SUCCESS_ACTION,
  HEALTH_TEST_DETAILS_FAILURE_ACTION,
  HEALTH_TEST_DELETE_ACTION,
  HEALTH_TEST_DELETE_SUCCESS_ACTION,
  HEALTH_TEST_DELETE_FAILURE_ACTION,
  EDIT_REJECTED_HEALTH_TEST_IMAGE_ACTION,
  EDIT_REJECTED_HEALTH_TEST_IMAGE_FAILURE_ACTION,
  EDIT_REJECTED_HEALTH_TEST_IMAGE_SUCCESS_ACTION,
} from './types';

export const getHealthTestsAction = (token) => ({
  type: GET_HEALTH_TESTS_ACTION,
  payload: {access_token: token},
});

export const healthTestActionSuccess = (data) => ({
  type: HEALTH_TEST_SUCCESS_ACTION,
  payload: data,
});

export const healthTestActionFail = (error) => ({
  type: HEALTH_TEST_FAIL_ACTION,
  payload: error,
});

export const updateHealthTestIDAction = (TestID) => ({
  type: HEALTH_TEST_ID,
  payload: TestID,
});

export const healthTestDetailsAction = (data) => ({
  type: HEALTH_TEST_DETAILS_ACTION,
  payload: data,
});

export const healthTestDetailsActionFail = (error) => ({
  type: HEALTH_TEST_DETAILS_FAILURE_ACTION,
  payload: error,
});

export const healthTestDetailsActionSuccess = (data) => ({
  type: HEALTH_TEST_DETAILS_SUCCESS_ACTION,
  payload: data,
});

export const healthTestDeleteAction = (data) => ({
  type: HEALTH_TEST_DELETE_ACTION,
  payload: data,
});

export const healthTestDeleteActionFail = (error) => ({
  type: HEALTH_TEST_DELETE_FAILURE_ACTION,
  payload: error,
});

export const healthTestDeleteActionSuccess = (data) => ({
  type: HEALTH_TEST_DELETE_SUCCESS_ACTION,
  payload: data,
});

export const editRejectedHealTestImageAction = (data) => ({
  type: EDIT_REJECTED_HEALTH_TEST_IMAGE_ACTION,
  payload: data,
});

export const editRejectedHealTestImageSuccessAction = (data) => ({
  type: EDIT_REJECTED_HEALTH_TEST_IMAGE_SUCCESS_ACTION,
  payload: data,
});

export const editRejectedHealTestImageFailureAction = (error) => ({
  type: EDIT_REJECTED_HEALTH_TEST_IMAGE_FAILURE_ACTION,
  payload: error,
});
