import {takeLatest, put, call} from 'redux-saga/effects';
import {SEND_TEMP_ACTION} from './types';
import {sendTempSuccessAction, sendTempFailureAction} from './actions';
import {signUpStepAction} from '../../../onBoarding/personalDetails/redux/actions';
import {putApi, postApiWithToken} from '../../../../network/Network';
import NavigationService from '../../../../Navigation/NavigationService';
import {
  URLS,
  signUpSteps,
  showErrorMessage,
  getAPIError,
} from '../../../../utilities';
import AsyncStorage, {AsyncConstants} from '../../../../utilities/AsyncStorage';

function* sendTemp(action) {
  try {
    const token = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.PERSONALDETAILSACCESSTOKEN,
    );
    if (!action.payload.id) {
      const responsejson = yield call(postApiWithToken, {
        url: URLS.UPDATE_TEMP_URL,
        access_token: token,
        params: action.payload.data,
      });
      const response = yield responsejson;
      yield put(sendTempSuccessAction(response.data));
      yield put(signUpStepAction('7'));
      AsyncStorage.setItemInStorage(
        AsyncConstants.STEP,
        signUpSteps.HealthTest,
      );
      NavigationService.navigation.navigate('HealthTest');
      return;
    }
    const responsejson = yield call(putApi, {
      body: action.payload.data,
      url: URLS.UPDATE_TEMP_URL,
      access_token: token,
      id: action.payload.id,
    });
    const response = yield responsejson;
    yield put(sendTempSuccessAction(response.data));
    yield put(signUpStepAction('7'));
    AsyncStorage.setItemInStorage(AsyncConstants.STEP, signUpSteps.HealthTest);
    NavigationService.navigation.navigate('HealthTest');
    return;
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(sendTempFailureAction(error));
  }
}

export function* temperatureWatcher() {
  yield takeLatest(SEND_TEMP_ACTION, sendTemp);
}
