import React from 'react';
import {Platform} from 'react-native';
import AsyncStorage, {AsyncConstants} from '../../../../utilities/AsyncStorage';

import {Constants, ImagePicker, HelperFunctions} from '../../../../utilities';
import {translate} from '../../../../Localization';

import {DynamicLinksMethodObj} from './dynamicLinkMethods';
import {logAnalyticsEvent, saveTokenFCM} from '../../../../utilities/Firebase';
import {axios} from '../../../../network/request';
import CVaccinePopUp from '../../vaccinesResults/vaccinePopups/editVaccineDetails';
import ModalsQueue from '../../../../services/ModalsQueue';
const {
  cameraError,
  sharingTypes,
  docTypes,
  LOCAL_PATH,
  analyticsIds,
  modalIds,
  URLS,
} = Constants;
const {imagePicker} = ImagePicker;
const {errorReportLogger} = HelperFunctions;

class ProfileMethods {
  constructor() {
    this.props = null;
    this.instance = null;
  }

  set setProps(props) {
    this.props = props;
  }

  set setInstance(instance) {
    this.instance = instance;
  }

  showPicker = (val) => {
    this.instance.setState({
      showPicker: val,
    });
  };

  onMountMethods() {
    if (!this?.props?.details?.token) {
      const error = new Error(
        'this.props.details.token not found in "onMountMethods" in profileMethods.js',
      );

      errorReportLogger(error);
      return;
    }

    const {
      details: {userID, token},
      getUserProfile,
      getVaccineTypes,
    } = this.props;
    let data = {
      userID: userID,
      token: token,
    };
    getUserProfile(data);
    getVaccineTypes();
  }
  addFCMToken = async () => {
    try {
      await saveTokenFCM(this.checkNotificationPermission);
    } catch (error) {
      errorReportLogger(error);
    }
  };
  showInfoAlert = () => {
    this.instance.setState({
      showInfoAlert: !this.instance.state.showInfoAlert,
    });
  };

  showCheckOutInfoPopup = () => {
    this.instance.setState({
      showCheckedinInfoPopUp: !this.instance.state.showCheckedinInfoPopUp,
    });
  };

  showCheckOutPopup = () => {
    this.instance.setState({
      showCheckoutConfirmationPopUp: !this.instance.state
        .showCheckoutConfirmationPopUp,
      showCheckedinInfoPopUp: false,
    });
  };

  openImagePickerOptionSheet = () => {
    const options = [
      translate('CAMERA_OPTIONS.TAKE_PHOTO'),
      translate('CAMERA_OPTIONS.LIBRARY'),
      translate('CAMERA_OPTIONS.CANCEL'),
    ];
    const cancelButtonIndex = 2;

    this.props.showActionSheetWithOptions(
      {
        useModal: true,
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        this.uploadImage(buttonIndex, docTypes.PROFILE);
      },
    );
  };
  uploadProfileImage = () => {
    this.openImagePickerOptionSheet();
  };

  uploadImage = async (imageSourceChoice, docType, callback) => {
    if (!this.props?.details?.token) {
      const error = new Error(
        'this.props.details.token not found in "uploadImage" in profileMethods.js',
      );

      errorReportLogger(error);
      return;
    }
    if (docType === docTypes.PROFILE) {
      this.props.loading(true);
    }
    if (docType === docTypes.HEALTH) {
      this.props.uploadHealthTestImage(true);
    }
    let accessToken = this.props.details.token;
    let userID = this.props.details.userID;
    imagePicker(imageSourceChoice, async (source) => {
      if (!source?.fileName) {
        if (docType === docTypes.PROFILE) {
          this.props.loading(false);
        }
        if (docType === docTypes.HEALTH) {
          this.props.uploadHealthTestImage(false);
        }
        return;
      }
      if (source === cameraError) {
        callback ? callback() : this.instance.setState({error: true});
        this.props.uploadHealthTestImage(false);
        return;
      }
      if (Platform.OS !== 'android' && source && source.uri) {
        source.fileName = source.uri.substring(source.uri.lastIndexOf('/') + 1);
      }
      source.fileName = source.fileName.replace(/ /g, '_').toLowerCase();
      this.props.uploadImageS3(source, accessToken, userID, docType);
    });
  };
  checkNotificationPermission = async (fcmDeviceToken) => {
    if (!fcmDeviceToken) {
      return;
    }
    try {
      const token = await AsyncStorage.getItemFromStorage(
        AsyncConstants.USER_TOKEN,
      );
      const config = {
        headers: {Authorization: `Bearer ${token}`},
      };
      let url = `${URLS.API_BASE_URL + URLS.CONTACT_DETAILS_URL}${
        URLS.DEVICE_TOKEN
      }`;
      await axios.put(
        url,
        {
          device_token: fcmDeviceToken,
        },
        config,
      );
      await AsyncStorage.setItemInStorage(
        AsyncConstants.DEVICE_TOKEN,
        fcmDeviceToken,
      );
      this.props.StoreDeviceToken(fcmDeviceToken);
    } catch (error) {
      errorReportLogger(error);
    }
  };
  _onRefresh = () => {
    if (!this?.props?.details?.token) {
      const error = new Error(
        'this.props.details.token not found in "_onRefresh" in profileMethods.js',
      );

      errorReportLogger(error);
      return;
    }
    this.instance.setState({refreshing: true});
    const {userID, token} = this.props.details;
    let data = {
      userID,
      token,
    };
    this.props.getUserProfile(data);
    this.instance.setState({refreshing: false});
  };

