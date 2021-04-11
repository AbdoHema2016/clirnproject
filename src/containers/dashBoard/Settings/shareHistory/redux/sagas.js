import {takeLatest, put, call} from 'redux-saga/effects';
import {GET_SHARE_HISTORY_ACTION} from './types';
import {shareHistoryFailureAction, shareHistorySuccessAction} from './actions';
import {getApi} from '../../../../../network/Network';
import {Constants, HelperFunctions} from '../../../../../utilities';
import AsyncStorage, {
  AsyncConstants,
} from '../../../../../utilities/AsyncStorage';
const {getAPIError, showErrorMessage} = HelperFunctions;
const {URLS} = Constants;

function* callgetShareHistoryAPI() {
  try {
    const access_token = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_TOKEN,
    );
    const responsejson = yield call(getApi, {
      url: URLS.SHARE_HISTORY,
      access_token,
    });
    yield put(shareHistorySuccessAction(responsejson.data.data));
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(shareHistoryFailureAction(error));
  }
}

export function* getShareHistoryWatcher() {
  yield takeLatest(GET_SHARE_HISTORY_ACTION, callgetShareHistoryAPI);
}
