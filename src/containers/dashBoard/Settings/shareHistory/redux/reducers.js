import {
  GET_SHARE_HISTORY_ACTION,
  SHARE_HISTORY_FAILURE_ACTION,
  SHARE_HISTORY_SUCCESS_ACTION,
} from './types';
import {RESET_STORE_TO_INITIAL_STATE_ACTION} from '../../redux/types';
let initialState = {
  loading: false,
  shareHistory: [],
  error: '',
};

export const shareHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_STORE_TO_INITIAL_STATE_ACTION:
      return initialState;

    case GET_SHARE_HISTORY_ACTION:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case SHARE_HISTORY_SUCCESS_ACTION:
      return {
        ...state,
        shareHistory: action.payload,
        loading: false,
        error: '',
      };
    case SHARE_HISTORY_FAILURE_ACTION:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return {...state};
  }
};
