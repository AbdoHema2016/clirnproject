import {
  EDIT_TEST_FIELDS_ACTION,
  TEST_DATA_API_FAILURE,
  TEST_DATA_API_SUCCESS,
  SUBMIT_TEST_DATA_ACTION,
  ADD_TEST_FIELDS_ACTION,
  UPDATE_TEST_FIELD_TYPE_AND_INDEX_ACTION,
  CHECK_MISSING_FIELDS_ACTION,
  DELETE_TEST_DETAIL_ROW_ACTION,
  CHECK_MISSING_FIELDS_IN_TESTOBJECT_ACTION,
  SAVE_TEST_DETAIL_FROM_API_ACTION,
  UPLOAD_HEALTH_TEST_IMAGE_ACTION,
  UPLOAD_HEALTH_TEST_IMAGE_FAILURE_ACTION,
  EDIT_HEALTH_TEST_DATA_AFTER_IMAGE_UPLOAD_ACTION,
  UPDATE_MISSING_FIELD_ACTION,
  UPDATE_TEST_ACTION,
  UPDATE_TEST_SUCCESS,
  UPDATE_TEST_FAILURE,
} from './types';
import {Platform} from 'react-native';
import {RESET_STORE_TO_INITIAL_STATE_ACTION} from '../../../dashBoard/Settings/redux/types';
import {testMethodsInitial} from '../../../../utilities';
let initialState = {
  testDetails: [
    {
      testData: {
        id: 1,
        testCentre: {value: '', empty: true, status: ''},
        testType: {
          value: Platform.select({ios: '', android: 'Antibody test'}),
          empty: Platform.OS === 'ios',
          status: '',
        },
        testDate: {value: '', empty: true, status: ''},
        testResult: {
          value: Platform.select({ios: '', android: 'IgG only positive'}),
          empty: Platform.OS === 'ios',
          status: '',
        },
        howWasThistestPerformed: {
          value: testMethodsInitial,
          empty: false,
          status: '',
        },
        document: {
          name: '',
          type: '',
          uri: '',
        },
        missingFields: true,
        checkMissingFieldsAtTheEnd: false,
      },
    },
  ],
  types: ['Antibody test', 'Antigen test', 'RT PCR Test'],
  results: [
    {
      type: 'Antibody test',
      options: [
        'IgG only positive',
        'IgG and IgM positive',
        'IgM positive',
        'IgG and IgM negative',
      ],
    },
    {
      type: 'Antigen test',
      options: ['Positive', 'Negative'],
    },
    {
      type: 'RT PCR Test',
      options: ['Positive', 'Negative'],
    },
  ],
  currentType: '',
  currentSelectedIndex: 0,
  missingFields: true,
  loading: false,
  error: '',
};

export const healthTestReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_STORE_TO_INITIAL_STATE_ACTION:
      return initialState;
    case ADD_TEST_FIELDS_ACTION:
      return {
        ...state,
        testDetails: [...state.testDetails.slice(0), action.payload],
        loading: false,
        error: '',
      };
    case EDIT_TEST_FIELDS_ACTION:
      return {
        ...state,
        testDetails: state.testDetails.map((item, index) => {
          if (index !== action.payload.index) {
            return item;
          }
          return {
            ...action.payload.testDetail,
          };
        }),
        loading: false,
        error: '',
      };
    case UPDATE_TEST_FIELD_TYPE_AND_INDEX_ACTION:
      return {
        ...state,
        currentType: action.payload.type,
        currentSelectedIndex: action.payload.index,
        loading: false,
        error: '',
      };
    case DELETE_TEST_DETAIL_ROW_ACTION:
      return {
        ...state,
        testDetails: state.testDetails.filter(
          (_item, index) => index !== action.payload,
        ),
        error: '',
        currentSelectedIndex:
          state.testDetails.length - 2 > -1 ? state.testDetails.length - 2 : 0,
      };
    case CHECK_MISSING_FIELDS_ACTION:
      return {
        ...state,
        missingFields: action.payload,
      };
    case CHECK_MISSING_FIELDS_IN_TESTOBJECT_ACTION:
      return {
        ...state,
        testDetails: state.testDetails.map((item, index) => {
          if (item.testData.missingFields === true) {
            return {
              testData: {
                id: item.testData.id,
                testCentre: item.testData.testCentre,
                testType: item.testData.testType,
                testDate: item.testData.testDate,
                testResult: item.testData.testResult,
                howWasThistestPerformed: item.testData.howWasThistestPerformed,
                document: item.testData.document,
                missingFields: item.testData.missingFields,
                checkMissingFieldsAtTheEnd: true,
              },
            };
          }
          return {
            ...item,
          };
        }),
        missingFields:
          state.testDetails.indexOf((item, index) => {
            item.testData.missingFields === true;
          }) >= 0
            ? true
            : true,
      };
    case SUBMIT_TEST_DATA_ACTION:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case SAVE_TEST_DETAIL_FROM_API_ACTION:
      return {
        ...state,
        testDetails: action.payload,
      };
    case TEST_DATA_API_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
      };

    case TEST_DATA_API_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPLOAD_HEALTH_TEST_IMAGE_ACTION:
      return {
        ...state,
        loading: true,
      };
    case UPLOAD_HEALTH_TEST_IMAGE_FAILURE_ACTION:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_MISSING_FIELD_ACTION:
      return {
        ...state,
        loading: false,
        testDetails: state.testDetails.map((item, index) => {
          if (index !== action.payload) {
            return item;
          }
          return {
            ...item,
            testData: {
              ...state.testDetails[index].testData,
              missingFields: false,
            },
          };
        }),
      };
    case EDIT_HEALTH_TEST_DATA_AFTER_IMAGE_UPLOAD_ACTION:
      return {
        ...state,
        loading: false,
        testDetails: state.testDetails.map((item, index) => {
          if (index !== action.payload.index) {
            return item;
          }
          return {
            ...item,
            testData: {
              id: state.testDetails[action.payload.index].testData.id,
              testCentre:
                state.testDetails[action.payload.index].testData.testCentre,
              testType:
                state.testDetails[action.payload.index].testData.testType,
              testDate:
                state.testDetails[action.payload.index].testData.testDate,
              testResult:
                state.testDetails[action.payload.index].testData.testResult,
              howWasThistestPerformed:
                state.testDetails[action.payload.index].testData
                  .howWasThistestPerformed,
              document: action.payload.data,
              missingFields:
                state.testDetails[action.payload.index].testData.missingFields,
            },
          };
        }),
      };

    case UPDATE_TEST_ACTION:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_TEST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_TEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
