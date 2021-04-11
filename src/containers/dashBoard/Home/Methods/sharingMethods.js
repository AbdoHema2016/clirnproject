import {HelperFunctions, Constants} from '../../../../utilities';
import {translate} from '../../../../Localization';

import AsyncStorage, {AsyncConstants} from '../../../../utilities/AsyncStorage';
import {navigate} from '../../../../Navigation/NavigationService';
import {ProfleMethodsObj} from './profileMethods';
import ModalsQueue from '../../../../services/ModalsQueue';
import {logAnalyticsEvent} from '../../../../utilities/Firebase';
import {request} from '../../../../network/request';
const {
  profileModals,
  pushCategories,
  appState,
  shareOption,
  modalIds,
  analyticsIds,
  URLS,
  requestMethods,
  notificationType,
  InvitationStatuses,
} = Constants;
const {showSuccessMessage, errorReportLogger} = HelperFunctions;
class SharingMethods {
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

  onShare = async () => {
    this.instance.setState({
      showShare: !this.instance.state.showShare,
    });
  };
  onShareProfileLink = () => this.onShareProfile(shareOption.PROFILELINK);
  onShareProfileME = () => this.onShareProfile(shareOption.MEQR);
  onShareProfile = async (shareType) => {
    this.instance.setState({showShare: false});
    const {
      profile: {idValidated},
      details: {userID, token},
    } = this.props;

    if (!idValidated) {
      return this.props.navigation.navigate('ValidateIdBeforeSharing');
    }

    if (shareType === shareOption.PROFILELINK) {
      let data = {userID, token};
      logAnalyticsEvent(analyticsIds.share_id_link);
      this.props.generateDeepLink(data);
    }
    if (shareType === shareOption.MEQR) {
      ModalsQueue.showModal({
        modalId: modalIds.MEQRCode,
        showModalFunction: () => {
          this.props.updateModalIndex(modalIds.MEQRCode);
          this.instance.setState({
            showUserQR: true,
          });
        },
      });
      logAnalyticsEvent(analyticsIds.share_id_ME, {
        userID: `${userID}`,
      });
    }
  };

  hideShareMeModal = () => {
    ModalsQueue.hideModal({
      modalId: modalIds.MEQRCode,
      hideModalFunction: () => {
        this.props.updateModalIndex(null);
        this.instance.setState({showUserQR: false});
      },
    });
  };

