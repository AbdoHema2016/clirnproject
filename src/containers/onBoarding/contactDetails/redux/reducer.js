import {
  EDIT_CONTACT_DETAILS_ACTION,
  ADD_CONTACT_DETAILS_ACTION,
  POLICY_SERVICE_CHECKED_ACTION,
  MISSING_CONTACT_FILEDS_ACTION,
  CONTACT_DETAILS_FAILURE_ACTION,
  CONTACT_DETAILS_SUCCESS_ACTION,
  GOT_COUNTRY_LIST_SUCCESS_ACTION,
} from './types';
import {Validations} from '../../../../utilities';
import {RESET_STORE_TO_INITIAL_STATE_ACTION} from '../../../dashBoard/Settings/redux/types';

const {validateEmail, validatePhonenumber, validatePassword} = Validations;

let initialState = {
  loading: false,
  policyChecked: false,
  missingFields: false,
  error: '',
  countryCodeList: [],
  countryId: '1',
  email: '',
};

export const contactDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_STORE_TO_INITIAL_STATE_ACTION:
      return initialState;
    case EDIT_CONTACT_DETAILS_ACTION:
      return {
        ...state,
        email: {
          value: action.payload.email.value,
          empty: !validateEmail(action.payload.email.value.trim()),
          state: action.payload.email.state,
        },
        phone: {
          value: action.payload.phone.value,
          empty: !validatePhonenumber(action.payload.phone.value.trim()),
          state: action.payload.phone.state,
        },
        countryCode: {
          value: action.payload.countryCode.value,
          empty: action.payload.countryCode.value.trim() === '' ? false : true,
        },
        countryId: action.payload.countryId.value,
        password: {
          value: action.payload.password.value,
          empty: !validatePassword(action.payload.password.value.trim()),
          state: action.payload.password.state,
        },
        loading: false,
        error: '',
      };
    case MISSING_CONTACT_FILEDS_ACTION:
      return {
        ...state,
        missingFields: action.payload,
        loading: false,
        error: '',
      };
    case ADD_CONTACT_DETAILS_ACTION:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case CONTACT_DETAILS_FAILURE_ACTION:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GOT_COUNTRY_LIST_SUCCESS_ACTION:
      return {
        ...state,
        countryCodeList: action.payload.data,
      };
    case POLICY_SERVICE_CHECKED_ACTION:
      return {
        ...state,
        loading: false,
        policyChecked: !action.payload,
        error: '',
      };

    case CONTACT_DETAILS_SUCCESS_ACTION:
      return {
        ...state,
        loading: false,
        error: '',
      };
    default:
      return {
        ...state,
      };
  }
};
