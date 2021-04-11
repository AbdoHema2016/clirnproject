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
  UPDATE_TEMPERATURE_INFO_FAILURE_ACTION,
  UPDATE_TEMPERATURE_INFO_SUCESS_ACTION,
  CHECK_HEALTH_TEST_MISSING_FIELDS_ACTION,
  RESET_HEALTH_TEST_DATA_ACTION,
  EDIT_HEALTH_TEST_DATA_ACTION,
  LOADER_ACTION,
  UPDATE_HEALTH_TEST_FIELD_TYPE_AND_INDEX_ACTION,
  UPLOAD_USER_IMAGE_ACTION,
  UPLOAD_USER_IMAGE_FAILURE_ACTION,
  UPLOAD_HEALTH_TEST_ACTION,
  UPDATE_OPENED_INITIAL_DYNAMIC_LINK,
  VISITING_PROFILE_SCREEN_VIA_ACTION,
  UPDATE_MODAL_INDEX_ACTION,
  BUSINESS_REQUEST_API_FAILURE_ACTION,
  ADD_HEALTH_TEST_DATA_ACTION,
  SHOW_VACCINE_POPUP_ON_HOME_ACTION,
  UPDATE_MODAL_PERMISION_INDEX_ACTION,
  TOGGLE_VACCINE_ACTION,
  TOGGLE_VACCINE_FAILURE_ACTION,
  TOGGLE_VACCINE_SUCCESS_ACTION,
  ME_ACCESS_ASK_UPDATE_NAME,
  ME_ACCESS_ASK_SHOW,
  ME_ACCESS_ASK_HIDE,
  SHOW_HEALTH_TEST_IMAGE_LOADER_ACTION,
  UPDATE_VERIFY_MODAL_INDEX_ACTION,
} from './types';
import {RESET_STORE_TO_INITIAL_STATE_ACTION} from '../../Settings/redux/types';
import {Platform} from 'react-native';
import {Constants} from '../../../../utilities';
import {translate} from '../../../../Localization';

const {testMethodsInitial, temperatureType} = Constants;

