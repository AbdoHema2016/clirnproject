import {Linking} from 'react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {Constants, HelperFunctions} from '../../../../utilities';
import AsyncStorage, {AsyncConstants} from '../../../../utilities/AsyncStorage';
import ModalsQueue from '../../../../services/ModalsQueue';

const {sharingTypes, URLS, modalIds} = Constants;
const {showErrorMessage, getAPIError, getParamValue} = HelperFunctions;
class DynamicLinksMethod {
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

  subscribe = () => {
    Linking.addEventListener('url', this.handleUniversalLink);
    this.unsubscribe = dynamicLinks().onLink(this.handleDynamicLink);
  };

  unsubscribe = () => {
    Linking.removeEventListener('url', this.handleUniversalLink);
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  };

  getVenueToken = (url) => {
    const valueFromParam = getParamValue(url, 'venueToken');
    if (valueFromParam) {
      return valueFromParam;
    }
    const urlParts = url.split('/');
    const isVenueUniversalLink = urlParts[urlParts.length - 2] === 'enter';
    if (!isVenueUniversalLink) {
      return null;
    }
    return urlParts[urlParts.length - 1];
  };
  handleInitialDynamicLink = async () => {
    try {
      let link =
        (await Linking.getInitialURL()) ||
        (await dynamicLinks().getInitialLink()) ||
        (await AsyncStorage.getItemFromStorage(AsyncConstants.LINKING));

      if (link?.url) {
        const linkData = this.getLinkData(link.url);
        if (this.isDynamicLinkOpenedBefore(linkData)) {
          return;
        }
        if (!this.handleLinkData(linkData)) {
          return;
        }
        this.saveDynamicLinkOpening(linkData);
        await AsyncStorage.removeItemFromStorage(AsyncConstants.LINKING);
      }
    } catch (error) {
      showErrorMessage(getAPIError(error));
    }
  };
  handleDynamicLink = async (link) => {
    try {
      if (link?.url) {
        const linkData = this.getLinkData(link.url);
        this.handleLinkData(linkData);
      }
    } catch (error) {
      showErrorMessage(getAPIError(error));
    }
  };

  handleUniversalLink = (evt) => {
    const {url} = evt;
    const isDynamicLink =
      url.indexOf(URLS.TESTED_ME_DYNAMIC_LINK_DOMAIN) !== -1;

    if (isDynamicLink) {
      return;
    }

    this.handleDynamicLink({url});
  };

  openContactSharingModal = (venueToken) => {
    const {
      details: {token},
      getCompanyDetails,
      associatedCompany,
    } = this.props;

    ModalsQueue.showModal({
      modalId: modalIds.vanueScan,
      showModalFunction: () => {
        this.instance.setState({gettingCompanyDetails: true});
        getCompanyDetails({
          venueToken,
          accessToken: token,
          cb: ({
            companyName,
            qrToken,
            companyId,
            hasEntered,
            companyLocation,
          } = {}) => {
            this.instance.setState({gettingCompanyDetails: false});
            if (!companyName) {
              return;
            }
            this.instance.contactSharingModalRef.current?.show({
              companyName,
              qrToken,
              companyId,
              hasEntered,
              associatedCompany,
              companyLocation,
            });
          },
        });
      },
    });
  };

  getLinkData = (url) => {
    const userId = getParamValue(url, 'userId');
    const venueToken = this.getVenueToken(url);

    return {
      userId,
      venueToken,
    };
  };
  handleLinkData = (linkData) => {
    const {userId, venueToken} = linkData;
    if (userId) {
      ModalsQueue.showModal({
        modalId: modalIds.openOtherUserProfile,
        showModalFunction: () =>
          this.props.navigation.push('OtherUserProfile', {
            sharingType: sharingTypes.dynamicLink,
            userId,
          }),
      });

      return true;
    }
    if (venueToken) {
      this.openContactSharingModal(venueToken);
      return true;
    }
    return false;
  };
  isDynamicLinkOpenedBefore = (linkData) => {
    const {openedInitialDynamicLinkUserIds} = this.props;
    openedInitialDynamicLinkUserIds.includes(
      linkData.userId || linkData.venueToken,
    );
  };
  saveDynamicLinkOpening = (linkData) => {
    const {
      openedInitialDynamicLinkUserIds,
      updateOpenedInitialDynamicLink,
    } = this.props;
    const newValue = linkData.userId || linkData.venueToken;
    updateOpenedInitialDynamicLink([
      ...openedInitialDynamicLinkUserIds,
      newValue,
    ]);
  };
}
export const DynamicLinksMethodObj = new DynamicLinksMethod();
