import wd from 'wd';
import {testIds} from '../../src/Constants';
import signIn from './common/signIn.appium.spec';
import AddHealthTest from './scenarios/AddHealthTest.appium.spec';
import AppVersion from './scenarios/AppVersion.appium.spec';
import EditContactDetails from './scenarios/EditContactDetails.appium.spec';
import ForgottenPassword from './scenarios/ForgottenPassword.appium.spec';
import DeleteHealthTest from './scenarios/DeleteHealthTest.appium.spec';
import HRPopUp from './scenarios/HRPopUp.appium.spec';
import InviteFriends from './scenarios/InviteFriends.appium.spec';
import PasswordSettings from './scenarios/PasswordSettings.appium.spec';
import RemoteWork from './scenarios/RemoteWork.appium.spec';
import ShareHistory from './scenarios/ShareHistory.appium.spec';
import ShareMeQR from './scenarios/ShareMeQR.appium.spec';
import SignUp from './scenarios/signup.appium.spec';
import SignOut from './scenarios/SignOut.appium.spec';
import TemperatureNotification from './scenarios/TemperatureNotification.appium.spec';
import TemperatureResults from './scenarios/TemperatureResults.appium.spec';
import TempShareToggle from './scenarios/TempShareToggle.appium.spec';
import DeleteVaccine from './scenarios/DeleteVaccine.appium.spec';
import AddVaccine from './scenarios/AddVaccine.appium.spec';
import EditVaccine from './scenarios/EditVaccine.appium.spec';
import EditHealthTestSettings from './scenarios/EditHealthTestSettings.appium.spec';
import AddProfilePic from './scenarios/AddProfilePic.appium.spec';
import OtherUserProfile from './scenarios/OtherUserProfile.appium.spec';
import VerifiedVaccineResults from './scenarios/VerifiedVaccineResults.appium.spec';
import MedicalApproverUK from './scenarios/MedicalApproverFlowUK.appium.spec';
import MedicalApproverUS from './scenarios/MedicalApproverFlowUS.appium.spec';
import {e2eAndroidConfig, e2eiOSConfig} from './AppiumConfig';
const PORT = 4723;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

let config = process.env.TESTING_OS === 'ios' ? e2eiOSConfig : e2eAndroidConfig;
let platform = process.env.TESTING_OS || 'android';
const driver = process.env.BROWSERSTACK_APP_URL
  ? wd.promiseChainRemote('http://hub-cloud.browserstack.com/wd/hub')
  : wd.promiseChainRemote('localhost', PORT);
beforeAll(async () => {
  await driver.init(config());
});

afterAll(async () => {
  await driver.sleep(5000);
  await driver.quit();
});

beforeEach(async () => {
  await driver.waitForElementByAccessibilityId(testIds.emailSignIn, 40000);
});

afterEach(async () => {
  await driver.launchApp();
});

describe('Logged user context', () => {
  beforeEach(async () => {
    await signIn(driver, platform);
  });
  try {
    MedicalApproverUK(driver);
    MedicalApproverUS(driver, platform);
    AddHealthTest(driver, platform);
    AddProfilePic(driver, platform);
    EditHealthTestSettings(driver, platform);
    AppVersion(driver);
    EditContactDetails(driver);
    HRPopUp(driver);
    InviteFriends(driver);
    VerifiedVaccineResults(driver);
    PasswordSettings(driver, platform);
    RemoteWork(driver, platform);
    ShareHistory(driver);
    ShareMeQR(driver);
    TemperatureNotification(driver, platform);
    TemperatureResults(driver, platform);
    TempShareToggle(driver);
    SignOut(driver);
    AddVaccine(driver, platform);
    EditVaccine(driver, platform);
    DeleteVaccine(driver);
    DeleteHealthTest(driver);
    OtherUserProfile(driver);
  } catch (error) {
    throw {error};
  }
});

describe('Guest context', () => {
  ForgottenPassword(driver);
  SignUp(driver, platform);
});
