import {takeLatest, put, call} from 'redux-saga/effects';
import {APPROVE_HEALTH_TEST_ACTION} from './types';
import {
  approveHealthTestActionSuccess,
  approveHealthTestActionFail,
} from './actions';
import {putApi} from '../../../../network/Network';
import {Constants, HelperFunctions} from '../../../../utilities';
import AsyncStorage, {AsyncConstants} from '../../../../utilities/AsyncStorage';
import NavigationService from '../../../../Navigation/NavigationService';
const {URLS} = Constants;
const {showErrorMessage, getAPIError} = HelperFunctions;

export function* approveHealthTest(action) {
  try {
    const access_token = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_TOKEN,
    );
    const {healthTestId, status, reason} = action.payload;
    let body = {};
    if (status) {
      body = {is_verified: status};
    } else {
      body = {is_verified: status, deny_reason: reason};
    }
    yield call(putApi, {
      url: URLS.REVIEW_HEALTH_TEST,
      id: healthTestId,
      access_token,
      body,
    });
    yield put(approveHealthTestActionSuccess());
    NavigationService.navigation.pop();
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(approveHealthTestActionFail(error));
  }
}

export function* approveHealthTestWatcher() {
  yield takeLatest(APPROVE_HEALTH_TEST_ACTION, approveHealthTest);
}
