import React from 'react';
import {View, NativeEventEmitter, Alert, NativeModules} from 'react-native';
import Style from './style';
import CButtonWithImage from '../../components/cButtonWithImage';
import CButton from '../../components/cButton';
import {Constants} from '../../utilities';
import {translate} from '../../Localization';

import {HealthtestMethodsObj} from '../dashBoard/Home/Methods';
import ModalsQueue from '../../services/ModalsQueue';
import CImage from '../../components/cImage';
import CLabel from '../../components/cLabel';
import {connect} from 'react-redux';
import {getJumioCredentials} from '../onBoarding/verifyDocuments/redux/actions';
import {JumioFlowMethodsObj} from './verificationFlowMethods';
import {initiateJumioSDK} from '../Jumio/SDKMethods';

const {LOCAL_PATH, profileModals, testIds, jumioErrorCode, URLS} = Constants;
const {JumioMobileSDKNetverify} = NativeModules;

class JumioFailurePopUp extends React.PureComponent {
  closemodal = () => {
    ModalsQueue.hideModal({
      modalId: profileModals.jumioFailure,
      hideModalFunction: () =>
        HealthtestMethodsObj.showModal(profileModals.closeModal),
    });
  };
  componentDidMount() {
    this.setupNetVerifyListeners();
    if (this.props.access_token) {
      this.getJumioCredentials();
    }
  }
  getJumioCredentials = () => {
    const {access_token, fetchJumioCredentials} = this.props;
    fetchJumioCredentials({access_token});
  };
  tryJumioAgain = () => {
    this.closemodal();
    const {apiToken, apiSecret, dataCenter, userId} = this.props;
    return initiateJumioSDK({apiToken, apiSecret, dataCenter, userId});
  };

  componentDidUpdate(prevProps) {
    if (this.props.access_token !== prevProps.access_token) {
      this.getJumioCredentials();
    }
  }
  setupNetVerifyListeners = () => {
    this.emitterNetverify = new NativeEventEmitter(JumioMobileSDKNetverify);
    this.emitterNetverify.addListener(
      'EventDocumentData',
      (EventDocumentData) => {
        this.emitterNetverify.removeListener('EventDocumentData');
        this.emitterNetverify.removeListener('EventErrorNetverify');
      },
    );

    this.emitterNetverify.addListener(
      'EventErrorNetverify',
      (EventErrorNetverify) => {
        if (EventErrorNetverify.errorCode === jumioErrorCode) {
          return;
        }
        Alert.alert(
          translate('JUMIO_POPUP.JUMIO_ERROR'),
          JumioFlowMethodsObj.getJumioError(EventErrorNetverify.errorMessage),
        );
      },
    );
  };
  render() {
    const {} = this.props;
    return (
      <View style={Style.container}>
        <CButtonWithImage
          imagePath={LOCAL_PATH.CROSS_ICON}
          customeImageStyle={Style.closeImage}
          buttonContainerStyle={Style.closeBtnContainer}
          buttonCustomStyle={Style.closeBtn}
          onPress={this.closemodal}
        />
        <CImage
          resizeMode={'contain'}
          imagePath={LOCAL_PATH.JUMIO_FAILURE}
          imageStyle={Style.popupIcon}
        />
        <CLabel
          style={Style.popupTitle}
          text={translate('JUMIO_POPUP.FAILURE_TITLE')}
        />
        <CLabel
          style={Style.popupBody}
          text={translate('JUMIO_POPUP.FAILURE_BODY')}
          link={translate('JUMIO_POPUP.FAILURE_BODY_CUSTOMER_SUPPORT')}
          url={URLS.TESTED_ME_SUPPORT}
        />
        <CButton
          buttonContainerStyle={Style.cButtonContainerStyle}
          onPress={this.tryJumioAgain}
          text={translate('JUMIO_POPUP.TRY_AGAIN_BTN')}
          textStyle={Style.btnTxt}
          testID={testIds.btnJumioFailedTryAgain}
          accessibilityLabel={testIds.btnJumioFailedTryAgain}
        />
      </View>
    );
  }
}
const mapStateToProps = ({
  jumio: {apiSecret, apiToken, dataCenter, loading, error},
  signIn: {token, userID},
}) => {
  return {
    apiSecret,
    apiToken,
    dataCenter,
    loading,
    error,
    userId: userID,
    access_token: token,
  };
};

export default connect(mapStateToProps, {
  fetchJumioCredentials: getJumioCredentials,
})(JumioFailurePopUp);
