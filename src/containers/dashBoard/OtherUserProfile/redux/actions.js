import {
  APPROVE_HEALTH_TEST_ACTION,
  APPROVE_HEALTH_TEST_SUCCESS_ACTION,
  APPROVE_HEALTH_TEST_FAILURE_ACTION,
} from './types';

export const approveHealthTestAction = (data) => ({
  type: APPROVE_HEALTH_TEST_ACTION,
  payload: data,
});

export const approveHealthTestActionSuccess = () => ({
  type: APPROVE_HEALTH_TEST_SUCCESS_ACTION,
});
export const approveHealthTestActionFail = (error) => ({
  type: APPROVE_HEALTH_TEST_FAILURE_ACTION,
  payload: error,
});
