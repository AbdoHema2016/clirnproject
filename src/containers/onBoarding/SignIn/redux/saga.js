import {takeLatest, put, call} from 'redux-saga/effects';
import {Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {DO_SIGN_IN_ACTION, STORE_TOKEN_ACTION} from './types';
import {
  SignInSuccessAction,
  SignInFailureAction,
  StoreToken,
  TokenStored,
  StoreDeviceToken,
} from './actions';
import {postApi, postApiWithToken} from '../../../../network/Network';
import AsyncStorage, {AsyncConstants} from '../../../../utilities/AsyncStorage';
import {HelperFunctions, Constants} from '../../../../utilities';
import {getLoginApiError} from './errorMethods';

const {URLS} = Constants;
const {showErrorMessage, getAPIError} = HelperFunctions;

function* login(action) {
  let deviceToken = '';
  try {
    yield messaging().registerDeviceForRemoteMessages();
    if (messaging().isDeviceRegisteredForRemoteMessages) {
      deviceToken = yield messaging().getToken();
    }
  } catch (error) {}

  try {
    const {username, password} = action.payload;
    const response = yield call(postApi, {
      url: URLS.LOGIN_URL,
      params: {
        email: username,
        password,
        device_token: deviceToken,
        device: Platform.OS,
      },
    });

    yield put(SignInSuccessAction(response.data));
    yield put(StoreDeviceToken(deviceToken));
    const {access_token, id, me_data} = response.data.data;
    if (me_data) {
      yield restoreMeSign(me_data);
    }
    yield put(StoreToken(access_token, id));
  } catch (error) {
    showErrorMessage(getLoginApiError(error));
    yield put(SignInFailureAction());
  }
}

export function* loginWatcher() {
  yield takeLatest(DO_SIGN_IN_ACTION, login);
}

export function* refreshToken(id, token) {
  const response = yield call(postApiWithToken, {
    url: `${URLS.CONTACT_DETAILS_URL}/${id}/${URLS.TOKEN}`,
    access_token: token,
  });
  return response.data?.data?.access_token;
}
export function* storeToken(action) {
  try {
    const {token, id, newAccount} = action.payload;
    let validToken = token;

    if (!newAccount) {
      validToken = yield refreshToken(id, token);
    }
    yield AsyncStorage.setItemInStorage('TOKEN', validToken);
    yield AsyncStorage.setItemInStorage('USERID', id);

    yield put(TokenStored(validToken, id));
  } catch (error) {
    showErrorMessage(getLoginApiError(error));
    yield put(SignInFailureAction(error.response || error));
  }
}

export function* tokenWatcher() {
  yield takeLatest(STORE_TOKEN_ACTION, storeToken);
}

function* restoreMeSign(meRestoreToken) {
  try {
    if (meRestoreToken) {
      yield AsyncStorage.setItemInStorage(AsyncConstants.IS_ME_ID_SAVED, true);
    }
  } catch (error) {
    showErrorMessage(getAPIError(error));
  }
}
