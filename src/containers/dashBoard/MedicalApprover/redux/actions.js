import {
  BECOME_MEDICAL_APPROVER,
  BECOME_MEDICAL_APPROVER_SUCCESS_ACTION,
  BECOME_MEDICAL_APPROVER_FAILURE_ACTION,
} from './types';

export const becomeMedicalApproverAction = (data) => ({
  type: BECOME_MEDICAL_APPROVER,
  payload: data,
});

export const becomeMedicalApproverSuccessAction = () => ({
  type: BECOME_MEDICAL_APPROVER_SUCCESS_ACTION,
});

export const becomeMedicalApproverFailureAction = (error) => ({
  type: BECOME_MEDICAL_APPROVER_FAILURE_ACTION,
  payload: error,
});
