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
  GET_REMOTE_REASONS,
  GET_REMOTE_REASONS_SUCCESS,
  GET_REMOTE_REASONS_FAILURE,
} from './types';

export const getAllCompaniesAction = () => ({
  type: GET_ALL_COMPANIES,
});
export const getAllCompaniesFailure = (error) => ({
  type: GET_ALL_COMPANIES_FAILURE,
});
export const getAllCompaniesSuccess = (data) => ({
  type: GET_ALL_COMPANIES_SUCCESS,
  payload: data,
});

export const showCompanyProfile = (data) => ({
  type: SHOW_COMPANY_IN_PROFILE,
  payload: data,
});
export const showCompanyProfileFailure = (data) => ({
  type: SHOW_COMPANY_IN_PROFILE_FAILURE,
  payload: data,
});

export const setRemoteWorking = (data) => ({
  type: SET_REMOTE_WORKING,
  payload: data,
});
export const setRemoteWorkingFailure = (data) => ({
  type: SET_REMOTE_WORKING_FAILURE,
  payload: data,
});

export const removeCompanyAction = (data) => ({
  type: REMOVE_COMPANY,
  payload: data,
});

export const removeCompanyFailure = (data) => ({
  type: REMOVE_COMPANY_FAILURE,
  payload: data,
});
export const updateCompanyDataAction = (data) => ({
  type: UPDATE_COMPANY_DATA,
  payload: data,
});

export const getRemoteReasonsAction = () => ({
  type: GET_REMOTE_REASONS,
});

export const getRemoteReasonsSuccess = (data) => ({
  type: GET_REMOTE_REASONS_SUCCESS,
  payload: data,
});

export const getRemoteReasonsFailure = (data) => ({
  type: GET_REMOTE_REASONS_FAILURE,
  payload: data,
});
