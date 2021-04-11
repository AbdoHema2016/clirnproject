import {takeLatest, put, call} from 'redux-saga/effects';
import {ADD_CONTACT_DETAILS_ACTION, GET_COUNTRY_LIST_ACTION} from './types';
import {
  contactDetailsFailureAction,
  contactDetailsSuccessAction,
  gotCountryListSuccessAction,
  gotCountryListFailurAction,
} from './actions';
import {
  updateContactDetailsSuccessAction,
  updateContactDetailsFailureAction,
  setPersonalDetails,
} from '../../../dashBoard/Settings/editPersonalAndContactDetails/redux/actions';
import {getAPIError} from './errorHandling';
import {getUserDataAction} from '../../../dashBoard/Home/redux/actions';
import {UPDATE_CONTACT_DETAILS_ACTION} from '../../../dashBoard/Settings/editPersonalAndContactDetails/redux/types';
import {putApi, getApi} from '../../../../network/Network';
import {signUpStepAction} from '../../personalDetails/redux/actions';
import NavigationService from '../../../../Navigation/NavigationService';
import {HelperFunctions, Constants} from '../../../../utilities';
import AsyncStorage, {AsyncConstants} from '../../../../utilities/AsyncStorage';

const {showErrorMessage, showSuccessMessage} = HelperFunctions;
const {URLS, signUpSteps} = Constants;

function* addContactDetails(action) {
  try {
    const {details, id, access_token} = action.payload;
    if (details.step === 13) {
      const responsejson = yield call(putApi, {
        body: details,
        id: id,
        url: URLS.CONTACT_DETAILS_URL,
        access_token: access_token,
      });
      const response = yield responsejson;
      yield put(updateContactDetailsSuccessAction(response.data));
      return;
    }
    if (details.step === 12) {
      const responsejson = yield call(putApi, {
        body: details,
        id: id,
        url: URLS.CONTACT_DETAILS_URL,
        suffix: URLS.UPDATE_CONTACT_DETAILS_URL,
        access_token: access_token,
      });
      const response = yield responsejson;
      let data = {
        userID: id,
        token: access_token,
      };
      yield put(updateContactDetailsSuccessAction(response.data));
      yield put(setPersonalDetails(details));
      if (details.mobile) {
        NavigationService.navigation.navigate('ROTP', {source: 'Edit'});
      } else {
        showSuccessMessage(response.data.message);
      }
      yield put(getUserDataAction(data));
      return;
    }
    const responsejson = yield call(putApi, {
      body: details,
      id: id,
      url: URLS.CONTACT_DETAILS_URL,
      access_token: access_token,
    });
    yield put(setPersonalDetails(details));
    const response = yield responsejson;
    yield put(contactDetailsSuccessAction(response.data));
    yield put(setPersonalDetails(details));
    yield put(signUpStepAction('3'));
    NavigationService.navigation.navigate('OTP', {source: 'SignUp'});
    AsyncStorage.setItemInStorage(AsyncConstants.STEP, signUpSteps.OTP);
  } catch (error) {
    showErrorMessage(getAPIError(error));
    if (action.payload.details.step === signUpSteps.Profile) {
      yield put(updateContactDetailsFailureAction(error.response.data.data));
      return;
    }
    yield put(contactDetailsFailureAction(error.response.data.data));
  }
}

export function* contactDetailsWatcher() {
  yield takeLatest(ADD_CONTACT_DETAILS_ACTION, addContactDetails);
}

export function* updatecontactDetailsWatcher() {
  yield takeLatest(UPDATE_CONTACT_DETAILS_ACTION, addContactDetails);
}

function* getCountryList() {
  try {
    const responsejson = yield call(getApi, {url: URLS.CODE_LIST_URL});
    const response = yield responsejson;
    yield put(gotCountryListSuccessAction(response.data));
  } catch (error) {
    yield put(gotCountryListFailurAction(error));
  }
}

export function* getCodeWatcher() {
  yield takeLatest(GET_COUNTRY_LIST_ACTION, getCountryList);
}
