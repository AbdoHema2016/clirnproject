import {
  CHECKIN_LIST_ACTION,
  CHECKIN_LIST_SUCCESS_ACTION,
  CHECKIN_LIST_FAILURE_ACTION,
} from './types';
import {RESET_STORE_TO_INITIAL_STATE_ACTION} from '../../Settings/redux/types';
let initialState = {
  loading: '',
  checkInList: [],
  error: '',
};

export const checkedInReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_STORE_TO_INITIAL_STATE_ACTION:
      return {
        ...initialState,
      };
    case CHECKIN_LIST_ACTION:
      return {
        ...state,
        loading: true,
      };
    case CHECKIN_LIST_SUCCESS_ACTION:
      return {
        ...state,
        loading: false,
        checkInList: action.payload?.data,
      };
    case CHECKIN_LIST_FAILURE_ACTION:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