  closeError = () => {
    this.instance.setState({error: false});
  };

  showMeSignScanner = () => {
    const {
      profile: {idValidated},
    } = this.props;
    if (!idValidated) {
      return this.props.navigation.navigate('ValidateIdBeforeSharing');
    }
    this.instance.setState({
      showMeSignScanner: true,
    });
    logAnalyticsEvent(analyticsIds.scan_me_btn);
  };

  hideMeSignScanner = () => {
    this.instance.setState({
      showMeSignScanner: false,
    });
  };

  showUserByMeSign = (meId, signed) => {
    this.props.navigation.navigate('OtherUserProfile', {
      sharingType: sharingTypes.me,
      signed,
    });
    this.hideMeSignScanner();
  };

  gotoHealthTestDetails = () => {
    this.props.navigation.navigate('HealthDetails', {
      id: this.instance.state.healthTestId,
    });
  };
  goToVaccineDetails = () => {
    this.props.navigation.navigate('VaccineDetails', {
      id: this.instance.state.vaccineId,
    });
  };

  showContactDataSharingModal = (placeToken) => {
    DynamicLinksMethodObj.openContactSharingModal(placeToken);
    this.hideMeSignScanner();
  };

  getProfileImageBottomIcon = () => {
    const {stats} = this.props.profile.userInfo;
    const {overall = ''} = stats;
    if (overall === Constants.profileStatCodes.AMBER) {
      return LOCAL_PATH.amberStatFilled;
    }
    if (overall === Constants.profileStatCodes.GREEN) {
      return LOCAL_PATH.CONFIRMED_ICON;
    }
    if (overall === Constants.profileStatCodes.RED) {
      return LOCAL_PATH.subInfectedIcon;
    }
    return LOCAL_PATH.ADD_IMAGE_ICON;
  };

  checkCompanyInvite = async () => {
    const {getNotifications} = this.props;
    getNotifications();
  };
  showVaccineModal = (modalStatus) => {
    this.props.showVaccinePopUpOnHome(modalStatus);
  };
  returnEditableVaccineData = () => {
    const {showDatePicker, showVaccineModal} = this.instance.state;
    const screenName = this.props.route?.name;
    return (
      <CVaccinePopUp
        showModal={showVaccineModal}
        modal={showVaccineModal}
        isDatePickerVisible={showDatePicker}
        screenName={screenName}
      />
    );
  };
  toggleVaccineSharing = () => {
    const {
      details: {token, userID},
      showVaccineToOtherUser,
    } = this.instance.props;
    let data = {
      token: token,
      userID: userID,
      status: !showVaccineToOtherUser ? '1' : '0',
    };
    this.props.toggleVaccineSharing(data);
  };
  handleAppStateChange = (nextAppState) => {
    if (
      this.instance.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      ModalsQueue.hideModal({
        modalId: modalIds.MEQRCode,
        hideModalFunction: () => {
          this.props.updateModalIndex(null);
          this.instance.setState({showUserQR: false});
        },
      });
    }
    this.instance.setState({appState: nextAppState});
  };
}

export const ProfleMethodsObj = new ProfileMethods();
