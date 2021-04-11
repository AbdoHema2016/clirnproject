import {
  GET_USER_PROFILE_ACTION,
  SHOW_TEST_INFO_ACTION,
  SHOW_TEMPERATURE_INFO_ACTION,
  SHARE_MY_ID_ACTION,
  GET_USER_PROFILE_SUCCESS_ACTION,
  GET_USER_PROFILE_FAILURE_ACTION,
  SHOW_TEMP_FAILURE_ACTION,
  SHOW_TEMP_SUCCESS_ACTION,
  PROFILE_VISTED_BEFORE_ACTION,
  SHAR_LINK_ACTION_SUCCESS_ACTION,
  SHAR_LINK_FAILURE_ACTION,
  DEEP_LINK_GENERATE_ACTION,
  EDIT_USER_PROFILE_ACTION,
  UPDATE_TEMPERATURE_INFO_ACTION,
  UPDATE_TEMPERATURE_INFO_SUCESS_ACTION,
  UPDATE_TEMPERATURE_INFO_FAILURE_ACTION,
  CHECK_HEALTH_TEST_MISSING_FIELDS_ACTION,
  RESET_HEALTH_TEST_DATA_ACTION,
  ADD_HEALTH_TEST_DATA_ACTION,
  ADD_HEALTH_TEST_DATA_SUCCESS_ACTION,
  ADD_HEALTH_TEST_DATA_FAILURE_ACTION,
  EDIT_HEALTH_TEST_DATA_ACTION,
  LOADER_ACTION,
  UPDATE_HEALTH_TEST_FIELD_TYPE_AND_INDEX_ACTION,
  UPLOAD_USER_IMAGE_ACTION,
  UPLOAD_USER_IMAGE_FAILURE_ACTION,
  UPLOAD_HEALTH_TEST_ACTION,
  UPDATE_OPENED_INITIAL_DYNAMIC_LINK,
  VISITING_PROFILE_SCREEN_VIA_ACTION,
  SHOW_HEALTH_INFO_SUCCESS_ACTION,
  UPDATE_MODAL_INDEX_ACTION,
  SHOW_HEALTH_INFO_FAILURE_ACTION,
  BUSINESS_REQUEST_API_ACTION,
  BUSINESS_REQUEST_API_FAILURE_ACTION,
  BUSINESS_REQUEST_API_SUCCESS_ACTION,
  GET_COMPANY_DETAILS,
  ACCEPT_SHARE_CONTACT_DETAILS,
  ME_ACCESS_ASK_SHOW,
  ME_ACCESS_ASK_UPDATE_NAME,
  ME_ACCESS_ASK_HIDE,
  SHOW_VACCINE_POPUP_ON_HOME_ACTION,
  UPDATE_MODAL_PERMISION_INDEX_ACTION,
  TOGGLE_VACCINE_ACTION,
  TOGGLE_VACCINE_FAILURE_ACTION,
  TOGGLE_VACCINE_SUCCESS_ACTION,
  SHOW_HEALTH_TEST_IMAGE_LOADER_ACTION,
  UPDATE_VERIFY_MODAL_INDEX_ACTION,
  GENERATE_ME_SIGN_ACTION,
} from './types';

export const getUserDataAction = (data) => ({
  type: GET_USER_PROFILE_ACTION,
  payload: data,
});

export const visitingProfileViaAction = (data) => ({
  type: VISITING_PROFILE_SCREEN_VIA_ACTION,
  payload: data,
});

export const editUserDataAction = (data) => ({
  type: EDIT_USER_PROFILE_ACTION,
  payload: data,
});

export const addHealthTestAction = () => ({
  type: ADD_HEALTH_TEST_DATA_ACTION,
});

export const editHealthTestAction = (data) => ({
  type: EDIT_HEALTH_TEST_DATA_ACTION,
  payload: data,
});

export const updateTypeAndIndexAction = (data) => ({
  type: UPDATE_HEALTH_TEST_FIELD_TYPE_AND_INDEX_ACTION,
  payload: data,
});

export const healthTestSuccessAction = (data) => ({
  type: ADD_HEALTH_TEST_DATA_SUCCESS_ACTION,
  payload: data,
});

export const healthTestFailureAction = (data) => ({
  type: ADD_HEALTH_TEST_DATA_FAILURE_ACTION,
  payload: data,
});

export const checkHealthTestMissingFieldsAction = (data) => ({
  type: CHECK_HEALTH_TEST_MISSING_FIELDS_ACTION,
  payload: data,
});

export const profileVisitedBeforeAction = (status) => ({
  type: PROFILE_VISTED_BEFORE_ACTION,
  payload: status,
});

export const getUserDataSuccessAction = (data) => ({
  type: GET_USER_PROFILE_SUCCESS_ACTION,
  payload: data,
});

export const getUserDataFailureAction = (index) => ({
  type: GET_USER_PROFILE_FAILURE_ACTION,
  payload: index,
});

export const showHealthTestInfoAction = (data) => ({
  type: SHOW_TEST_INFO_ACTION,
  payload: data,
});

export const restHealthtTestDataAction = (data) => ({
  type: RESET_HEALTH_TEST_DATA_ACTION,
  payload: data,
});

