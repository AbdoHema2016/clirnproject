import {
  GET_HEALTH_TESTS_ACTION,
  HEALTH_TEST_SUCCESS_ACTION,
  HEALTH_TEST_FAIL_ACTION,
  HEALTH_TEST_ID,
  HEALTH_TEST_DETAILS_SUCCESS_ACTION,
  HEALTH_TEST_DETAILS_ACTION,
  HEALTH_TEST_DETAILS_FAILURE_ACTION,
  EDIT_REJECTED_HEALTH_TEST_IMAGE_FAILURE_ACTION,
  EDIT_REJECTED_HEALTH_TEST_IMAGE_SUCCESS_ACTION,
  EDIT_REJECTED_HEALTH_TEST_IMAGE_ACTION,
} from '../actions/types';
let initialState = {
  loading: false,
  healthTestsResults: [],
  error: '',
  healthTestID: 0,
  healthTestDetails: {},
};

export const healthTestResultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HEALTH_TESTS_ACTION:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case HEALTH_TEST_SUCCESS_ACTION:
      return {
        ...state,
        healthTestsResults: action.payload,
        loading: false,
        error: '',
      };
    case HEALTH_TEST_ID: {
      return {
        ...state,
        healthTestID: action.payload,
      };
    }
    case HEALTH_TEST_FAIL_ACTION:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case HEALTH_TEST_DETAILS_SUCCESS_ACTION:
      return {
        ...state,
        healthTestDetails: action.payload,
        loading: false,
        error: '',
      };
    case HEALTH_TEST_DETAILS_FAILURE_ACTION:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case HEALTH_TEST_DETAILS_ACTION:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case EDIT_REJECTED_HEALTH_TEST_IMAGE_ACTION:
      return {
        ...state,
        loading: true,
      };
    case EDIT_REJECTED_HEALTH_TEST_IMAGE_FAILURE_ACTION:
      return {
        ...state,
        loading: false,
        error: '',
      };
    case EDIT_REJECTED_HEALTH_TEST_IMAGE_SUCCESS_ACTION:
      return {
        ...state,
        loading: false,
        error: '',
      };
    default:
      return state;
  }
};
