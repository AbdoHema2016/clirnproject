import {takeLatest, put, call} from 'redux-saga/effects';
import {getContactDetailsFailure} from './actions';
import {HelperFunctions, Constants} from '../../../../../utilities';
import {GET_CONTACT_DETAILS} from './types';
import {getApi} from '../../../../../network/Network';
import AsyncStorage, {
  AsyncConstants,
} from '../../../../../utilities/AsyncStorage';
const {getAPIError, showErrorMessage} = HelperFunctions;
const {URLS} = Constants;

function* callgetContactlDetailsAPI(action) {
  try {
    const {cb} = action.payload;
    const access_token = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_TOKEN,
    );
    const id = yield AsyncStorage.getItemFromStorage(AsyncConstants.USER_ID);
    const responsejson = yield call(getApi, {
      access_token: access_token,
      url:
        URLS.CONTACT_DETAILS_URL + '/' + id + URLS.CONTACT_DETAILS_ON_SETTINGS,
    });
    const response = yield responsejson;
    cb(response.data.data);
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(getContactDetailsFailure(error.response.data.data));
  }
}

export function* getcontactDetailsWatcher() {
  yield takeLatest(GET_CONTACT_DETAILS, callgetContactlDetailsAPI);
}
