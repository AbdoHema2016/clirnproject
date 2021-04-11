import {
  APPROVE_HEALTH_TEST_ACTION,
  APPROVE_HEALTH_TEST_SUCCESS_ACTION,
  APPROVE_HEALTH_TEST_FAILURE_ACTION,
} from './types';
let initialState = {
  loading: false,
  error: '',
};

export const otherUserProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPROVE_HEALTH_TEST_ACTION:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case APPROVE_HEALTH_TEST_SUCCESS_ACTION:
      return {
        ...state,
        loading: false,
        error: '',
      };
    case APPROVE_HEALTH_TEST_FAILURE_ACTION:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
