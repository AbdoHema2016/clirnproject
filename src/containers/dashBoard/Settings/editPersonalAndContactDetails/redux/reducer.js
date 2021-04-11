import {
  UPDATE_CONTACT_DETAILS_ACTION,
  UPDATE_CONTACT_DETAILS_FAILURE_ACTION,
  UPDATE_CONTACT_DETAILS_SUCCESS_ACTION,
  SET_PERSONAL_DETAILS,
} from './types';
import {RESET_STORE_TO_INITIAL_STATE_ACTION} from '../../redux/types';
let initialState = {
  loading: false,
  error: '',
  email: '',
};

export const updateContactDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_STORE_TO_INITIAL_STATE_ACTION:
      return initialState;
    case UPDATE_CONTACT_DETAILS_ACTION:
      return {
        ...state,
        loading: true,
        error: '',
      };

    case UPDATE_CONTACT_DETAILS_FAILURE_ACTION:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_CONTACT_DETAILS_SUCCESS_ACTION:
      return {
        ...state,
        loading: false,
        error: '',
      };
    case SET_PERSONAL_DETAILS:
      return {
        ...state,
        email: action.payload.email,
      };
    default:
      return {
        ...state,
      };
  }
};
