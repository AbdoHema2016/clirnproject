import {
  GET_ALL_COMPANIES,
  GET_ALL_COMPANIES_SUCCESS,
  GET_ALL_COMPANIES_FAILURE,
  SHOW_COMPANY_IN_PROFILE,
  SHOW_COMPANY_IN_PROFILE_FAILURE,
  SET_REMOTE_WORKING,
  SET_REMOTE_WORKING_FAILURE,
  REMOVE_COMPANY,
  REMOVE_COMPANY_FAILURE,
  UPDATE_COMPANY_DATA,
  GET_REMOTE_REASONS_SUCCESS,
  GET_REMOTE_REASONS_FAILURE,
} from '../actions/types';

let initialState = {
  loading: '',
  allCompanies: [],
  error: '',
  removedCompanyID: '',
  removedCompanyName: '',
  remoteReasons: [],
};

export const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COMPANIES:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_COMPANIES_SUCCESS:
      return {
        ...state,
        loading: false,
        allCompanies: action.payload.data,
      };
    case GET_ALL_COMPANIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SHOW_COMPANY_IN_PROFILE:
      return {
        ...state,
        loading: true,
      };
    case SHOW_COMPANY_IN_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_REMOTE_WORKING:
      return {
        ...state,
        loading: true,
      };
    case SET_REMOTE_WORKING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case REMOVE_COMPANY:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_COMPANY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_COMPANY_DATA:
      return {
        ...state,
        removedCompanyID: action.payload.companyID,
        removedCompanyName: action.payload.companyName,
      };
    case GET_REMOTE_REASONS_SUCCESS:
      return {
        ...state,
        remoteReasons: action.payload.data,
      };
    case GET_REMOTE_REASONS_FAILURE:
      return {
        ...state,
        error: action.payload.data,
      };
    default:
      return {
        ...state,
      };
  }
};
