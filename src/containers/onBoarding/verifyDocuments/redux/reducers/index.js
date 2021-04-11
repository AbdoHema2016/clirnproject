import types from '../actions/types';
import {RESET_STORE_TO_INITIAL_STATE_ACTION} from '../../../../dashBoard/Settings/redux/types';
const initialState = {
  apiSecret: null,
  apiToken: null,
  dataCenter: null,
  loading: true,
  error: null,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case RESET_STORE_TO_INITIAL_STATE_ACTION:
      return initialState;
    case types.GET_JUMIO_CREDENTIALS_REQUESTED:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_JUMIO_CREDENTIALS_SUCCEEDED:
      return {
        ...state,
        apiSecret: payload.apiSecret,
        apiToken: payload.apiToken,
        dataCenter: payload.dataCenter,
        loading: false,
        error: null,
      };
    case types.GET_JUMIO_CREDENTIALS_FAILED:
      return {...state, loading: false, error: payload.error};

    default:
      return state;
  }
};
