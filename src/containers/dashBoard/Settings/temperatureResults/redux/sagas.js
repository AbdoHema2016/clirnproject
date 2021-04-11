import {takeLatest, put, call} from 'redux-saga/effects';
import {GET_TEMPERATURE_HISTORY} from './types';
import {tempHistorySuccessAction, tempHistoryFailureAction} from './actions';
import {getApi} from '../../../../../network/Network';
import {Constants, HelperFunctions} from '../../../../../utilities';
import AsyncStorage, {
  AsyncConstants,
} from '../../../../../utilities/AsyncStorage';
const {getAPIError, showErrorMessage} = HelperFunctions;
const {URLS} = Constants;

function* callgetTempHistoryAPI() {
  try {
    const access_token = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_TOKEN,
    );
    const responsejson = yield call(getApi, {
      url: URLS.TEMPERATURE_HISTORY_URL,
      access_token,
    });
    yield put(tempHistorySuccessAction(responsejson.data.data));
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(tempHistoryFailureAction(error));
  }
}

export function* getTempHisotryWatcher() {
  yield takeLatest(GET_TEMPERATURE_HISTORY, callgetTempHistoryAPI);
}