  onShareContactDetailsAccept = (contactSharingData) => {
    const {
      details: {token, userID},
      acceptShareContactDetails,
      companyID,
    } = this.props;
    const {hasEntered} = contactSharingData;
    this.instance.setState({acceptingSharingContactDetails: true});
    acceptShareContactDetails({
      ...contactSharingData,
      accessToken: token,
      userID,
      cb: (isSuccess) => {
        this.instance.setState({acceptingSharingContactDetails: false});
        if (isSuccess) {
          return navigate('ContactDataShared', {
            source: hasEntered ? 'VenueLeave' : 'VenueEnter',
            idMatched: contactSharingData.companyId === companyID,
          });
        }
      },
    });
  };
  checkUnRespondedInvites = (notifications) => {
    for (let notification of notifications) {
      if (
        notification.category === notificationType.companyUpdateModal &&
        (!notification.latest_status ||
          notification.latest_status === InvitationStatuses.deliveryIssue ||
          notification.latest_status === InvitationStatuses.emailReadByUser ||
          notification.latest_status ===
            InvitationStatuses.invitationDelivered ||
          notification.latest_status === InvitationStatuses.userHasApp)
      ) {
        let data = {
          category: notification.category.toString(),
          additional: notification.company,
          id: notification.invitation_id,
        };
        SharingMethodsObj.notificationReceived(appState.foreground, data);
        break;
      }
    }
  };
  sendDeliveryReport = async (invitationId) => {
    try {
      const access_token = await AsyncStorage.getItemFromStorage(
        AsyncConstants.USER_TOKEN,
      );
      let url = `${URLS.API_BASE_URL}${URLS.BUSINESS_EMPLOYEE_INVITATION}/${invitationId}/view`;
      request({
        method: requestMethods.put,
        url,
        data: {
          status: InvitationStatuses.viewed,
        },
        headers: {Authorization: `Bearer ${access_token}`},
      });
    } catch (error) {
      errorReportLogger(error);
    }
  };
  notificationReceived = (source, data) => {
    const {category, additional, id} = data;
    const {userLocation = '', associatedCompany = '', route = {}} = this.props;
    const screenName = route?.name;
    if (category && category === pushCategories.updateTemperature) {
      ModalsQueue.showModal({
        modalId: modalIds.addNewTemperature,
        showModalFunction: () => {
          this.instance.setState({showModal: true});
          this.props.updateModalIndex(profileModals.feelingUpdateModal);
        },
      });
    }
    if (category && category === pushCategories.updateHealthTest) {
      ModalsQueue.showModal({
        modalId: modalIds.profileModal,
        showModalFunction: () => {
          this.instance.setState({showModal: true});
          this.props.updateModalIndex(profileModals.feelingUpdateModal);
        },
      });
    }
    if (category && category === pushCategories.hikTemperatureUpdate) {
      showSuccessMessage(
        '',
        {
          duration: 4000,
        },
        translate('STRINGS.HIKTEMPUPDATE'),
      );
      ProfleMethodsObj._onRefresh();
      source === appState.background && navigate('Profile');
    }
    if (category && category === pushCategories.companyUpdate) {
      AsyncStorage.setItemInStorage(AsyncConstants.COMPANY_NAME, additional);
      AsyncStorage.setItemInStorage(AsyncConstants.INVITE_ID, id);

      ModalsQueue.showModal({
        modalId: modalIds.addRemoveCompany,
        showModalFunction: () =>
          this.instance.setState({showModal: true}, () => {
            this.props.updateModalIndex(
              profileModals.companyUpdateModal,
              additional,
              id,
            );
          }),
      });
      this.sendDeliveryReport(id);
    }
    if (
      category &&
      category === pushCategories.meNotification &&
      source !== appState.foreground
    ) {
      this.handleMeNotification(data);
    }
    if (category && category === pushCategories.jumioVerified) {
      ProfleMethodsObj._onRefresh();
      ModalsQueue.showModal({
        modalId: modalIds.JumioSuccess,
        showModalFunction: () => {
          this.instance.setState({showModal: true});
          this.props.updateModalIndex(profileModals.JumioSuccess);
        },
      });
    }

    if (category && category === pushCategories.jumioFailure) {
      ProfleMethodsObj._onRefresh();
      ModalsQueue.showModal({
        modalId: modalIds.jumioFailure,
        showModalFunction: () => {
          this.instance.setState({showModal: true});
          this.props.updateModalIndex(profileModals.jumioFailure);
        },
      });
    }

    if (category && category === pushCategories.permissionUpdate) {
      let permissions = JSON.parse(additional);
      const permissionAdded = permissions.added;
      const permissionRemoved = permissions.removed;
      ModalsQueue.showModal({
        modalId: modalIds.permissionUpdate,
        showModalFunction: () => {
          this.instance.setState({showModal: true});
          this.props.updateModalPermissionIndex(
            profileModals.permissionUpdate,
            permissionAdded,
            permissionRemoved,
          );
        },
      });
    }
    if (category && category === pushCategories.verificationPermissionUpdate) {
      let permissions = JSON.parse(additional);
      const companyName = permissions.company;
      ModalsQueue.showModal({
        modalId: modalIds.verificationPermissionUpdate,
        showModalFunction: () => {
          this.instance.setState({showModal: true});
          this.props.updateModalPermissionIndex(
            profileModals.verificationPermissionUpdate,
            '',
            '',
            companyName,
          );
        },
      });
      logAnalyticsEvent(analyticsIds.got_added_as_verifier, {
        userLocation,
        screenName,
        associatedCompany,
      });
    }
    if (
      category &&
      (category === pushCategories.healthTestApproved ||
        category === pushCategories.healthTestRejected) &&
      source === appState.background
    ) {
      this.props.navigation.navigate('HealthDetails', {id});
      return;
    }
    if (
      category &&
      category === pushCategories.healthTestRejected &&
      source === appState.foreground
    ) {
      ModalsQueue.showModal({
        modalId: modalIds.testRejected,
        showModalFunction: () => {
          this.instance.setState({
            showModal: true,
            healthTestId: data.id,
          });
          this.props.updateModalIndex(profileModals.rejectTest);
        },
      });
      return;
    }
    if (
      category &&
      category === pushCategories.healthTestApproved &&
      source === appState.foreground
    ) {
      ProfleMethodsObj._onRefresh();
      let testApproved = true;
      if (category === pushCategories.healthTestRejected) {
        testApproved = false;
      }
      ModalsQueue.showModal({
        modalId: modalIds.healthTestApproved,
        showModalFunction: () => {
          this.instance.setState({showModal: true});
          this.props.updateVerifyModalIndex(
            profileModals.healthTestApproved,
            id,
            testApproved,
          );
        },
      });
    }
    if (
      category &&
      (category === pushCategories.vaccineApproved ||
        category === pushCategories.vaccineRejected) &&
      source === appState.background
    ) {
      this.props.navigation.navigate('VaccineDetails', {id});
      return;
    }
    if (
      category &&
      category === pushCategories.vaccineApproved &&
      source === appState.foreground
    ) {
      ProfleMethodsObj._onRefresh();
      let testApproved = true;
      if (category === pushCategories.vaccineRejected) {
        testApproved = false;
      }
      ModalsQueue.showModal({
        modalId: modalIds.vaccineApproved,
        showModalFunction: () => {
          this.instance.setState({showModal: true});
          this.props.updateVerifyModalIndex(
            profileModals.vaccineApproved,
            id,
            testApproved,
          );
        },
      });
    }
    if (
      category &&
      category === pushCategories.vaccineRejected &&
      source === appState.foreground
    ) {
      ModalsQueue.showModal({
        modalId: modalIds.vaccineRejected,
        showModalFunction: () => {
          this.instance.setState({
            showModal: true,
            vaccineId: id,
          });
          this.props.updateModalIndex(profileModals.vaccineRejected);
        },
      });
      return;
    }
  };

  initialNotificationReceived = (data) => {
    const {category} = data;

    if (category && category === pushCategories.meNotification) {
      this.handleMeNotification(data);
    }
  };

  handleMeNotification = (data) => {
    const {additional} = data;
    const details = JSON.parse(additional);

    const {askingClient, accessGrantId} = details;

    this.props.meAccessAskShow(askingClient.signed, accessGrantId);
  };
}

export const SharingMethodsObj = new SharingMethods();