export const showTemperatureAction = (data) => ({
  type: SHOW_TEMPERATURE_INFO_ACTION,
  payload: data,
});

export const updateTemperatureAction = (data, token, modalIndex, statId) => ({
  type: UPDATE_TEMPERATURE_INFO_ACTION,
  payload: {data, token, modalIndex, id: statId},
});

export const updateTemperatureSuccessAction = (data) => ({
  type: UPDATE_TEMPERATURE_INFO_SUCESS_ACTION,
  payload: data,
});

export const updateTemperatureFailureAction = (data) => ({
  type: UPDATE_TEMPERATURE_INFO_FAILURE_ACTION,
  payload: data,
});

export const showTemperatureSuccessAction = (data) => ({
  type: SHOW_TEMP_SUCCESS_ACTION,
  payload: data,
});

export const showTemperatureFailureAction = (data) => ({
  type: SHOW_TEMP_FAILURE_ACTION,
  payload: data,
});

export const showHealthInfoSuccessAction = (data) => ({
  type: SHOW_HEALTH_INFO_SUCCESS_ACTION,
  payload: data,
});

export const showHealthInfoFailureAction = (data) => ({
  type: SHOW_HEALTH_INFO_FAILURE_ACTION,
  payload: data,
});

export const shareMyIdAction = (data) => ({
  type: SHARE_MY_ID_ACTION,
  payload: data,
});

export const generateDeepLinkAction = (data) => ({
  type: DEEP_LINK_GENERATE_ACTION,
  payload: data,
});

export const deepLinkFailureAction = (error) => ({
  type: SHAR_LINK_FAILURE_ACTION,
  payload: error,
});

export const deepLinkSuccessAction = (data) => ({
  type: SHAR_LINK_ACTION_SUCCESS_ACTION,
  payload: data,
});

export const loadingAction = (status) => ({
  type: LOADER_ACTION,
  payload: status,
});

export const uploadImageAction = (data, token, userID, docType, testData) => ({
  type: UPLOAD_USER_IMAGE_ACTION,
  payload: {data, token, userID, docType, testData},
});

export const uploadImageFailureAction = (data) => ({
  type: UPLOAD_USER_IMAGE_FAILURE_ACTION,
  payload: data,
});

export const uploadHealthTestAction = (data) => ({
  type: UPLOAD_HEALTH_TEST_ACTION,
  payload: data,
});

export const updateOpenedInitialDynamicLinkAction = (data) => ({
  type: UPDATE_OPENED_INITIAL_DYNAMIC_LINK,
  payload: data,
});

export const updateModalIndexAction = (index, companyName, inviteId) => ({
  type: UPDATE_MODAL_INDEX_ACTION,
  payload: {index, companyName, inviteId},
});

export const businessAPIAction = (inviteId, token, status) => ({
  type: BUSINESS_REQUEST_API_ACTION,
  payload: {status, token, inviteId},
});

export const businessAPISuccessAction = (status) => ({
  type: BUSINESS_REQUEST_API_SUCCESS_ACTION,
  payload: status,
});

export const businessAPIFailureAction = (error) => ({
  type: BUSINESS_REQUEST_API_FAILURE_ACTION,
  payload: error,
});

export const getCompanyDetailsAction = (payload) => ({
  type: GET_COMPANY_DETAILS,
  payload,
});

export const acceptShareContactDetailsAction = (payload) => ({
  type: ACCEPT_SHARE_CONTACT_DETAILS,
  payload,
});

export const meAccessAskShow = (signed, accessGrantId) => ({
  type: ME_ACCESS_ASK_SHOW,
  payload: {signed, accessGrantId},
});

export const meAccessAskUpdateName = (name) => ({
  type: ME_ACCESS_ASK_UPDATE_NAME,
  payload: {name},
});

export const meAccessAskClose = (name) => ({
  type: ME_ACCESS_ASK_HIDE,
});

export const showVaccinePopUpOnHomeAction = (status) => ({
  type: SHOW_VACCINE_POPUP_ON_HOME_ACTION,
  payload: status,
});

export const updateModalPermissionIndexAction = (
  index,
  permissionAdded,
  permissionsRemoved,
  permissionProvidingCompany,
) => ({
  type: UPDATE_MODAL_PERMISION_INDEX_ACTION,
  payload: {
    index,
    permissionAdded,
    permissionsRemoved,
    permissionProvidingCompany,
  },
});

export const toggleVaccineSharingAction = (data) => ({
  type: TOGGLE_VACCINE_ACTION,
  payload: data,
});

export const toggleVaccineSharingSuccessAction = (data) => ({
  type: TOGGLE_VACCINE_SUCCESS_ACTION,
  payload: data,
});

export const toggleVaccineSharingFailureAction = (error) => ({
  type: TOGGLE_VACCINE_FAILURE_ACTION,
  payload: error,
});

export const uploadHealthTestImageAction = (status) => ({
  type: SHOW_HEALTH_TEST_IMAGE_LOADER_ACTION,
  payload: status,
});

export const updateVerifyModalIndexAction = (index, id, testApproved) => ({
  type: UPDATE_VERIFY_MODAL_INDEX_ACTION,
  payload: {index, id, testApproved},
});

export const generateMeSignAction = () => ({
  type: GENERATE_ME_SIGN_ACTION,
});
