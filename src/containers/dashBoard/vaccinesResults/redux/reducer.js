import {
  GET_VACCINATIONS_ACTION,
  VACCINATIONS_SUCCESS_ACTION,
  VACCINATIONS_FAIL_ACTION,
  DELETE_VACCINE_ACTION,
  DELETE_VACCINE_SUCCESS_ACTION,
  DELETE_VACCINE_FAIL_ACTION,
  UPLOAD_VACCINE_DETAILS,
  UPLOAD_VACCINE_IMAGE,
  UPLOAD_VACCINE_IMAGE_SUCCESS,
  RESET_VACCINE_DETAILS,
  UPLOAD_VACCINE_DETAILS_SUCCESS,
  UPLOAD_VACCINE_DETAILS_FAILURE,
  SHOW_VACCINE_MODAL_ACTION,
  SET_VACCINE_FIELDS_TO_BE_EDITED,
  SET_VACCINE_NAME_ACTION,
  SET_VACCINE_CENTRE_ACTION,
  SET_VACCINE_ADD_DATE_ACTION,
  SET_VACCINE_EXPIRE_DATE_ACTION,
  SET_VACCINE_DOCUMENT_ACTION,
  GET_VACCINE_DETAILS_SUCCESS_ACTION,
  GET_VACCINE_DETAILS_FAILURE_ACTION,
  SET_VACCINE_TYPES_SUCCESS_ACTION,
  GET_VACCINE_TYPES_FAILURE_ACTION,
} from './types';
import {RESET_STORE_TO_INITIAL_STATE_ACTION} from '../../Settings/redux/types';
let initialState = {
  loading: false,
  vaccinationResults: [],
  error: '',
  uploadingImageLoader: false,
  imageName: '',
  showVaccineModal: false,
  vaccineDetailsToBeEdited: {
    id: null,
    name: {value: '', isEmpty: true},
    health_center: {value: '', isEmpty: true},
    test_date: {value: '', isEmpty: true},
    expiration_date: {value: '', isEmpty: true},
    document: {value: '', isEmpty: true},
    documentUrl: '',
  },
  vaccineDetails: {
    id: null,
    name: '',
    health_center: '',
    test_date: '',
    expiration_date: '',
    document: '',
    documentUrl: '',
    isVerified: null,
    denyReason: null,
  },
  vaccineTypes: [],
};

export const vaccinationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_VACCINE_DETAILS:
      return {
        ...state,
        imageName: '',
        vaccineDetailsToBeEdited: initialState.vaccineDetailsToBeEdited,
        uploadingImageLoader: false,
      };
    case RESET_STORE_TO_INITIAL_STATE_ACTION:
      return {
        ...initialState,
      };
    case GET_VACCINATIONS_ACTION:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case VACCINATIONS_SUCCESS_ACTION:
      return {
        ...state,
        vaccinationResults: action.payload,
        loading: false,
        error: '',
      };
    case VACCINATIONS_FAIL_ACTION:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_VACCINE_ACTION:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case DELETE_VACCINE_SUCCESS_ACTION:
      return {
        ...state,
        loading: false,
      };
    case DELETE_VACCINE_FAIL_ACTION:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPLOAD_VACCINE_IMAGE:
      return {
        ...state,
        uploadingImageLoader: true,
        error: '',
      };
    case UPLOAD_VACCINE_IMAGE_SUCCESS:
      return {
        ...state,
        uploadingImageLoader: false,
        imageName: action.payload.name,
        error: '',
      };
    case UPLOAD_VACCINE_DETAILS:
      return {
        ...state,
        uploadingImageLoader: true,
        error: '',
      };
    case UPLOAD_VACCINE_DETAILS_SUCCESS:
      return {
        ...state,
        uploadingImageLoader: false,
        error: '',
      };
    case UPLOAD_VACCINE_DETAILS_FAILURE:
      return {
        ...state,
        uploadingImageLoader: false,
        error: action.payload,
      };
    case SHOW_VACCINE_MODAL_ACTION:
      return {
        ...state,
        uploadingImageLoader: false,
        showVaccineModal: action.payload,
      };
    case SET_VACCINE_FIELDS_TO_BE_EDITED:
      return {
        ...state,
        vaccineDetailsToBeEdited: {
          id: action.payload.id,
          name: {value: action.payload.name, isEmpty: false},
          health_center: {value: action.payload.health_center, isEmpty: false},
          test_date: {value: action.payload.test_date, isEmpty: false},
          expiration_date: {
            value: action.payload.expiration_date,
            isEmpty: false,
          },
          document: {value: action.payload.document, isEmpty: false},
          documentUrl: action.payload.document_url,
        },
      };
    case GET_VACCINE_DETAILS_SUCCESS_ACTION:
      return {
        ...state,
        vaccineDetails: {
          id: action.payload.id,
          name: action.payload.name,
          health_center: action.payload.health_center,
          test_date: action.payload.test_date,
          expiration_date: action.payload.expiration_date,
          document: action.payload.document,
          documentUrl: action.payload.document_url,
          isVerified: action.payload.is_verified,
          denyReason: action.payload.deny_reason,
        },
        error: '',
        loading: false,
      };
    case GET_VACCINE_DETAILS_FAILURE_ACTION:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case SET_VACCINE_NAME_ACTION:
      return {
        ...state,
        vaccineDetailsToBeEdited: {
          ...state.vaccineDetailsToBeEdited,
          name: action.payload,
        },
      };
    case SET_VACCINE_CENTRE_ACTION:
      return {
        ...state,
        vaccineDetailsToBeEdited: {
          ...state.vaccineDetailsToBeEdited,
          health_center: action.payload,
        },
      };
    case SET_VACCINE_ADD_DATE_ACTION:
      return {
        ...state,
        vaccineDetailsToBeEdited: {
          ...state.vaccineDetailsToBeEdited,
          test_date: action.payload,
        },
      };
    case SET_VACCINE_EXPIRE_DATE_ACTION:
      return {
        ...state,
        vaccineDetailsToBeEdited: {
          ...state.vaccineDetailsToBeEdited,
          expiration_date: action.payload,
        },
      };
    case SET_VACCINE_DOCUMENT_ACTION:
      return {
        ...state,
        vaccineDetailsToBeEdited: {
          ...state.vaccineDetailsToBeEdited,
          document: action.payload,
        },
      };
    case SET_VACCINE_TYPES_SUCCESS_ACTION:
      return {
        ...state,
        vaccineTypes: action.payload,
      };
    case GET_VACCINE_TYPES_FAILURE_ACTION:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
