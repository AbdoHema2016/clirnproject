import {takeLatest, put, call} from 'redux-saga/effects';
import {FORGOTTEN_PASSWORD_ACTION} from './types';
import {
  forgottenPassworSuccessdAction,
  forgottenPasswordFailureAction,
} from './actions';
import {postApi} from '../../../../network/Network';
import {HelperFunctions, Constants} from '../../../../utilities';
import {translate} from '../../../../Localization';

import {goBack} from '../../../../Navigation/NavigationService';

const {getAPIError, showErrorMessage, showSuccessMessage} = HelperFunctions;
const {URLS} = Constants;

function* forgotenPasswordAPI(action) {
  try {
    yield call(postApi, {
      url: URLS.FORGOT_PASSWORD_URL,
      params: action.payload,
    });
    yield put(forgottenPassworSuccessdAction());

    goBack();
    showSuccessMessage(translate('forgotPassword.emailSentsuccessfully'), {
      duration: 6000,
    });
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(forgottenPasswordFailureAction(error.response));
  }
}

export function* forgotPasswordWatcher() {
  yield takeLatest(FORGOTTEN_PASSWORD_ACTION, forgotenPasswordAPI);
}
