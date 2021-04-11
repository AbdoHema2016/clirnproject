import {
  BECOME_MEDICAL_APPROVER,
  BECOME_MEDICAL_APPROVER_SUCCESS_ACTION,
  BECOME_MEDICAL_APPROVER_FAILURE_ACTION,
} from './types';

let initialState = {
  loading: false,
  error: '',
  approved: false,
};

export const becomeMedicalApproverReducer = (state = initialState, action) => {
  switch (action.type) {
    case BECOME_MEDICAL_APPROVER:
      return {
        ...state,
        loading: true,
      };
    case BECOME_MEDICAL_APPROVER_SUCCESS_ACTION:
      return {
        ...state,
        loading: false,
        approved: true,
      };

    case BECOME_MEDICAL_APPROVER_FAILURE_ACTION:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return {...state};
  }
};
