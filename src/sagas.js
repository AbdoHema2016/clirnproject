import {all, fork, takeEvery} from 'redux-saga/effects';
import {
  loginWatcher,
  tokenWatcher,
} from './containers/onBoarding/SignIn/redux/saga';
import {personalDetailsWatcher} from './containers/onBoarding/personalDetails/redux/sagas';
import {
  otpWatcher,
  resendotpWatcher,
} from './containers/onBoarding/otp/redux/sagas';
import {
  contactDetailsWatcher,
  getCodeWatcher,
  updatecontactDetailsWatcher,
} from './containers/onBoarding/contactDetails/redux/sagas';
import {healthStatWatcher} from './containers/health/feeling/redux/sagas';
import {temperatureWatcher} from './containers/health/temperature/redux/sagas';
import {
  healthTestWatcher,
  uploadHealthDocs3Watcher,
  updateHealthTestWatcher,
} from './containers/health/healthTest/redux/sagas';
import {
  userProfileWatcher,
  showTemperatureWatcher,
  generateDeepLinkWatcher,
  updateTemperatureWatcher,
  uploadImageS3Watcher,
  showHealthTestInfoWatcher,
  businessRequestWatcher,
  getCompanyDetailsWatcher,
  acceptSharingContactDetailsWatcher,
  meAccessAskShowsWatcher,
  toggleVaccineSharingWatcher,
  generateMeSignWatcher,
} from './containers/dashBoard/Home/redux/sagas';
import {forgotPasswordWatcher} from './containers/onBoarding/forgotPassword/redux/sagas';
import {
  logoutWatcher,
  deleteAccountWatcher,
} from './containers/dashBoard/Settings/redux/sagas';
import {
  getNotoficationsWatcher,
  deleteNotoficationsWatcher,
} from './containers/dashBoard/Notifications/redux/sagas';
import types from './containers/onBoarding/verifyDocuments/redux/actions/types';
import {getJumioCredentialsSaga} from './containers/onBoarding/verifyDocuments/redux/sagas';
import {changePasswordApiWatcher} from './containers/dashBoard/Settings/passwordSettings/redux/sagas';
import {getTempHisotryWatcher} from './containers/dashBoard/Settings/temperatureResults/redux/sagas';
import {
  getHealthTestsWatcher,
  getHealthTestDetailsWatcher,
  deleteHealthTestWatcher,
  uploadRejectedTestImage,
} from './containers/dashBoard/HealthTests/Results/redux/sagas';
import {
  sendPublicKeyWatcher,
  sendSignatureWatcher,
  updatePublicKeyWatcher,
} from './containers/Biomitric/redux/sagas';
import {getcontactDetailsWatcher} from './containers/dashBoard/Settings/editPersonalAndContactDetails/redux/sagas';
import {getShareHistoryWatcher} from './containers/dashBoard/Settings/shareHistory/redux/sagas';
import {
  getCompaniesWatcher,
  showCompanyProfileWatcher,
  setRemoteWorkingWatcher,
  removeCompanyWatcher,
  getRemoteReasonsWatcher,
} from './containers/dashBoard/Company/redux/sagas';
import {
  getVaccinationWatcher,
  deleteVaccineWatcher,
  uploadVaccineImage3Watcher,
  uploadVaccineDetailsWatcher,
  editVaccineDetailsWatcher,
  getVaccineDetailsWatcher,
  verifyVaccineWatcher,
  getVaccineTypesWatcher,
} from './containers/dashBoard/vaccinesResults/redux/sagas';
import {
  getCheckInListWatcher,
  manualCheckoutWatcher,
} from './containers/dashBoard/CheckedIn/redux/saga';
import {approveHealthTestWatcher} from './containers/dashBoard/OtherUserProfile/redux/sagas';
import {becomeMedicalApproverWatcher} from './containers/dashBoard/MedicalApprover/redux/sagas';
export function* rootSaga() {
  yield all([
    fork(loginWatcher),
    fork(tokenWatcher),
    fork(userProfileWatcher),
    fork(updateTemperatureWatcher),
    fork(showTemperatureWatcher),
    fork(forgotPasswordWatcher),
    fork(personalDetailsWatcher),
    fork(contactDetailsWatcher),
    fork(getCodeWatcher),
    fork(otpWatcher),
    fork(resendotpWatcher),
    fork(healthStatWatcher),
    fork(temperatureWatcher),
    fork(healthTestWatcher),
    fork(generateDeepLinkWatcher),
    fork(logoutWatcher),
    fork(uploadImageS3Watcher),
    fork(uploadHealthDocs3Watcher),
    fork(showHealthTestInfoWatcher),
    fork(getNotoficationsWatcher),
    fork(deleteNotoficationsWatcher),
    fork(updatecontactDetailsWatcher),
    fork(changePasswordApiWatcher),
    fork(getTempHisotryWatcher),
    fork(businessRequestWatcher),
    fork(getCompanyDetailsWatcher),
    fork(acceptSharingContactDetailsWatcher),
    fork(getHealthTestsWatcher),
    fork(sendPublicKeyWatcher),
    fork(sendSignatureWatcher),
    fork(updatePublicKeyWatcher),
    fork(getcontactDetailsWatcher),
    fork(updateHealthTestWatcher),
    fork(getShareHistoryWatcher),
    fork(getCompaniesWatcher),
    fork(showCompanyProfileWatcher),
    fork(setRemoteWorkingWatcher),
    fork(removeCompanyWatcher),
    fork(getRemoteReasonsWatcher),
    fork(meAccessAskShowsWatcher),
    fork(deleteAccountWatcher),
    fork(manualCheckoutWatcher),
    fork(getVaccinationWatcher),
    fork(deleteVaccineWatcher),
    fork(uploadVaccineImage3Watcher),
    fork(uploadVaccineDetailsWatcher),
    fork(editVaccineDetailsWatcher),
    fork(toggleVaccineSharingWatcher),
    fork(getCheckInListWatcher),
    fork(getHealthTestDetailsWatcher),
    fork(getVaccineDetailsWatcher),
    fork(deleteHealthTestWatcher),
    fork(uploadRejectedTestImage),
    fork(approveHealthTestWatcher),
    fork(verifyVaccineWatcher),
    fork(becomeMedicalApproverWatcher),
    fork(generateMeSignWatcher),
    fork(getVaccineTypesWatcher),
    yield takeEvery(
      types.GET_JUMIO_CREDENTIALS_REQUESTED,
      getJumioCredentialsSaga,
    ),
  ]);
}
