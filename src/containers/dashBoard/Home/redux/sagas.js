import {takeLatest, put, call, select} from 'redux-saga/effects';
import {Share} from 'react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {
  GET_USER_PROFILE_ACTION,
  SHOW_TEMPERATURE_INFO_ACTION,
  DEEP_LINK_GENERATE_ACTION,
  UPDATE_TEMPERATURE_INFO_ACTION,
  UPLOAD_USER_IMAGE_ACTION,
  SHOW_TEST_INFO_ACTION,
  BUSINESS_REQUEST_API_ACTION,
  GET_COMPANY_DETAILS,
  ACCEPT_SHARE_CONTACT_DETAILS,
  ME_ACCESS_ASK_SHOW,
  TOGGLE_VACCINE_ACTION,
  GENERATE_ME_SIGN_ACTION,
} from './types';
import {signUpStepAction} from '../../../onBoarding/personalDetails/redux/actions';
import {SharingMethodsObj} from '../Methods/sharingMethods';
import {
  getUserDataSuccessAction,
  getUserDataFailureAction,
  showTemperatureSuccessAction,
  showTemperatureFailureAction,
  showHealthInfoSuccessAction,
  showHealthInfoFailureAction,
  deepLinkFailureAction,
  deepLinkSuccessAction,
  updateTemperatureSuccessAction,
  updateTemperatureFailureAction,
  editUserDataAction,
  uploadImageFailureAction,
  uploadHealthTestAction,
  businessAPIFailureAction,
  businessAPISuccessAction,
  meAccessAskUpdateName,
  meAccessAskClose,
  toggleVaccineSharingFailureAction,
  toggleVaccineSharingSuccessAction,
  uploadHealthTestImageAction,
  generateMeSignAction,
} from './actions';
import {changeNotificationStatusAction} from '../../Notifications/redux/actions';
import {saveTestDetailsFromAPIAction} from '../../../health/healthTest/redux/actions';
import {
  getApi,
  putApi,
  postApiWithToken,
  multipartPostApiWithToken,
} from '../../../../network/Network';
import {Constants, HelperFunctions} from '../../../../utilities';
import AsyncStorage, {AsyncConstants} from '../../../../utilities/AsyncStorage';
import TempHistoryHelperFunction from '../../Settings/temperatureResults/helperFunctions';
import {APP_BUNDLE_ID} from '../../../../config';
import NavigationService from '../../../../Navigation/NavigationService';
import {ProfleMethodsObj} from '../Methods';
import {request} from '../../../../network/request';
import {updateContactDetailsAction} from '../../Settings/editPersonalAndContactDetails/redux/actions';
import momentTimezone from 'moment-timezone';
const {showErrorMessage, getAPIError} = HelperFunctions;
const {
  URLS,
  docTypes,
  businessRequest,
  apiError,
  requestMethods,
  appStoreLink,
  playStoreLink,
  InvitationStatuses,
} = Constants;

function* getUserData(action) {
  try {
    const access_token = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_TOKEN,
    );
    const userId = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_ID,
    );
    const responsejson = yield call(getApi, {
      url: URLS.CONTACT_DETAILS_URL + '/' + userId,
      access_token,
    });
    const response = yield responsejson;
    yield put(getUserDataSuccessAction(response.data));
    yield put(signUpStepAction('0'));
    const jumioStatus = response.data.data?.jumio_status;
    if (jumioStatus) {
      yield put(generateMeSignAction());
    }
    const {
      data: {latest_health_test_results, timezone},
    } = response.data;
    if (timezone !== momentTimezone.tz.guess()) {
      let tz = momentTimezone.tz.guess();
      if (tz === 'Asia/Calcutta') {
        tz = 'Asia/Kolkata';
      }
      let details = {
        timezone: tz,
        step: 13,
      };
      yield put(updateContactDetailsAction(details, userId, access_token));
    }
    if (latest_health_test_results !== null) {
      let testDataObj = {
        testData: {
          testCentre: {
            value: latest_health_test_results.test_center,
            empty: false,
            status: '',
          },
          testType: {
            value: latest_health_test_results.test_type,
            empty: false,
            status: '',
          },
          testDate: {
            value: latest_health_test_results.test_date,
            empty: false,
            status: '',
          },
          testResult: {
            value: latest_health_test_results.test_result,
            empty: false,
            status: '',
          },
          howWasThistestPerformed: {
            value: latest_health_test_results.test_performed,
            empty: false,
            status: '',
          },
          document: {
            name: latest_health_test_results.document.substr(
              latest_health_test_results.document.lastIndexOf('/') + 1,
            ),
            type: latest_health_test_results.document.substr(
              latest_health_test_results.document.lastIndexOf('.') + 1,
            ),
            uri: latest_health_test_results.document,
          },
          missingFields: false,
          checkMissingFieldsAtTheEnd: false,
        },
      };
      yield put(saveTestDetailsFromAPIAction([testDataObj]));
    }
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(getUserDataFailureAction(error));
  }
}

