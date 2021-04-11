import {takeLatest, put, call} from 'redux-saga/effects';
import {UPDATE_PASSWORD_ACTION} from './types';
import {
  updatePasswordFailureAction,
  updatePasswordSuccessAction,
} from './actions';
import {putApi} from '../../../../../network/Network';
import {HelperFunctions, Constants} from '../../../../../utilities';
import {translate} from '../../../../../Localization';

import {getAPIError} from './errorHandling';
import AsyncStorage, {
  AsyncConstants,
} from '../../../../../utilities/AsyncStorage';
import NavigationService from '../../../../../Navigation/NavigationService';

const {URLS} = Constants;
const {showErrorMessage, showSuccessMessage} = HelperFunctions;

function* changePasswordApi(action) {
  try {
    const {details} = action.payload;
    const access_token = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_TOKEN,
    );
    const id = yield AsyncStorage.getItemFromStorage(AsyncConstants.USER_ID);
    const responsejson = yield call(putApi, {
      body: details,
      id,
      url: URLS.CONTACT_DETAILS_URL,
      suffix: URLS.CHANGE_PASSWORD_URL,
      access_token,
    });
    const response = yield responsejson;
    yield put(updatePasswordSuccessAction(response.data));
    showSuccessMessage(translate('PASSWORD_SETTINGS.PASSWORD_UPDATED'));
    NavigationService.navigation.pop();
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(updatePasswordFailureAction(error.response.data.data));
  }
}

export function* changePasswordApiWatcher() {
  yield takeLatest(UPDATE_PASSWORD_ACTION, changePasswordApi);
}
