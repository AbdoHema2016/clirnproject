import {takeLatest, put, call} from 'redux-saga/effects';
import {
  LOGOUT_ACTION,
  RESET_STORE_TO_INITIAL_STATE_ACTION,
  DELETE_ACCOUNT_ACTION,
} from './types';
import {removeToken} from '../../../onBoarding/SignIn/redux/actions';
import {logoutFailureAction, logoutSuccessAction} from './actions';
import {postApiWithToken, deleteApi} from '../../../../network/Network';
import {Constants} from '../../../../utilities';
import AsyncStorage, {AsyncConstants} from '../../../../utilities/AsyncStorage';
import ModalsQueue from '../../../../services/ModalsQueue';
import {signUpStepAction} from '../../../onBoarding/personalDetails/redux/actions';

const {URLS} = Constants;
const {
  USER_TOKEN,
  USER_ID,
  MEDATA,
  STEP,
  STATID,
  IS_ME_ID_SAVED,
  DEVICE_TOKEN,
} = AsyncConstants;

function* logoutAPI(action) {
  try {
    const responsejson = yield call(postApiWithToken, {
      url: URLS.SIGNOUT_URL,
      access_token: action.payload,
    });
    const response = yield responsejson;
    ModalsQueue.clearModalQueue();
    yield put(logoutSuccessAction(response.data.data.link));
  } catch (error) {
    yield put(logoutFailureAction(error));
  }

  yield put(signUpStepAction('0'));
  yield put({type: RESET_STORE_TO_INITIAL_STATE_ACTION});

  yield AsyncStorage.removeMultiFromStorage([
    USER_TOKEN,
    USER_ID,
    MEDATA,
    STEP,
    STATID,
    IS_ME_ID_SAVED,
    DEVICE_TOKEN,
  ]);
  yield put(removeToken());

  ModalsQueue.clearModalQueue();
}

export function* logoutWatcher() {
  yield takeLatest(LOGOUT_ACTION, logoutAPI);
}

function* calldeleteAccountAPI() {
  try {
    const token = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_TOKEN,
    );
    const responsejson = yield call(deleteApi, {
      url: URLS.CONTACT_DETAILS_URL + '/' + URLS.DELETE_ACCOUNT_URL,
      access_token: token,
    });
    const response = yield responsejson;
    yield put(logoutSuccessAction(response.data.data.link));
  } catch (error) {
    yield put(logoutFailureAction(error));
  }

  yield put({type: RESET_STORE_TO_INITIAL_STATE_ACTION});
  yield AsyncStorage.removeMultiFromStorage([
    USER_TOKEN,
    USER_ID,
    MEDATA,
    STEP,
    STATID,
    IS_ME_ID_SAVED,
    DEVICE_TOKEN,
  ]);
  yield put(removeToken());

  ModalsQueue.clearModalQueue();
}

export function* deleteAccountWatcher() {
  yield takeLatest(DELETE_ACCOUNT_ACTION, calldeleteAccountAPI);
}
