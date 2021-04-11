import {combineReducers} from 'redux';
import {SignInReducer} from './containers/onBoarding/SignIn/redux/reducer';
import {personalDetailsReducer} from './containers/onBoarding/personalDetails/redux/reducer';
import {contactDetailsReducer} from './containers/onBoarding/contactDetails/redux/reducer';
import {otpReducer} from './containers/onBoarding/otp/redux/reducer';
import {feelingReducer} from './containers/health/feeling/redux/reducer';
import {selectTempTypeReducer} from './containers/health/temperature/redux/reducer';
import {healthTestReducer} from './containers/health/healthTest/redux/reducers';
import {userProfileReducer} from './containers/dashBoard/Home/redux/reducer';
import {forgottenPasswordReducer} from './containers/onBoarding/forgotPassword/redux/reducer';
import {settingsReducer} from './containers/dashBoard/Settings/redux/reducer';
import jumio from './containers/onBoarding/verifyDocuments/redux/reducers';
import {notificationsReducer} from './containers/dashBoard/Notifications/redux/reducer';
import {temperatureHistoryReducer} from './containers/dashBoard/Settings/temperatureResults/redux/reducer';
import {changePasswordReducer} from './containers/dashBoard/Settings/passwordSettings/redux/reducer';
import {updateContactDetailsReducer} from './containers/dashBoard/Settings/editPersonalAndContactDetails/redux/reducer';
import {healthTestResultsReducer} from './containers/dashBoard/HealthTests/Results/redux/reducer';
import {biometricReducer} from './containers/Biomitric/redux/reducer';
import {shareHistoryReducer} from './containers/dashBoard/Settings/shareHistory/redux/reducers';
import {companyReducer} from './containers/dashBoard/Company/redux/reducer';
import {vaccinationsReducer} from './containers/dashBoard/vaccinesResults/redux/reducer';
import {LOGOUT_ACTION} from './containers/dashBoard/Settings/redux/types';
import {checkedInReducer} from './containers/dashBoard/CheckedIn/redux/reducer';
import {otherUserProfileReducer} from './containers/dashBoard/OtherUserProfile/redux/reducer';
import {becomeMedicalApproverReducer} from './containers/dashBoard/MedicalApprover/redux/reducer';

const appReducer = combineReducers({
  signIn: SignInReducer,
  forgottenPassword: forgottenPasswordReducer,
  personalDetails: personalDetailsReducer,
  contactDetails: contactDetailsReducer,
  otp: otpReducer,
  feeling: feelingReducer,
  selectTempType: selectTempTypeReducer,
  healthTest: healthTestReducer,
  userProfile: userProfileReducer,
  settingsReducer: settingsReducer,
  jumio,
  notificationsReducer,
  updateContactDetailsReducer,
  changePassword: changePasswordReducer,
  temperatureHistoryReducer,
  healthTestResults: healthTestResultsReducer,
  biometric: biometricReducer,
  shareHistory: shareHistoryReducer,
  companies: companyReducer,
  vaccinations: vaccinationsReducer,
  otherUserProfile: otherUserProfileReducer,
  checkedInReducer,
  becomeMedicalApprover: becomeMedicalApproverReducer,
});
const rootReducer = (state, action) => {
  if (action.type === LOGOUT_ACTION) {
    state = undefined;
  }

  return appReducer(state, action);
};
export default rootReducer;
