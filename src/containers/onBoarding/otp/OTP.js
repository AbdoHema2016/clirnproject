import React, {PureComponent} from 'react';
import {
  View,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import RNOtpVerify from 'react-native-otp-verify';
import CLabel from '../../../components/cLabel';
import CButton from '../../../components/cButton';
import CImage from '../../../components/cImage';
import {Constants} from '../../../utilities';
import {translate} from '../../../Localization';

import Style from './style';
import navigationService from '../../../Navigation/NavigationService';
import HelperFunctions from './helperFunctions';
import {
  sendOtpAction,
  otpFailureAction,
  resendOtpAction,
  resetOtpAction,
} from './redux/actions';
import CNavigationBackButton from '../../../components/cNavigationBackButton';

const {LOCAL_PATH, testIds} = Constants;

class OTP extends PureComponent {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    navigationService.navigation = this.props.navigation;
    HelperFunctions.setProps = this.props;
    HelperFunctions.setInstance = this;
    HelperFunctions.setState = this.state;
  }
  get initialState() {
    return {
      otp: '',
      disableResendButton: true,
      source: this.props.route.params ? this.props.route.params.source : '',
    };
  }
  componentDidMount() {
    if (Platform.OS === 'android') {
      this.focusListener = this.props.navigation.addListener('focus', () => {
        this.startListeningForOtp();
      });
    }
    HelperFunctions.disableResendButton();
    this.navigationOptions();
  }

  startListeningForOtp = () =>
    RNOtpVerify.getOtp()
      .then((p) => RNOtpVerify.addListener(this.otpHandler))
      .catch();

  otpHandler = (message) => {
    if (message) {
      const otp = /(\d{6})/g.exec(message)[1];
      this.setState({otp});
      RNOtpVerify.removeListener();
      Keyboard.dismiss();
    }
  };
  removeListener() {
    RNOtpVerify.removeListener();
  }
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      this.focusListener();
      this.removeListener();
    }
    this.props.resetOtp();
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
    if (this.state.source === 'Edit') {
      this.props.navigation.pop();
      return;
    }
    this.props.navigation.navigate('ContactStack');
  };
  render() {
    const {
      otp: {error, otp, loading},
      access_token,
      token,
    } = this.props;
    const {source} = this.state;
    return (
      <View style={Style.container}>
        <KeyboardAvoidingView
          style={Style.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Platform.OS === 'android' ? 44 : 0}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            style={Style.keyboardAvoidingView}>
            <View style={Style.dataContainer}>
              <View style={Style.innerContainer}>
                {this.state.source === 'Edit' ? (
                  <View style={Style.infoStageLabel} />
                ) : (
                  <CLabel style={Style.infoStageLabel} text={'3/7'} />
                )}
                <CLabel
                  style={Style.appTitle}
                  text={translate('STRINGS.OTP_HEADING')}
                />
                <View style={Style.buttonsContainer}>
                  {HelperFunctions.otpFeilds(error)}
                </View>

                {otp !== '' && !loading ? (
                  <View style={Style.errorMessageView}>
                    <CImage
                      resizeMode={'contain'}
                      imageStyle={Style.statusIcon}
                      imagePath={
                        error
                          ? LOCAL_PATH.ERROR_ICON
                          : LOCAL_PATH.CHECK_BOX_ICON
                      }
                    />
                    <CLabel
                      style={error ? Style.errorLabel : Style.noErrorLabel}
                      text={
                        error
                          ? translate('STRINGS.OTP_CODE_INCORRECT')
                          : translate('STRINGS.CODE_VERIFIED_SUCCESSFULLY')
                      }
                    />
                  </View>
                ) : null}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        {!this.state.disableResendButton && this.state.source !== 'Edit' && (
          <TouchableOpacity
            testID={testIds.resendOtp}
            accessibilityLabel={testIds.resendOtp}
            disabled={this.state.disableResendButton}
            style={Style.didnotReceiveOtpButton}
            onPress={HelperFunctions.resendOtp}>
            <CLabel
              numberOfLines={1}
              style={Style.didnotReceiveOtpText}
              text={
                error
                  ? translate('STRINGS.OTP_SEND_NEW')
                  : translate('STRINGS.OTP_MESSAGE_FAILED')
              }
            />
          </TouchableOpacity>
        )}
        <CButton
          testID={testIds.continue}
          accessibilityLabel={testIds.continue}
          text={translate('LOGIN_SCREEN_STRINGS.CONTINUE_LABEL')}
          textStyle={Style.whiteText}
          onPress={() => HelperFunctions.sendOtp(access_token, token, source)}
          buttonContainerStyle={Style.blackButton}
          loading={loading}
          disabled={HelperFunctions.checkIfAnyOTPFieldIsEmpty()}
          backgroundColor={
            HelperFunctions.checkIfAnyOTPFieldIsEmpty()
              ? Style.blackButton.backgroundColor
              : Style.greenButton.backgroundColor
          }
        />
      </View>
    );
  }
}
const mapStateToProps = ({
  otp,
  personalDetails: {access_token},
  signIn: {token},
}) => ({
  otp,
  access_token,
  token,
});
const mapDispatchToProps = {
  sendOtp: sendOtpAction,
  resendOtp: resendOtpAction,
  emptyOtp: otpFailureAction,
  resetOtp: resetOtpAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(OTP);
