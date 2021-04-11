import {
  FEELING_SELECTED_ACTION,
  SEND_HEALTH_STAT_ACTION,
  FEELING_FAILURE_ACTION,
  FEELING_SUCCESS_ACTION,
  STORE_STAT_ID_ACTION,
  STAT_ID_SKIPPED_ACTION,
} from './type';
import {RESET_STORE_TO_INITIAL_STATE_ACTION} from '../../../dashBoard/Settings/redux/types';
let initialState = {
  feeling: {value: null, index: null},
  loading: false,
  error: '',
  id: '',
  skip: false,
};

export const feelingReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_STORE_TO_INITIAL_STATE_ACTION:
      return initialState;
    case FEELING_SELECTED_ACTION:
      return {
        ...state,
        feeling: {value: action.payload.value, index: action.payload.index},
        loading: false,
        error: '',
      };
    case SEND_HEALTH_STAT_ACTION:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case STORE_STAT_ID_ACTION:
      return {
        ...state,
        id: action.payload,
      };
    case FEELING_FAILURE_ACTION:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FEELING_SUCCESS_ACTION:
      return {
        ...state,
        id: action.payload.data.id,
        loading: false,
        error: '',
      };
    case STAT_ID_SKIPPED_ACTION:
      return {
        ...state,
        skip: action.payload,
        id: action.payload ? '' : state.id,
      };
    default:
      return {
        ...state,
      };
  }
};
