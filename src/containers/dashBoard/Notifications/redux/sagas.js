import {takeEvery, takeLatest, put, call} from 'redux-saga/effects';
import {GET_NOTIFICATIONS_ACTION, DELETE_NOTIFICATIONS_ACTION} from './types';
import {
  notificationSuccessAction,
  notificationFailureAction,
  deleteNotificationSuccessAction,
  deleteNotificationFailureAction,
} from './actions';
import {deleteApi, getApi} from '../../../../network/Network';
import {Constants, HelperFunctions} from '../../../../utilities';
import {SharingMethodsObj} from '../../Home/Methods/sharingMethods';
import AsyncStorage, {AsyncConstants} from '../../../../utilities/AsyncStorage';
const {getAPIError, showErrorMessage} = HelperFunctions;
const {URLS} = Constants;

function* callgetNotificationsAPI() {
  try {
    const access_token = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_TOKEN,
    );
    const responsejson = yield call(getApi, {
      url: URLS.NOTIFICATIONS_URL,
      access_token,
    });
    yield put(notificationSuccessAction(responsejson.data.data));
    SharingMethodsObj.checkUnRespondedInvites(responsejson.data.data);
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(notificationFailureAction(error));
  }
}

export function* getNotoficationsWatcher() {
  yield takeLatest(GET_NOTIFICATIONS_ACTION, callgetNotificationsAPI);
}

function* calldeletetNotificationsAPI(action) {
  try {
    const responsejson = yield call(deleteApi, {
      url: URLS.NOTIFICATIONS_URL + '/' + action.payload.id,
      access_token: action.payload.access_token,
    });
    const response = yield responsejson;
    yield put(deleteNotificationSuccessAction(response.data));
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(deleteNotificationFailureAction(error));
  }
}

export function* deleteNotoficationsWatcher() {
  yield takeEvery(DELETE_NOTIFICATIONS_ACTION, calldeletetNotificationsAPI);
}