export function* userProfileWatcher() {
  yield takeLatest(GET_USER_PROFILE_ACTION, getUserData);
}

function* showTemperature(action) {
  try {
    const userId = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_ID,
    );
    const access_token = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_TOKEN,
    );
    const responsejson = yield call(putApi, {
      url: URLS.CONTACT_DETAILS_URL,
      id: userId,
      access_token,
      body: {show_temperature: action.payload.status, step: '8'},
    });
    const response = yield responsejson;
    yield put(showTemperatureSuccessAction(response.data));
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(showTemperatureFailureAction(error));
  }
}

export function* showTemperatureWatcher() {
  yield takeLatest(SHOW_TEMPERATURE_INFO_ACTION, showTemperature);
}

function* showHealthTestInfo(action) {
  try {
    const userId = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_ID,
    );
    const access_token = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_TOKEN,
    );
    const responsejson = yield call(putApi, {
      url: URLS.CONTACT_DETAILS_URL,
      id: userId,
      access_token,
      body: {show_health_test: action.payload.status, step: '11'},
    });
    const response = yield responsejson;
    yield put(showHealthInfoSuccessAction(response.data));
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(showHealthInfoFailureAction(error));
  }
}

export function* showHealthTestInfoWatcher() {
  yield takeLatest(SHOW_TEST_INFO_ACTION, showHealthTestInfo);
}

function* generateDeepLink() {
  try {
    const userId = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_ID,
    );
    const access_token = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_TOKEN,
    );
    const responsejson = yield call(postApiWithToken, {
      url: URLS.CREATE_DEEPLINKING_URL,

      access_token,
      params: {user_id: userId},
    });
    const response = yield responsejson;

    yield put(deepLinkSuccessAction(response.data.data.share_id));
    const profileLink = yield dynamicLinks().buildShortLink({
      link: `${URLS.TESTED_ME_WEBSITE}?userId=${response.data.data.share_id}`,
      domainUriPrefix: URLS.TESTED_ME_DYNAMIC_LINK_DOMAIN,
      ios: {
        bundleId: APP_BUNDLE_ID,
        fallbackUrl: appStoreLink,
      },
      navigation: {
        forcedRedirectEnabled: true,
      },
      android: {
        packageName: APP_BUNDLE_ID,
        fallbackUrl: playStoreLink,
      },
      analytics: {
        campaign: 'banner',
        content: 'Share Me',
      },
    });

    yield Share.share({
      message: profileLink,
      title: 'Share profile',
      url: profileLink,
    });
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(deepLinkFailureAction(error));
  }
}

export function* generateDeepLinkWatcher() {
  yield takeLatest(DEEP_LINK_GENERATE_ACTION, generateDeepLink);
}

