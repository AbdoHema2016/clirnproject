import {takeLatest, put, call} from 'redux-saga/effects';
import {BECOME_MEDICAL_APPROVER} from './types';
import {
  becomeMedicalApproverSuccessAction,
  becomeMedicalApproverFailureAction,
} from './actions';
import {HelperFunctions, Constants} from '../../../../utilities';
import AsyncStorage, {AsyncConstants} from '../../../../utilities/AsyncStorage';
import {logAnalyticsEvent} from '../../../../utilities/Firebase';
import {postApiWithToken} from '../../../../network/Network';
import {ProfleMethodsObj} from '../../Home/Methods/profileMethods';

const {getAPIError, showErrorMessage} = HelperFunctions;
const {analyticsIds, URLS, medicalApproverCountry} = Constants;
function* becomeMedicalApprover(action) {
  try {
    const access_token = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_TOKEN,
    );
    const {title, gmc, country, state, licence_number} = action.payload;
    let params = '';
    let eventName = '';
    if (country === medicalApproverCountry.UK) {
      params = {title, gmc, country};
      eventName = analyticsIds.submit_medical_approver_UK;
    }
    if (country === medicalApproverCountry.USA) {
      params = {title, state, country, licence_number};
      eventName = analyticsIds.submit_medical_approver_USA;
    }

    yield call(postApiWithToken, {
      url: URLS.MEDICAL_APPROVER,
      access_token,
      params,
    });
    logAnalyticsEvent(eventName);
    yield put(becomeMedicalApproverSuccessAction());
    ProfleMethodsObj._onRefresh();
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(becomeMedicalApproverFailureAction(error));
  }
}

export function* becomeMedicalApproverWatcher() {
  yield takeLatest(BECOME_MEDICAL_APPROVER, becomeMedicalApprover);
}
