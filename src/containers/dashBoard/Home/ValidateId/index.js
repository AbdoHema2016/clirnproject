import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  ActivityIndicator,
  Alert,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import Style from './style';
import {connect} from 'react-redux';
import CButton from '../../../../components/cButton';
import CImage from '../../../../components/cImage';
import {Constants} from '../../../../utilities';
import {translate} from '../../../../Localization';

import CNavigationBackButton from '../../../../components/cNavigationBackButton';
import {getJumioCredentials} from '../../../onBoarding/verifyDocuments/redux/actions';
import {JumioFlowMethodsObj} from '../../../Jumio/verificationFlowMethods';
const {JumioMobileSDKNetverify} = NativeModules;

const {LOCAL_PATH} = Constants;
import {initiateJumioSDK} from '../../../Jumio/SDKMethods';

class ValidateIdBeforeSharing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkValidation: false,
    };
  }

  componentDidMount() {
    this.navigationOptions();
    this.getJumioCredentials();
    this.setupNetVerifyListeners();
  }
  componentWillUnmount() {
    this.emitterNetverify.removeListener('EventDocumentData');
    this.emitterNetverify.removeListener('EventErrorNetverify');

    this.successSubscription.remove();
    this.errorSubscription.remove();
  }

  getJumioCredentials = () => {
    const {access_token, fetchJumioCredentials} = this.props;
    fetchJumioCredentials({access_token});
  };

  setupNetVerifyListeners = () => {
    this.emitterNetverify = new NativeEventEmitter(JumioMobileSDKNetverify);
    this.successSubscription = this.emitterNetverify.addListener(
      'EventDocumentData',
      (EventDocumentData) => {
        return this.props.navigation.replace('PendingVerification');
      },
    );

    this.errorSubscription = this.emitterNetverify.addListener(
      'EventErrorNetverify',
      (EventErrorNetverify) => {
        if (EventErrorNetverify.errorCode === 'G00000') {
          return;
        }

        Alert.alert(
          'Error!',
          JumioFlowMethodsObj.getJumioError(EventErrorNetverify.errorMessage),
        );
      },
    );
  };

  navigationOptions = () => {
    this.props.navigation.setOptions({
      title: '',
      tabBarVisible: false,
      headerTransparent: true,
      headerLeft: () => (
        <CNavigationBackButton
          title={'Profile'}
          tintColor={Style.tintColor}
          buttonBackgroundColor={Style.tintColor}
          backButtonAction={this.goBack}
        />
      ),
    });
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  openJumioFlow = () => {
    const {apiToken, apiSecret, dataCenter, userId} = this.props;
    return initiateJumioSDK({apiToken, apiSecret, dataCenter, userId});
  };

  render() {
    const {loading, error} = this.props;

    if (loading) {
      return (
        <View style={Style.loaderContainer}>
          <ActivityIndicator size={'large'} />
        </View>
      );
    } else if (error) {
      return (
        <SafeAreaView style={Style.errorContainer}>
          <Text style={Style.errorText}>
            Something went wrong. Please try again later
          </Text>

          <CButton
            text={'Retry'}
            buttonCustomStyle={Style.retryButton}
            textStyle={Style.retry}
            onPress={this.getJumioCredentials}
          />
        </SafeAreaView>
      );
    }

    return (
      <View style={Style.container}>
        <View style={Style.infoContainer}>
          <CImage
            type={'local'}
            imagePath={LOCAL_PATH.shareId}
            imageStyle={Style.image}
          />
          <Text style={Style.msg}>
            <Text style={Style.subTitle}>
              {translate('SHARE_ID_SCREEN.BODY_BEGIN')}
            </Text>
            <Text style={Style.greenWords}>
              {translate('SHARE_ID_SCREEN.ME')}
            </Text>
            <Text style={Style.subTitle}>
              {translate('SHARE_ID_SCREEN.BODY_MEDIUM')}
            </Text>
            <Text style={Style.greenWords}>
              {translate('SHARE_ID_SCREEN.CONTINUE')}
            </Text>
            <Text style={Style.subTitle}>
              {translate('SHARE_ID_SCREEN.BODY_END')}
            </Text>
          </Text>
        </View>
        <View style={Style.buttonsContainer}>
          <CButton
            text={translate('SHARE_ID_SCREEN.CONTINUE')}
            textStyle={Style.whiteText}
            onPress={this.openJumioFlow}
            buttonContainerStyle={Style.greenButton}
          />
          <CButton
            text={translate('SHARE_ID_SCREEN.NOTNOW')}
            textStyle={Style.notNowTxt}
            onPress={this.goBack}
            buttonContainerStyle={Style.notNowBtn}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({
  jumio: {apiSecret, apiToken, dataCenter, loading, error},
  signIn,
  userProfile,
}) => {
  return {
    apiSecret,
    apiToken,
    dataCenter,
    loading,
    error,
    access_token: signIn.token,
    userId: signIn.userID,
    profile: userProfile,
  };
};
export default connect(mapStateToProps, {
  fetchJumioCredentials: getJumioCredentials,
})(ValidateIdBeforeSharing);
