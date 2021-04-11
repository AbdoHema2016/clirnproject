import {
  SELECT_TEMP_TYPE_ACTION,
  SELECT_TEMP_INT_ACTION,
  SELECT_TEMP_DEC_ACTION,
  SEND_TEMP_SUCCESS_ACTION,
  SEND_TEMP_FAILURE_ACTION,
  SEND_TEMP_ACTION,
  TEMP_SKIPPED_ACTION,
} from './types';
import {RESET_STORE_TO_INITIAL_STATE_ACTION} from '../../../dashBoard/Settings/redux/types';
import {temperatureDefaultValues} from '../../../../utilities';

const {celsius} = temperatureDefaultValues;

let initialState = {
  tempType: '°C',
  tempIntValue: celsius,
  tempDecValue: '',
  celciusDegrees: ['34', '35', '36', '37', '38', '39', '40', '41', '42'],
  fahrenheit: [
    '93',
    '94',
    '95',
    '96',
    '97',
    '98',
    '99',
    '100',
    '101',
    '102',
    '103',
    '104',
    '105',
    '106',
    '107',
    '108',
  ],
  decimalPart: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  loading: false,
  error: '',
  id: '',
  skip: false,
};

export const selectTempTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_STORE_TO_INITIAL_STATE_ACTION:
      return initialState;
    case SELECT_TEMP_TYPE_ACTION:
      return {
        ...state,
        tempType: action.payload.type,
        tempIntValue: action.payload.int,
        tempDecValue: action.payload.dec,
        loading: false,
        error: '',
      };
    case SEND_TEMP_ACTION:
      return {
        ...state,
        loading: true,
        error: '',
        skip: false,
      };
    case SELECT_TEMP_INT_ACTION:
      return {
        ...state,
        tempIntValue: action.payload,
        loading: false,
        error: '',
      };
    case SELECT_TEMP_DEC_ACTION:
      return {
        ...state,
        tempDecValue: action.payload,
        loading: false,
        error: '',
      };
    case SEND_TEMP_SUCCESS_ACTION:
      return {
        ...state,
        loading: false,
        id: action.payload.data.id,
        skip: false,
        error: '',
      };
    case SEND_TEMP_FAILURE_ACTION:
      return {
        ...state,
        loading: false,
        error: action.payload,
        skip: false,
      };
    case TEMP_SKIPPED_ACTION:
      return {
        ...state,
        skip: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
