import {takeLatest, put, call} from 'redux-saga/effects';
import {SEND_OTP_ACTION, RESEND_OTP_ACTION} from './types';
import {
  otpFailureAction,
  otpSuccessAction,
  resendOtpFailureAction,
  resendOtpSuccessAction,
} from './actions';
import {postApiWithToken} from '../../../../network/Network';
import {signUpStepAction} from '../../personalDetails/redux/actions';
import NavigationService from '../../../../Navigation/NavigationService';
import {HelperFunctions, Constants} from '../../../../utilities';
import {translate} from '../../../../Localization';

import AsyncStorage, {AsyncConstants} from '../../../../utilities/AsyncStorage';
import {logAnalyticsEvent} from '../../../../utilities/Firebase';

const {showSuccessMessage} = HelperFunctions;
const {URLS, signUpSteps, analyticsIds} = Constants;

function* callOtpAPI(action) {
  try {
    const {otp, step, token} = action.payload;
    const responsejson = yield call(postApiWithToken, {
      params: {code: otp, step: step},
      url: step === 12 ? URLS.VERIFY_OTP_FOR_USER_DETAILS : URLS.VERIFY_OTP_URL,
      access_token: token,
    });
    const response = yield responsejson;
    yield put(otpSuccessAction(response.data));
    if (step === signUpSteps.OTP) {
      yield put(signUpStepAction('4'));
      AsyncStorage.setItemInStorage(
        AsyncConstants.STEP,
        signUpSteps.VerifyDocuments,
      );
      logAnalyticsEvent(analyticsIds.otp_added);
      NavigationService.navigation.navigate('VerifyDocuments');
      return;
    }
    showSuccessMessage(translate('CONTACT_DETAILS_SCREEN_STRINGS.VERIFIED'));
    NavigationService.navigation.pop();
  } catch (error) {
    yield put(otpFailureAction(error));
  }
}

export function* otpWatcher() {
  yield takeLatest(SEND_OTP_ACTION, callOtpAPI);
}

function* callResendOtpAPI(action) {
  try {
    const responsejson = yield call(postApiWithToken, {
      url: URLS.RESEND_OTP_URL,
      params: {step: 3},
      access_token: action.payload,
    });
    const response = yield responsejson;
    yield put(resendOtpSuccessAction(response.data));
  } catch (error) {
    yield put(resendOtpFailureAction(error));
  }
}

export function* resendotpWatcher() {
  yield takeLatest(RESEND_OTP_ACTION, callResendOtpAPI);
}
