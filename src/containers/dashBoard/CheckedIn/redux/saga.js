import {takeLatest, put, call} from 'redux-saga/effects';
import {CHECKIN_LIST_ACTION, MANUAL_CHECKOUT} from './types';
import {
  getCheckInListFailureAction,
  getCheckInListSuccessAction,
  manualCheckoutFailure,
  manualCheckoutSuccess,
  getCheckInListAction,
} from './action';
import {getApi, patchApi} from '../../../../network/Network';
import {Constants, HelperFunctions} from '../../../../utilities';
import AsyncStorage, {AsyncConstants} from '../../../../utilities/AsyncStorage';
import {ProfleMethodsObj} from '../../Home/Methods';
const {getAPIError, showErrorMessage} = HelperFunctions;
const {URLS} = Constants;
const {VISITORS, CHECKIN_LIST} = URLS;

function* callGetCheckInListAPI() {
  try {
    const access_token = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_TOKEN,
    );
    const responsejson = yield call(getApi, {
      url: VISITORS + CHECKIN_LIST,
      access_token,
    });
    yield put(getCheckInListSuccessAction(responsejson.data));
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(getCheckInListFailureAction(error));
  }
}

export function* getCheckInListWatcher() {
  yield takeLatest(CHECKIN_LIST_ACTION, callGetCheckInListAPI);
}

function* manualCheckout(action) {
  const access_token = yield call(
    AsyncStorage.getItemFromStorage,
    AsyncConstants.USER_TOKEN,
  );
  try {
    const {visitorId} = action.payload;
    const {data} = yield call(patchApi, {
      url: URLS.API_BASE_URL + URLS.CHECKOUT,
      access_token,
      data: {visitor_id: visitorId},
    });
    yield put(manualCheckoutSuccess(data));
    yield put(getCheckInListAction());
    ProfleMethodsObj._onRefresh();
  } catch (error) {
    manualCheckoutFailure(getAPIError(error));
  }
}

export function* manualCheckoutWatcher() {
  yield takeLatest(MANUAL_CHECKOUT, manualCheckout);
}