let initialState = {
  via: '',
  modalIndex: 0,
  uploadingHealhtTestImage: false,
  userInfo: {
    checked_in: '',
    email: '',
    title: '',
    firstName: '',
    middleName: '',
    lastName: '',
    userImage: '',
    username: '',
    userLocation: '',
    status: '',
    mobileCode: '',
    mobileNumber: '',
    stats: {
      overall: '',
      temperature: '',
      test: '',
    },
    timezone: '',
    healthReport: {
      dateOfReading: '',
      preferred_measurement: '',
      temperature: '',
      testTaken: false,
      testType: '',
      testResult: '',
      source: '',
      testDate: '',
      infected: false,
      oldTestDetails: false,
      oldTemperatureDetails: false,
      statId: '',
      hikDeviceName: temperatureType.HIK_Camera,
      lastAddedVaccine: null,
      isVerified: null,
    },
  },
  healthTestData: [
    {
      testData: {
        testCentre: {value: '', empty: true, status: ''},
        testType: {
          value: Platform.OS === 'ios' ? '' : 'Antibody test',
          empty: Platform.OS === 'ios' ? true : false,
          status: '',
        },
        testDate: {value: '', empty: true, status: ''},
        testResult: {
          value: Platform.OS === 'ios' ? '' : 'IgG only positive',
          empty: Platform.OS === 'ios' ? true : false,
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
  idValidated: false,
  profileStatus: 'unverified',
  screenVistedBefore: true,
  showTestInfo: true,
  showTemperature: true,
  loading: false,
  loadingImage: false,
  deeplink: {link: '', error: ''},
  error: '',
  openedInitialDynamicLinkUserIds: [],
  gettingProfileSharableLink: false,
  companyName: '',
  companyID: '',
  companyAdditionDate: '',
  workingRemotely: false,
  meAccessAsk: {
    show: false,
    askingUserName: null,
    signed: null,
    accessGrantId: null,
  },
  inviteId: '',
  showVaccinePopUp: false,
  showVaccineToOtherUser: true,
  permissionAdded: '',
  permissionsRemoved: '',
  verifiedTestId: 0,
  testApproved: true,
  permissionProvidingCompany: '',
  medicalApprover: false,
  associatedCompanyLocation: null,
};

export const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_STORE_TO_INITIAL_STATE_ACTION:
      return {
        ...initialState,
        screenVistedBefore: state.screenVistedBefore,
        openedInitialDynamicLinkUserIds: state.openedInitialDynamicLinkUserIds,
      };
    case VISITING_PROFILE_SCREEN_VIA_ACTION:
      return {
        ...state,
        via: action.payload,
      };
    case UPDATE_OPENED_INITIAL_DYNAMIC_LINK: {
      return {
        ...state,
        openedInitialDynamicLinkUserIds: action.payload,
      };
    }
    case GET_USER_PROFILE_ACTION:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case EDIT_USER_PROFILE_ACTION:
      return {
        ...state,
        loading: false,
        loadingImage: false,
        userInfo: {...state.userInfo, userImage: action.payload},
      };
    case PROFILE_VISTED_BEFORE_ACTION:
      return {
        ...state,
        screenVistedBefore: action.payload,
      };
    case SHOW_TEST_INFO_ACTION:
      return {
        ...state,
        loading: false,
        loadingImage: false,
        showTestInfo: action.payload.status === '1' ? true : false,
        error: '',
      };
    case RESET_HEALTH_TEST_DATA_ACTION:
      return {
        ...state,
        healthTestData: initialState.healthTestData,
        loading: false,
      };
    case CHECK_HEALTH_TEST_MISSING_FIELDS_ACTION:
      return {
        ...state,
        healthTestData: state.healthTestData.map((item, index) => {
          if (item.testData.missingFields === true) {
            return {
              testData: {
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
          state.healthTestData.indexOf((item, index) => {
            item.testData.missingFields === true;
          }) >= 0
            ? true
            : true,
        loading: false,
      };
    case EDIT_HEALTH_TEST_DATA_ACTION:
      return {
        ...state,
        healthTestData: action.payload.healthTestData,
        loading: false,
        loadingImage: false,
      };
    case UPDATE_HEALTH_TEST_FIELD_TYPE_AND_INDEX_ACTION:
      return {
        ...state,
        currentType: action.payload.type,
        currentSelectedIndex: action.payload.index,
        loading: false,
        loadingImage: false,
        error: '',
      };
    case SHOW_TEMPERATURE_INFO_ACTION:
      return {
        ...state,
        loading: true,
        showTemperature: action.payload.status === '1' ? true : false,
        error: '',
      };
    case UPDATE_TEMPERATURE_INFO_ACTION:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_TEMPERATURE_INFO_FAILURE_ACTION:
      return {
        ...state,
        loading: false,
        loadingImage: false,
        error: action.payload,
      };

    case UPDATE_TEMPERATURE_INFO_SUCESS_ACTION:
      return {
        ...state,
        loading: false,
        loadingImage: false,
        statId: '',
        error: '',
      };
    case SHOW_TEMP_SUCCESS_ACTION:
      return {
        ...state,
        loading: false,
        loadingImage: false,
        error: '',
      };
    case SHOW_TEMP_FAILURE_ACTION:
      return {
        ...state,
        loading: false,
        loadingImage: false,
        error: action.payload,
      };
    case SHARE_MY_ID_ACTION:
      return {
        ...state,
        loading: false,
        loadingImage: false,
        error: '',
      };
    case GET_USER_PROFILE_SUCCESS_ACTION:
      return {
        ...state,
        idValidated: action.payload?.data?.jumio_status,
        medicalApprover: action.payload?.data?.medical_approver
          ? action.payload?.data?.medical_approver
          : false,
        companyID: action.payload?.data?.default_employee
          ? action.payload?.data?.default_employee?.company_id
          : '',
        userInfo: {
          ...state.userInfo,
          email: action.payload?.data?.email,
          mobileCode: action.payload?.data?.countries?.phone_code,
          firstName: action.payload?.data?.first_name,
          middleName: action.payload?.data?.middle_name,
          lastName: action.payload?.data?.last_name,
          title: action.payload.data?.title,
          mobileNumber: action.payload?.data?.mobile,
          stats: action.payload.data?.stats,
          timezone: action.payload?.data?.timezone,
          username:
            action.payload?.data?.first_name +
            ' ' +
            action.payload.data?.last_name,
          userLocation: action.payload?.data?.countries?.name,
          userImage:
            action.payload?.data?.self_profile_picture ||
            action.payload?.data?.profile_image,
          status:
            action.payload?.data?.status === 0 ? 'Unverified' : 'Verified',
          lastAddedVaccine: action.payload?.data?.last_added_vaccine,
          healthReport: {
            dateOfReading:
              action.payload?.data?.latest_temperature !== null
                ? action.payload?.data?.latest_temperature?.date_of_reading
                : '',
            preferred_measurement:
              action.payload?.data?.latest_temperature !== null
                ? action.payload?.data?.latest_temperature
                    ?.preferred_measurement === 1
                  ? '°C'
                  : '°F'
                : '',
            source:
              action.payload?.data?.latest_temperature !== null
                ? action.payload?.data?.latest_temperature?.source
                : '',
            temperature:
              action.payload?.data?.latest_temperature !== null
                ? action.payload.data?.latest_temperature?.temperature
                : '',
            testTaken:
              action.payload.data?.latest_health_test_results !== null
                ? true
                : false,
            infected:
              action.payload.data?.latest_health_test_results !== null
                ? action.payload?.data?.latest_health_test_results
                    ?.test_result === 'Negative'
                  ? false
                  : true
                : false,
            testResult:
              action.payload.data?.latest_health_test_results?.test_result ??
              null,
            testType:
              action.payload.data?.latest_health_test_results !== null
                ? action.payload?.data?.latest_health_test_results?.test_type
                : '',
            testDate:
              action.payload?.data?.latest_health_test_results !== null
                ? action.payload?.data?.latest_health_test_results?.test_date
                : '',
            statId:
              action.payload?.data?.latest_temperature !== null
                ? action.payload?.data?.latest_temperature?.id
                : '',
            hikDeviceName:
              action.payload.data?.latest_temperature?.device_name !== null
                ? action.payload.data?.latest_temperature?.device_name
                : temperatureType.HIK_Camera,
            isVerified:
              action.payload.data?.latest_health_test_results?.is_verified !==
              null
                ? action.payload.data?.latest_health_test_results?.is_verified
                : null,
          },
        },
        loading: false,
        showTestInfo: action.payload?.data?.show_health_test,
        showTemperature: action.payload?.data?.show_temperature,
        showVaccineToOtherUser: action.payload?.data?.show_vaccine,
        loadingImage: false,
        associatedCompany:
          action.payload.data?.default_employee?.company?.company,
        associatedCompanyID: action.payload?.data?.default_employee
          ? action.payload.data?.default_employee?.company_id
          : '',
        associatedCompanyLocation:
          action.payload.data?.default_employee?.company?.location_name,
        companyAdditionDate: action.payload.data?.default_employee?.created_at,
        workingRemotely: action.payload?.data?.working_remotely,
        checked_in: action.payload?.data?.checked_in,
        error: '',
      };
    case GET_USER_PROFILE_FAILURE_ACTION:
      return {
        ...state,
        loading: false,
        loadingImage: false,
        error: action.payload,
      };
    case DEEP_LINK_GENERATE_ACTION:
      return {
        ...state,
        gettingProfileSharableLink: true,
      };
    case LOADER_ACTION:
      return {
        ...state,
        loading: action.payload,
      };
    case SHAR_LINK_FAILURE_ACTION:
      return {
        ...state,
        gettingProfileSharableLink: false,
        loadingImage: false,
        deeplink: {link: '', error: action.payload},
      };
    case SHAR_LINK_ACTION_SUCCESS_ACTION:
      return {
        ...state,
        gettingProfileSharableLink: false,
        loadingImage: false,
        deeplink: {link: action.payload, error: ''},
      };
    case UPLOAD_USER_IMAGE_ACTION:
      return {
        ...state,
        loadingImage: true,
      };
    case UPLOAD_USER_IMAGE_FAILURE_ACTION:
      return {
        ...state,
        loadingImage: false,
        loading: false,
        error: action.payload,
      };
    case BUSINESS_REQUEST_API_FAILURE_ACTION:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPLOAD_HEALTH_TEST_ACTION:
      return {
        ...state,
        loading: false,
        loadingImage: false,
        healthTestData: state.healthTestData.map((item) => {
          return {
            ...item,
            testData: {
              testCentre: state.healthTestData[0].testData.testCentre,
              testType: state.healthTestData[0].testData.testType,
              testDate: state.healthTestData[0].testData.testDate,
              testResult: state.healthTestData[0].testData.testResult,
              howWasThistestPerformed:
                state.healthTestData[0].testData.howWasThistestPerformed,
              document: action.payload,
              missingFields: state.healthTestData[0].testData.missingFields,
            },
          };
        }),
      };
    case UPDATE_MODAL_INDEX_ACTION:
      return {
        ...state,
        modalIndex: action.payload.index,
        companyName: action.payload.companyName,
        inviteId: action.payload.inviteId,
      };
    case ADD_HEALTH_TEST_DATA_ACTION:
      return {
        ...state,
        healthTestData: [
          {
            testData: {
              testCentre: {value: '', empty: true, status: ''},
              testType: {
                value:
                  Platform.OS === 'ios'
                    ? ''
                    : translate('testTypes.antibodyTest'),
                empty: Platform.OS === 'ios' ? true : false,
                status: '',
              },
              testDate: {value: '', empty: true, status: ''},
              testResult: {
                value:
                  Platform.OS === 'ios'
                    ? ''
                    : translate('testResults.iggOnlyPositive'),
                empty: Platform.OS === 'ios' ? true : false,
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
        types: [
          translate('testTypes.antibodyTest'),
          translate('testTypes.antigenTest'),
          translate('testTypes.rtpcrTest'),
        ],
        results: [
          {
            type: translate('testTypes.antibodyTest'),
            options: [
              translate('testResults.iggOnlyPositive'),
              translate('testResults.iggAndIgmPositive'),
              translate('testResults.igmPositive'),
              translate('testResults.iggAndIgmNegative'),
            ],
          },
          {
            type: translate('testTypes.antigenTest'),
            options: [
              translate('testResults.positive'),
              translate('testResults.negative'),
            ],
          },
          {
            type: translate('testTypes.rtpcrTest'),
            options: [
              translate('testResults.positive'),
              translate('testResults.negative'),
            ],
          },
        ],
      };
    case ME_ACCESS_ASK_SHOW:
      return {
        ...state,
        meAccessAsk: {
          show: true,
          askingUserName: null,
          signed: action.payload.signed,
          accessGrantId: action.payload.accessGrantId,
        },
      };
    case ME_ACCESS_ASK_UPDATE_NAME:
      return {
        ...state,
        meAccessAsk: {
          ...state.meAccessAsk,
          askingUserName: action.payload.name,
        },
      };
    case ME_ACCESS_ASK_HIDE:
      return {
        ...state,
        meAccessAsk: {
          show: false,
          askingUserName: null,
          signed: null,
        },
      };
    case SHOW_VACCINE_POPUP_ON_HOME_ACTION:
      return {
        ...state,
        showVaccinePopUp: action.payload,
      };
    case UPDATE_MODAL_PERMISION_INDEX_ACTION:
      return {
        ...state,
        modalIndex: action.payload.index,
        permissionAdded: action.payload.permissionAdded,
        permissionsRemoved: action.payload.permissionsRemoved,
        permissionProvidingCompany: action.payload.permissionProvidingCompany,
      };
    case TOGGLE_VACCINE_ACTION:
      return {
        ...state,
        showVaccineToOtherUser: action.payload.status === '1' ? true : false,
        loading: false,
        error: '',
      };
    case TOGGLE_VACCINE_SUCCESS_ACTION:
      return {
        ...state,
        loading: false,
        error: '',
      };
    case TOGGLE_VACCINE_FAILURE_ACTION:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SHOW_HEALTH_TEST_IMAGE_LOADER_ACTION:
      return {
        ...state,
        uploadingHealhtTestImage: action.payload,
      };
    case UPDATE_VERIFY_MODAL_INDEX_ACTION:
      return {
        ...state,
        modalIndex: action.payload.index,
        verifiedTestId: action.payload.id,
        testApproved: action.payload.testApproved,
      };
    default:
      return {
        ...state,
      };
  }
};
