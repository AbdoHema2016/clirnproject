import {takeLatest, put, call} from 'redux-saga/effects';
import {ADD_PERSONAL_DETAILS_ACTION} from './types';
import {
  personalDetailsSuccessAction,
  personalDetailsFailureAction,
} from './actions';
import {postApi} from '../../../../network/Network';
import {storeUserIdAction} from '../../SignIn/redux/actions';
import NavigationService from '../../../../Navigation/NavigationService';
import {Constants, HelperFunctions} from '../../../../utilities';
import AsyncStorage, {AsyncConstants} from '../../../../utilities/AsyncStorage';

const {URLS} = Constants;
const {showErrorMessage, getAPIError} = HelperFunctions;

function* addPersonalDetails(action) {
  try {
    const responsejson = yield call(postApi, {
      params: action.payload,
      url: URLS.SIGNUP_URL,
    });
    const response = yield responsejson;
    yield put(personalDetailsSuccessAction(response.data));
    yield put(storeUserIdAction(response.data.data.id));
    AsyncStorage.setItemInStorage(
      AsyncConstants.PERSONALDETAILSACCESSTOKEN,
      response.data.data.access_token,
    );
    AsyncStorage.setItemInStorage(
      AsyncConstants.USER_ID,
      response.data.data.id,
    );
    NavigationService.navigation.navigate('ContactStack');
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(personalDetailsFailureAction(error?.response?.data?.data));
  }
}

export function* personalDetailsWatcher() {
  yield takeLatest(ADD_PERSONAL_DETAILS_ACTION, addPersonalDetails);
}
