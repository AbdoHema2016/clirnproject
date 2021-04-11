import {
  GET_TEMPERATURE_HISTORY,
  GET_TEMPERATURE_HISTORY_SUCCESS,
  GET_TEMPERATURE_HISTORY_FAILURE,
  UPDATE_TEMPERATURE_HISTORY_MODAL_INDEX_ACTION,
} from './types';
import {RESET_STORE_TO_INITIAL_STATE_ACTION} from '../../redux/types';
import {Constants} from '../../../../../utilities';

const {profileModals} = Constants;

let initialState = {
  modalIndex: profileModals.feelingUpdateModal,
  loading: false,
  temperatureHistory: [],
  error: '',
};

export const temperatureHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_STORE_TO_INITIAL_STATE_ACTION:
      return initialState;

    case GET_TEMPERATURE_HISTORY:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case GET_TEMPERATURE_HISTORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_TEMPERATURE_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        temperatureHistory: action.payload,
        error: '',
      };
    case UPDATE_TEMPERATURE_HISTORY_MODAL_INDEX_ACTION:
      return {
        ...state,
        modalIndex: action.payload,
      };
    default:
      return {...state};
  }
};
