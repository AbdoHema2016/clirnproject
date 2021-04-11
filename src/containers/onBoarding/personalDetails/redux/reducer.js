import {
  EDIT_PERSONALDETAILS_ACTION,
  MISSING_FILEDS_ACTION,
  MY_LOCATION_ACTION,
  PERSONAL_DETAILS_FAILURE_ACTION,
  PERSONAL_DETAILS_SUCCESS_ACTION,
  ADD_PERSONAL_DETAILS_ACTION,
  SIGNUP_STEP_ACTION,
  PERSONAL_DETAILS_ACCESS_TOKEN_ACTION,
  STORE_USERID_ACTION,
} from './types';
import {Platform} from 'react-native';
import {RESET_STORE_TO_INITIAL_STATE_ACTION} from '../../../dashBoard/Settings/redux/types';

let initialState = {
  first_name: {value: '', empty: true, state: ''},
  middle_name: {value: '', empty: true, state: ''},
  last_name: {value: '', empty: true, state: ''},
  title:
    Platform.OS === 'ios'
      ? {value: '', empty: true, state: ''}
      : {value: 'Mr.', empty: false, state: ''},
  loading: false,
  error: '',
  id: '',
  access_token: '',
  step: null,
  missingFields: false,
  message_from_api: '',
};

export const personalDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_STORE_TO_INITIAL_STATE_ACTION:
      return {
        first_name: {value: '', empty: true, state: ''},
        middle_name: {value: '', empty: true, state: ''},
        last_name: {value: '', empty: true, state: ''},
        title:
          Platform.OS === 'ios'
            ? {value: '', empty: true, state: ''}
            : {value: 'Mr.', empty: false, state: ''},
        loading: false,
        error: '',
        id: '',
        access_token: '',
        step: '0',
        missingFields: false,
        message_from_api: '',
      };
    case EDIT_PERSONALDETAILS_ACTION:
      return {
        ...state,
        first_name: {
          value: action.payload.first_name.value,
          empty: !action.payload.first_name.value.trim(),
          state: action.payload.first_name.state,
        },
        middle_name: action.payload.hasOwnProperty('middle_name')
          ? {
              value: action.payload.middle_name?.value ?? '',
              empty:
                action.payload.middle_name.value.trim() === '' ? true : false,
              state: action.payload.middle_name.state,
            }
          : {value: '', empty: true},
        last_name: {
          value: action.payload.last_name.value,
          empty: !action.payload.last_name.value.trim(),
          state: action.payload.last_name.state,
        },
        title: {
          value: action.payload.title.value,
          empty: action.payload.title.value === '' ? true : false,
          state: action.payload.title.state,
        },
        loading: false,
        error: '',
      };
    case MISSING_FILEDS_ACTION:
      return {
        ...state,
        missingFields: action.payload,
        loading: false,
        error: '',
      };
    case SIGNUP_STEP_ACTION:
      return {
        ...state,
        step: action.payload,
      };
    case PERSONAL_DETAILS_ACCESS_TOKEN_ACTION:
      return {
        ...state,
        access_token: action.payload,
      };
    case STORE_USERID_ACTION:
      return {
        ...state,
        id: action.payload,
      };
    case ADD_PERSONAL_DETAILS_ACTION:
      return {
        ...state,
        first_name: {
          value: action.payload.first_name.trim(),
          empty: action.payload.first_name.trim() === '' ? true : false,
        },
        middle_name: action.payload.hasOwnProperty('middle_name')
          ? {
              value:
                action.payload.middle_name !== undefined
                  ? action.payload.middle_name.value !== undefined
                    ? action.payload.middle_name.trim()
                    : action.payload.middle_name
                  : action.payload.middle_name,
              empty: action.payload.middle_name.trim() === '' ? true : false,
            }
          : {value: '', empty: true},
        last_name: {
          value: action.payload.last_name.trim(),
          empty: action.payload.last_name.trim() === '' ? true : false,
        },
        title: {
          value: action.payload.title,
          empty: action.payload.title === '' ? true : false,
          state: action.payload.title.state,
        },
        loading: true,
        error: '',
      };
    case PERSONAL_DETAILS_FAILURE_ACTION:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case MY_LOCATION_ACTION:
      return {
        ...state,
        loading: true,
        error: '',
      };

    case PERSONAL_DETAILS_SUCCESS_ACTION:
      return {
        ...state,
        loading: false,
        id: action.payload.data.id,
        access_token: action.payload.data.access_token,
        message_from_api: action.payload.message,
        error: '',
      };
    default:
      return {
        ...state,
      };
  }
};