function* updateTemperature(action) {
  try {
    const {data, modalIndex, id} = action.payload;
    const access_token = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_TOKEN,
    );
    let requestConfig = {
      method: requestMethods.post,
      url: URLS.UPDATE_TEMP_URL,
      data,
      headers: {Authorization: `Bearer ${access_token}`},
    };

    if (id) {
      requestConfig = {
        method: requestMethods.put,
        url: `${URLS.UPDATE_TEMP_URL}/${id}`,
        data,
        headers: {Authorization: `Bearer ${access_token}`},
      };
    }

    const response = yield call(request, requestConfig);
    yield put(updateTemperatureSuccessAction(response.data));
    ProfleMethodsObj.onMountMethods();
    if (modalIndex === -1) {
      TempHistoryHelperFunction.getHistoryAction();
    }
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(updateTemperatureFailureAction(error));
  }
}
export function* updateTemperatureWatcher() {
  yield takeLatest(UPDATE_TEMPERATURE_INFO_ACTION, updateTemperature);
}
function* updateUserImage(imageKey, step, imageLocation, accessToken) {
  try {
    const id = yield AsyncStorage.getItemFromStorage(AsyncConstants.USER_ID);
    let profileImage = imageKey.split('/')[1];
    yield call(putApi, {
      url: URLS.CONTACT_DETAILS_URL,
      id,
      access_token: accessToken,
      body: {
        profile_image: profileImage,
        step,
      },
    });
    yield put(editUserDataAction(imageLocation));
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(uploadImageFailureAction(error));
  }
}
function* uploadImageS3(presignedData, source, accessToken, docType) {
  try {
    const imageUploadURL = presignedData.data.url;
    let fields = {...presignedData.data.fields};
    let document = {};
    const formData = new FormData();
    const imageKey = presignedData.data.key;
    formData.append('key', imageKey);
    fields &&
      Object.keys(fields).forEach((key) => {
        if (key !== 'bucket_name') {
          formData.append(key, fields[key]);
        }
      });
    formData.append('file', source);
    const options = {
      headers: {
        'Content-Type': source.type,
      },
    };
    const responsejson = yield call(multipartPostApiWithToken, {
      specificURL: true,
      url: imageUploadURL,
      params: formData,
      specificConfig: true,
      config: options,
    });
    let imageLocation = responsejson.request.responseHeaders.Location;
    if (docType === docTypes.PROFILE) {
      yield updateUserImage(imageKey, '10', imageLocation, accessToken);
    }
    if (docType === docTypes.HEALTH) {
      document = {
        name: imageLocation.split('health_test%2F')[1],
      };
      yield put(uploadHealthTestImageAction(false));
      yield put(uploadHealthTestAction(document));
    }
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(uploadImageFailureAction(error));
    yield put(uploadHealthTestImageAction(false));
  }
}
function* getPreSignedURL(action) {
  try {
    const access_token = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_TOKEN,
    );
    let source = action.payload.data;
    let docType = action.payload.docType;
    const data = {
      fileName: source.fileName,
      fileType: source.type,
      type: 'Image',
    };
    let url = `${URLS.PRE_SIGNED}?file=${data.fileName}`;
    if (docType === docTypes.HEALTH) {
      url += '&location=health';
    }
    const responsejson = yield call(getApi, {
      url,
      access_token,
    });
    const response = yield responsejson;
    yield uploadImageS3(response.data, source, access_token, docType);
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(uploadImageFailureAction(error));
  }
}

export function* uploadImageS3Watcher() {
  yield takeLatest(UPLOAD_USER_IMAGE_ACTION, getPreSignedURL);
}
function* changeInvitationStatus(invitationId) {
  try {
    const {
      notificationsReducer: {notificationsList},
    } = yield select();
    const viewedNotification = notificationsList.find(
      (notification) => notification.invitation_id === invitationId,
    );
    viewedNotification.latest_status = InvitationStatuses.invitationViewed;
    yield put(changeNotificationStatusAction(notificationsList));
    SharingMethodsObj.checkUnRespondedInvites(notificationsList);
  } catch (error) {
    showErrorMessage(getAPIError(error));
  }
}
function* businessAPI(action) {
  const {inviteId, status} = action.payload;
  try {
    const access_token = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_TOKEN,
    );
    const responsejson = yield call(putApi, {
      url: URLS.BUSINESS_EMPLOYEE_INVITATION,
      id: inviteId,
      access_token,
      body: {status: status},
    });
    const response = yield responsejson;
    yield put(businessAPISuccessAction(response.data));
    if (status === businessRequest.accept) {
      NavigationService.navigation.navigate('ContactDataShared', {
        source: 'Employee',
      });
    }
  } catch (error) {
    yield changeInvitationStatus(inviteId);
    if (error.response.status === apiError.badRequest) {
      showErrorMessage(error.response.data.data.invite_id[0]);
    } else {
      showErrorMessage(getAPIError(error));
    }
    yield put(businessAPIFailureAction(error));
  }
}

