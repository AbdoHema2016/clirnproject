import React, {PureComponent} from 'react';
import {
  Text,
  View,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  NativeModules,
  NativeEventEmitter,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import {signUpStepAction} from '../personalDetails/redux/actions';
import AsyncStorage, {AsyncConstants} from '../../../utilities/AsyncStorage';
import Style from './style/style';
import CLabel from '../../../components/cLabel';
import {Constants} from '../../../utilities';
import {initiateJumioSDK} from '../../Jumio/SDKMethods';
import {translate} from '../../../Localization';

import CButton from '../../../components/cButton';
import {getJumioCredentials} from './redux/actions';
import CNavigationBackButton from '../../../components/cNavigationBackButton';
import {resetOtpAction} from '../otp/redux/actions';
import {logAnalyticsEvent} from '../../../utilities/Firebase';
import {JumioFlowMethodsObj} from '../../Jumio/verificationFlowMethods';
const {JumioMobileSDKNetverify} = NativeModules;
const {LOCAL_PATH, signUpSteps, testIds, analyticsIds} = Constants;

class VerifyDocuments extends PureComponent {
  componentDidMount() {
    this.setupNetVerifyListeners();
    if (this.props.access_token) {
      this.getJumioCredentials();
    }
    this.navigationOptions();
  }

  navigationOptions = () => {
    this.props.navigation.setOptions({
      title: '',
      headerTransparent: true,
      headerLeft: () => (
        <CNavigationBackButton
          title={translate('BACK.BACK_BUTTON_TITLE')}
          backButtonAction={this.goBack}
        />
      ),
    });
  };

  goBack = () => {
    this.props.navigation.navigate('ContactStack');
    this.props.resetOtpAction();
  };

  getJumioCredentials = () => {
    const {access_token, fetchJumioCredentials} = this.props;
    fetchJumioCredentials({access_token});
  };

  componentWillUnmount() {
    this.emitterNetverify.removeAllListeners('EventDocumentData');
    this.emitterNetverify.removeAllListeners('EventErrorNetverify');
  }
  componentDidUpdate(prevProps) {
    if (this.props.access_token !== prevProps.access_token) {
      this.getJumioCredentials();
    }
  }

  onSkipPress = () => {
    this.props.signUpStepAction('5');
    AsyncStorage.setItemInStorage(AsyncConstants.STEP, signUpSteps.Feeling);
    this.props.navigation.navigate('Feeling');
    logAnalyticsEvent(analyticsIds.jumio_skipped);
  };
  setupNetVerifyListeners = () => {
    this.emitterNetverify = new NativeEventEmitter(JumioMobileSDKNetverify);

    this.emitterNetverify.addListener(
      'EventDocumentData',
      (EventDocumentData) => {
        this.props.signUpStepAction('5');
        AsyncStorage.setItemInStorage(AsyncConstants.STEP, signUpSteps.Feeling);
        this.props.navigation.replace('Feeling');
        this.emitterNetverify.removeListener('EventDocumentData');
        this.emitterNetverify.removeListener('EventErrorNetverify');
      },
    );

    this.emitterNetverify.addListener(
      'EventErrorNetverify',
      (EventErrorNetverify) => {
        this.emitterNetverify.removeListener('EventDocumentData');
        this.emitterNetverify.removeListener('EventErrorNetverify');
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
  openJumioFlow = () => {
    const {apiToken, apiSecret, dataCenter, userId} = this.props;
    logAnalyticsEvent(analyticsIds.jumio_started);
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
            {translate('STRINGS.SOMETHING_WENT_WRONG')}
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
        <KeyboardAvoidingView
          style={Style.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'android' ? 44 : 0}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={Style.innerContainer}>
              <CLabel style={Style.infoStageLabel} text={'4/7'} />
              <CLabel style={Style.pageTitle} text={'ID Verification'} />
              <CLabel
                style={Style.pageSubTitle}
                text={translate('STRINGS.VERIFICATION_MSG')}
              />
              <View style={Style.verifyIconContainer}>
                <Image source={LOCAL_PATH.VERIFY_DOC} />
              </View>
              <View style={Style.footerContainer}>
                <CButton
                  text={'Continue'}
                  textStyle={Style.whiteText}
                  onPress={this.openJumioFlow}
                  buttonContainerStyle={Style.blackButton}
                />
                <Text
                  accessible={true}
                  testID={testIds.skip}
                  accessibilityLabel={testIds.skip}
                  style={Style.skipForNow}
                  onPress={this.onSkipPress}>
                  {translate('STRINGS.SKIP')}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = ({
  jumio: {apiSecret, apiToken, dataCenter, loading, error},
  signIn,
  personalDetails: {access_token},
}) => {
  return {
    apiSecret,
    apiToken,
    dataCenter,
    loading,
    error,
    access_token,
    userId: signIn.userID,
  };
};

export default connect(mapStateToProps, {
  fetchJumioCredentials: getJumioCredentials,
  signUpStepAction,
  resetOtpAction,
})(VerifyDocuments);
