import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, ScrollView, Modal, RefreshControl, AppState} from 'react-native';
import {Style} from './style';
import CButtonWithImage from '../../../components/cButtonWithImage';
import MeSignScanner from '../../../components/cMeSignScanner';
import COverlay from './components/overlayComponent';
import ContactDataSharingModal from '../../../components/contactDataSharing';
import MeSignAccessAsk from '../../../components/cMeSignAccessAsk';
import {
  getUserDataAction,
  showTemperatureAction,
  profileVisitedBeforeAction,
  generateDeepLinkAction,
  editUserDataAction,
  updateTemperatureAction,
  editHealthTestAction,
  addHealthTestAction,
  checkHealthTestMissingFieldsAction,
  restHealthtTestDataAction,
  loadingAction,
  updateTypeAndIndexAction,
  uploadImageAction,
  updateOpenedInitialDynamicLinkAction,
  showHealthTestInfoAction,
  updateModalIndexAction,
  getCompanyDetailsAction,
  acceptShareContactDetailsAction,
  meAccessAskShow,
  meAccessAskClose,
  showVaccinePopUpOnHomeAction,
  updateModalPermissionIndexAction,
  toggleVaccineSharingAction,
  uploadHealthTestImageAction,
  updateVerifyModalIndexAction,
} from './redux/actions';
import {
  uploadVaccineImageAction,
  uploadVaccineDetailsAction,
  getVaccineTypesAction,
} from '../vaccinesResults/redux/actions';
import {
  setTempTypeAction,
  setTempIntValAction,
  setTempDecValAction,
  tempSkippedAction,
} from '../../health/temperature/redux/actions';
import {
  feelingSelectedAction,
  sendHealthStatAction,
} from '../../health/feeling/redux/actions';
import {getNotificationsAction} from '../Notifications/redux/actions';
import {
  submitHealthTestDataAction,
  updateHealthDataAction,
} from '../../health/healthTest/redux/actions';
import CWalkthorugh from './walkthrough/Walkthrough';
import DataComponent from './components/dataComponent';
import NoDataComponent from './components/noDataComponent';
import {
  ProfleMethodsObj,
  DynamicLinksMethodObj,
  HealthStatusMethodObj,
  SharingMethodsObj,
  WalkthroughMethodsObj,
  HealthtestMethodsObj,
} from './Methods';
import UserQR from './userQR/UserQR';
import ErrorView from '../../../components/cMeError';
import {Constants, Firebase} from '../../../utilities';
import {translate} from '../../../Localization';
import CLoader from '../../../components/cLoader';
import CUserImageView from './components/userImageComponent';
import navigationService from '../../../Navigation/NavigationService';
import CProgress from '../../../components/cProgress';
import {updateHealthTestIDAction} from '../HealthTests/Results/redux/actions';
import {connectActionSheet} from '@expo/react-native-action-sheet';
import {logoutAction} from '../Settings/redux/actions';
import {StoreDeviceToken} from '../../onBoarding/SignIn/redux/actions';
const {appState, LOCAL_PATH, testIds, profileScreenRow} = Constants;
const {
  onNotificationReceived,
  onInitialNotificationReceived,
  onMessageReceived,
} = Firebase;
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temperatureEnabled: false,
      showInfoAlert: false,
      step: 1,
      showUserHealthTestModal: false,
      showMeSignScanner: false,
      intOrDec: '',
      intVal: 0,
      decVal: 0,
      showPicker: false,
      showModal: false,
      showTestPicker: false,
      date: new Date(),
      showHealthTest: true,
      switchPosition: {height: 0, top: 0, x: 0, y: 0, width: 0},
      uploadImagePosition: {height: 0, top: 0, x: 0, y: 0, width: 0},
      bottom: {height: 0, top: 0, x: 0, y: 0, width: 0},
      scanMePosition: {height: 0, top: 0, x: 0, y: 0, width: 0},
      showShare: false,
      showUserQR: false,
      error: false,
      refreshing: false,
      showDatePicker: false,
      gettingCompanyDetails: false,
      acceptingSharingContactDetails: false,
      showCheckoutConfirmationPopUp: false,
      showCheckedinInfoPopUp: false,
      vaccineName: {value: '', isEmpty: true},
      healthCentre: {value: '', isEmpty: true},
      testDate: {value: '', isEmpty: true},
      expiryDate: {value: '', isEmpty: true},
      photo: {value: '', isEmpty: true},
      dateType: '',
      vaccineImageUploading: false,
      healthTestId: null,
      vaccineId: null,
      appState: AppState.currentState,
    };
    HealthtestMethodsObj.setProps = this.props;
    HealthtestMethodsObj.setInstance = this;
    ProfleMethodsObj.setProps = this.props;
    ProfleMethodsObj.setInstance = this;
    DynamicLinksMethodObj.setProps = this.props;
    DynamicLinksMethodObj.setInstance = this;
    HealthStatusMethodObj.setProps = this.props;
    HealthStatusMethodObj.setInstance = this;
    SharingMethodsObj.setProps = this.props;
    SharingMethodsObj.setInstance = this;
    WalkthroughMethodsObj.setProps = this.props;
    WalkthroughMethodsObj.setInstance = this;
    this.contactSharingModalRef = React.createRef();
    navigationService.navigation = this.props.navigation;
  }

  componentDidMount() {
    ProfleMethodsObj.onMountMethods();
    ProfleMethodsObj.addFCMToken();
    DynamicLinksMethodObj.handleInitialDynamicLink();
    ProfleMethodsObj.checkCompanyInvite();
    DynamicLinksMethodObj.subscribe();
    AppState.addEventListener('change', ProfleMethodsObj.handleAppStateChange);
    onNotificationReceived((remoteMsg) => {
      const data = remoteMsg.data;
      let source = appState.background;

      SharingMethodsObj.notificationReceived(source, data);
    });
    onInitialNotificationReceived((remoteMsg) => {
      if (!remoteMsg) {
        return;
      }

      const data = remoteMsg.data;

      SharingMethodsObj.initialNotificationReceived(data);
    });

    this.messagingUnsubscribe = onMessageReceived((remoteMsg) => {
      const data = remoteMsg.data;
      let source = appState.foreground;

      SharingMethodsObj.notificationReceived(source, data);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.healthTests !== this.props.healthTests) {
      SharingMethodsObj.setProps = this.props;
      HealthtestMethodsObj.setProps = this.props;
      DynamicLinksMethodObj.setProps = this.props;
      DynamicLinksMethodObj.setProps = this.props;
      HealthStatusMethodObj.setProps = this.props;
      WalkthroughMethodsObj.setProps = this.props;
    }
    if (
      prevProps.showVaccineModal !== this.props.showVaccineModal ||
      prevProps.healthTests !== this.props.healthTests
    ) {
      ProfleMethodsObj.setProps = this.props;
    }
  }
  componentWillUnmount() {
    DynamicLinksMethodObj.unsubscribe();
    AppState.removeEventListener(
      'change',
      ProfleMethodsObj.handleAppStateChange,
    );
    if (this.messagingUnsubscribe) {
      this.messagingUnsubscribe();
    }
  }

  render() {
    const {
      shareIdButton,
      disabledShareIdButton,
      shareIdButtonBGColorWhenNotDisabled,
    } = Style;
    const {
      healthTests,
      testTaken,
      temperature,
      screenVistedBefore,
      gettingProfileSharableLink,
      loadingImage,
      lastAddedVaccine,
      showVaccinePopUp,
      uploadingHealhtTestImage,
      isVerified,
    } = this.props;
    const {gettingCompanyDetails, acceptingSharingContactDetails} = this.state;
    return (
      <View style={Style.container}>
        <COverlay
          instance={this}
          source={'Profile'}
          instanceState={this.state}
          props={this.props}
          healthTestProp={healthTests}
        />
        <View style={[Style.scrollViewParentContainer]}>
          <ScrollView
            style={Style.scrollViewContainer}
            contentContainerStyle={Style.scrollContentContainer}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={ProfleMethodsObj._onRefresh}
              />
            }
            showsVerticalScrollIndicator={false}>
            <CUserImageView instance={this} />
            <View style={Style.dataContainer}>
              <View style={Style.dataContainer}>
                {testTaken ? (
                  <DataComponent
                    testID={testIds.addTestBtn}
                    SwitchTestID={testIds.TestSwitch}
                    isVerified={isVerified}
                    index={profileScreenRow.health}
                    instance={this}
                    props={this.props}
                    showInfoAlert={this.state.showInfoAlert}
                    isEnabled={this.state.isEnabled}
                  />
                ) : (
                  <NoDataComponent
                    testID={testIds.addTestBtn}
                    SwitchTestID={testIds.TestSwitch}
                    index={profileScreenRow.health}
                    instance={this}
                    props={this.props}
                    isEnabled={this.state.isEnabled}
                  />
                )}
              </View>
              <View />
              <View style={Style.underLine} />
              {temperature === '' ? (
                <NoDataComponent
                  testID={testIds.addTemperatureButton}
                  SwitchTestID={testIds.temperatureSwitch}
                  index={profileScreenRow.temperature}
                  instance={this}
                  props={this.props}
                  isEnabled={this.state.isEnabled}
                />
              ) : (
                <DataComponent
                  testID={testIds.addTemperatureButton}
                  SwitchTestID={testIds.temperatureSwitch}
                  index={profileScreenRow.temperature}
                  instance={this}
                  props={this.props}
                  showInfoAlert={this.state.showInfoAlert}
                  isEnabled={this.state.isEnabled}
                />
              )}
              <View style={Style.underLine} />
              {!lastAddedVaccine ? (
                <NoDataComponent
                  testID={testIds.addVaccine}
                  SwitchTestID={testIds.vaccineSwitch}
                  index={profileScreenRow.vaccine}
                  instance={this}
                  props={this.props}
                  isEnabled={this.state.isEnabled}
                />
              ) : (
                <DataComponent
                  testID={testIds.addVaccine}
                  SwitchTestID={testIds.vaccineSwitch}
                  index={profileScreenRow.vaccine}
                  instance={this}
                  props={this.props}
                  isVerified={lastAddedVaccine.is_verified}
                  showInfoAlert={this.state.showInfoAlert}
                  isEnabled={this.state.isEnabled}
                />
              )}
              <View style={Style.underLine} />
              <View />
              {this.state.showMeSignScanner && (
                <MeSignScanner
                  onRead={ProfleMethodsObj.showUserByMeSign}
                  onPlaceRead={ProfleMethodsObj.showContactDataSharingModal}
                  close={ProfleMethodsObj.hideMeSignScanner}
                />
              )}
              <Modal visible={this.state.error}>
                <ErrorView
                  style={Style.errorStyle}
                  errorText={translate('STRINGS.ERROR_CAMERA_PROFILE')}
                  onClose={ProfleMethodsObj.closeError}
                />
              </Modal>
              {!screenVistedBefore ? (
                <CWalkthorugh
                  testID={testIds.firstTut}
                  accessibilityLabel={testIds.firstTut}
                  step={this.state.step}
                  marginTop={WalkthroughMethodsObj.setMarginTopForWalkthrough(
                    this.state.step,
                  )}
                  left={WalkthroughMethodsObj.setMarginLeftForWalkthrough(
                    this.state.step,
                  )}
                />
              ) : null}
              {this.state.showUserQR && (
                <UserQR onPress={SharingMethodsObj.hideShareMeModal} />
              )}
            </View>
          </ScrollView>
        </View>
        {this.state.showShare && (
          <View style={Style.shareMenu}>
            <CButtonWithImage
              testID={testIds.shareMeBtn}
              accessibilityLabel={testIds.shareMeBtn}
              text={translate('STRINGS.SHARE_ME')}
              customeImageStyle={Style.shareMenuIcon}
              imagePath={LOCAL_PATH.SHARE_BLACK_ICON}
              buttonCustomStyle={Style.shareButton}
              buttonContainerStyle={[Style.shareMEMenuButton]}
              textStyle={[Style.shareMeMenuButtonText]}
              onPress={SharingMethodsObj.onShareProfileME}
            />
            <CButtonWithImage
              text={'Other Options'}
              customeImageStyle={[Style.shareMenuIcon]}
              buttonCustomStyle={Style.shareButton}
              imagePath={LOCAL_PATH.PLUS_BLACK_ICON}
              buttonContainerStyle={[Style.shareOtherOptionsButton]}
              textStyle={Style.shareOtherMenuButtonText}
              onPress={SharingMethodsObj.onShareProfileLink}
            />
          </View>
        )}
        <View
          style={Style.shareIdButtonContainer}
          ref={(ref) => {
            this.bottom = ref;
          }}
          onLayout={WalkthroughMethodsObj.setBottomPosition}>
          <CButtonWithImage
            testID={testIds.shareIDBtn}
            accessibilityLabel={testIds.shareIDBtn}
            text={translate('STRINGS.SHARE_MY_ID')}
            customeImageStyle={Style.shareMyIdIcon}
            imagePath={LOCAL_PATH.SHAREID_ICON}
            buttonContainerStyle={[
              shareIdButton,
              !testTaken
                ? disabledShareIdButton
                : shareIdButtonBGColorWhenNotDisabled,
            ]}
            buttonCustomStyle={Style.buttonCustomStyle}
            textStyle={Style.shareIdButtonTitle}
            onPress={SharingMethodsObj.onShare}
          />
        </View>

        <ContactDataSharingModal
          ref={this.contactSharingModalRef}
          onAccept={SharingMethodsObj.onShareContactDetailsAccept}
        />

        <MeSignAccessAsk
          show={this.props.showMeAccessAsk}
          name={this.props.meAccessAskName}
          accessGrantId={this.props.meAccessAskGrantId}
          hide={this.props.meAccessAskClose}
        />

        <CLoader
          loading={
            gettingProfileSharableLink ||
            gettingCompanyDetails ||
            acceptingSharingContactDetails
          }
        />
        {showVaccinePopUp && ProfleMethodsObj.returnEditableVaccineData()}
        {loadingImage && !uploadingHealhtTestImage && (
          <CProgress animated={true} indeterminate={true} />
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    userProfile: {
      uploadingHealhtTestImage,
      showVaccinePopUp,
      modalIndex,
      companyName,
      companyID,
      permissionAdded,
      permissionsRemoved,
      permissionProvidingCompany,
      removedAllCheck,
      associatedCompany,
      userInfo: {
        lastAddedVaccine,
        healthReport: {
          testTaken,
          testDate,
          infected,
          temperature,
          dateOfReading,
          oldTestDetails,
          preferred_measurement,
          isVerified,
        },
        username,
        userLocation,
        stats,
      },
      via,
      showTestInfo,
      showVaccineToOtherUser,
      screenVistedBefore,
      openedInitialDynamicLinkUserIds,
      gettingProfileSharableLink,
      loadingImage,
      showTemperature,
      meAccessAsk: {
        show: showMeAccessAsk,
        accessGrantId: meAccessAskGrantId,
        askingUserName: meAccessAskName,
      },
    },
    selectTempType: {
      decimalPart,
      fahrenheit,
      celciusDegrees,
      tempIntValue,
      error,
      tempDecValue,
      skip,
    },
    settingsReducer: errorToken,
    healthTestResults: {healthTestID},
  } = state;

  return {
    stats,
    companyID,
    tempSkipped: skip,
    modalIndex,
    permissionAdded,
    permissionsRemoved,
    removedAllCheck,
    companyName,
    testTaken,
    dateOfReading,
    associatedCompany,
    username,
    testDate,
    infected,
    showTestInfo,
    showTemperature,
    temperature,
    screenVistedBefore,
    preferred_measurement,
    oldTestDetails,
    userLocation,
    tempDecValue,
    error,
    via,
    decimalPart,
    fahrenheit,
    tempIntValue,
    celciusDegrees,
    details: state.signIn,
    profile: state.userProfile,
    feeling: state.feeling,
    healthTests: state.healthTest,
    openedInitialDynamicLinkUserIds,
    errorToken,
    gettingProfileSharableLink,
    loadingImage,
    healthTestID,
    showMeAccessAsk,
    meAccessAskGrantId,
    meAccessAskName,
    lastAddedVaccine,
    showVaccinePopUp,
    showVaccineToOtherUser,
    uploadingHealhtTestImage,
    isVerified,
    permissionProvidingCompany,
  };
};

const mapDispatchToProps = {
  getUserProfile: getUserDataAction,
  showTemperatureAction,
  profileVisitedBefore: profileVisitedBeforeAction,
  generateDeepLink: generateDeepLinkAction,
  editUserData: editUserDataAction,
  updateModalIndex: updateModalIndexAction,
  setTempType: setTempTypeAction,
  setTempIntVal: setTempIntValAction,
  setTempDecVal: setTempDecValAction,
  tempSkippedAction: tempSkippedAction,
  sendTempData: updateTemperatureAction,
  setFeeling: feelingSelectedAction,
  editHealthData: editHealthTestAction,
  addHealthDataFields: addHealthTestAction,
  updateTypeAndIndex: updateTypeAndIndexAction,
  deleteTestDetailRow: restHealthtTestDataAction,
  submitHealthTestData: submitHealthTestDataAction,
  updateHealthData: updateHealthDataAction,
  checkMissingFieldsInTestObject: checkHealthTestMissingFieldsAction,
  sendHealthStat: sendHealthStatAction,
  loading: loadingAction,
  uploadImageS3: uploadImageAction,
  getNotifications: getNotificationsAction,
  updateOpenedInitialDynamicLink: updateOpenedInitialDynamicLinkAction,
  showHealthTestInfoAction: showHealthTestInfoAction,
  getCompanyDetails: getCompanyDetailsAction,
  acceptShareContactDetails: acceptShareContactDetailsAction,
  updateHealthTestID: updateHealthTestIDAction,
  meAccessAskShow: meAccessAskShow,
  meAccessAskClose: meAccessAskClose,
  uploadVaccineImage: uploadVaccineImageAction,
  uploadVaccineDetails: uploadVaccineDetailsAction,
  showVaccinePopUpOnHome: showVaccinePopUpOnHomeAction,
  updateModalPermissionIndex: updateModalPermissionIndexAction,
  toggleVaccineSharing: toggleVaccineSharingAction,
  uploadHealthTestImage: uploadHealthTestImageAction,
  updateVerifyModalIndex: updateVerifyModalIndexAction,
  logout: logoutAction,
  StoreDeviceToken: StoreDeviceToken,
  getVaccineTypes: getVaccineTypesAction,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(connectActionSheet(Profile));