export function* businessRequestWatcher() {
  yield takeLatest(BUSINESS_REQUEST_API_ACTION, businessAPI);
}

function* getCompanyDetails({payload}) {
  const {venueToken, cb} = payload;
  try {
    const access_token = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_TOKEN,
    );
    const responsejson = yield call(getApi, {
      url: `${URLS.GET_COMPANY_BY_QR_CODE}?qr_token=${venueToken}`,
      access_token,
    });
    const {company, id, has_entered, location_name} = responsejson.data.data;
    cb({
      qrToken: venueToken,
      companyName: company,
      companyId: id,
      hasEntered: has_entered,
      companyLocation: location_name,
    });
  } catch (error) {
    cb({});
    showErrorMessage(getAPIError(error));
  }
}

export function* getCompanyDetailsWatcher() {
  yield takeLatest(GET_COMPANY_DETAILS, getCompanyDetails);
}

function* acceptShareContactDetails({payload}) {
  const {companyId, qrToken, hasEntered, cb} = payload;
  try {
    const userId = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_ID,
    );
    const access_token = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_TOKEN,
    );
    yield call(postApiWithToken, {
      url: URLS.ACCEPT_SHARING_CONTACT_DETAILS,
      access_token,
      params: {
        company_id: companyId,
        qr_token: qrToken,
        action: hasEntered ? 'leave' : 'enter',
        forceAction: true,
      },
    });
    yield put({
      type: GET_USER_PROFILE_ACTION,
      payload: {userID: userId, token: access_token},
    });

    cb(true);
  } catch (error) {
    cb({});
    showErrorMessage(getAPIError(error));
  }
}

export function* acceptSharingContactDetailsWatcher() {
  yield takeLatest(ACCEPT_SHARE_CONTACT_DETAILS, acceptShareContactDetails);
}

function* meAccessAskShow({payload}) {
  const {signed} = payload;
  const accessToken = yield call(
    AsyncStorage.getItemFromStorage,
    AsyncConstants.USER_TOKEN,
  );

  try {
    const {data} = yield call(postApiWithToken, {
      url: URLS.API_BASE_URL + URLS.GET_OTHER_USER_NAME_VIA_ME,
      access_token: accessToken,
      params: {data: signed},
    });
    yield put(
      meAccessAskUpdateName(`${data.data.first_name} ${data.data.last_name}`),
    );
  } catch (error) {
    yield put(meAccessAskClose());

    showErrorMessage(getAPIError(error));
  }
}

export function* meAccessAskShowsWatcher() {
  yield takeLatest(ME_ACCESS_ASK_SHOW, meAccessAskShow);
}

function* toggleVaccineSharing(action) {
  try {
    const userId = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_ID,
    );
    const access_token = yield call(
      AsyncStorage.getItemFromStorage,
      AsyncConstants.USER_TOKEN,
    );
    const responsejson = yield call(putApi, {
      url: URLS.CONTACT_DETAILS_URL,
      id: userId,
      access_token,
      body: {show_vaccine: action.payload.status, step: '14'},
    });
    const response = yield responsejson;
    yield put(toggleVaccineSharingSuccessAction(response.data));
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(toggleVaccineSharingFailureAction(error));
  }
}

export function* toggleVaccineSharingWatcher() {
  yield takeLatest(TOGGLE_VACCINE_ACTION, toggleVaccineSharing);
}
function* generateMeSign() {
  try {
    const isMeIdSaved = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.IS_ME_ID_SAVED,
    );
    if (isMeIdSaved) {
      return;
    }
    const access_token = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_TOKEN,
    );
    const userID = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_ID,
    );
    // const meId = yield call(getMyID, null, true);

    // yield call(putApi, {
    //   url: URLS.CONTACT_DETAILS_URL,
    //   id: `${userID}/me-details`,
    //   access_token,
    //   body: {
    //     me_id: meId,
    //   },
    // });
    yield AsyncStorage.setItemInStorage(AsyncConstants.IS_ME_ID_SAVED, true);
  } catch (error) {
    showErrorMessage(getAPIError(error));
  }
}

export function* generateMeSignWatcher() {
  yield takeLatest(GENERATE_ME_SIGN_ACTION, generateMeSign);
}
