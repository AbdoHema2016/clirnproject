import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Switch,
  Text,
} from 'react-native';
import Style from './Style';
import {connect} from 'react-redux';
import CLabel from '../../../../components/cLabel';
import CButton from '../../../../components/cButton';
import navigationService from '../../../../Navigation/NavigationService';
import CNavigationBackButton from '../../../../components/cNavigationBackButton';
import {HelperFunctions, testIds} from '../../../../utilities';
import {translate} from '../../../../Localization';

import {updatePasswordAction} from './redux/actions';
import HelperFunction from './helperFunctions';
import {
  sendPublicKeyAction,
  updatePublicKeyAction,
} from '../../../Biomitric/redux/actions';
import {checkIfBiometricIdIsSupported} from '../../../Biomitric/Biometrics';

const {showErrorMessage} = HelperFunctions;

class PasswordSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: {value: '', state: '', hidden: true},
      newPassword: {value: '', state: '', hidden: true},
      confirmNewPassword: {value: '', state: '', hidden: true},
      checkError: false,
      biometricEnabled: false,
      biometricAvailable: false,
    };
    HelperFunction.setProps = this.props;
    HelperFunction.setInstance = this;
    navigationService.navigation = this.props.navigation;
  }
  componentDidMount() {
    this.navigationOptions();
    HelperFunction.checkBiometricEnabled();
    this.checkifBiometricAvailable();
  }
  checkifBiometricAvailable = async () => {
    try {
      let biometricAvailable = await checkIfBiometricIdIsSupported();
      if (biometricAvailable) {
        this.setState({biometricAvailable: true});
      }
    } catch (error) {
      showErrorMessage(translate('STRINGS.SOMETHING_WENT_WRONG'));
    }
  };
  navigationOptions = () => {
    this.props.navigation.setOptions({
      title: '',
      headerTransparent: true,
      headerLeft: () => (
        <CNavigationBackButton
          grey={true}
          title={translate('BACK.BACK_BUTTON_TITLE')}
          titleStyle={Style.backButtonStyle}
          backButtonAction={this.goBack}
        />
      ),
    });
  };
  goBack = () => {
    this.props.navigation.pop();
  };
  goToForgotPasswordScreen = () => {
    this.props.navigation.navigate('ForgotPassword', {isLoggedInUser: true});
  };
  render() {
    let {biometricAvailable} = this.state;
    return (
      <View style={Style.container}>
        <KeyboardAvoidingView
          style={Style.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Style.keyboardVerticalOffset.top}>
          <ScrollView
            bounces={false}
            ref={this.scrollView}
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}>
            <View style={Style.innerContainer}>
              <CLabel
                style={Style.appTitle}
                text={translate('PASSWORD_SETTINGS.PASSWORD_TITLE')}
              />
              <View style={Style.inputContainer}>
                {HelperFunction.createPasswordFeilds()}
              </View>
            </View>
            <View style={Style.loginViaFaceIDView}>
              {biometricAvailable && (
                <>
                  <CLabel
                    style={Style.loginViaFaceIDLabel}
                    text={translate('PASSWORD_SETTINGS.LOGIN_USING_BIOMETRIC')}
                  />
                  <Switch
                    style={Style.switch}
                    onValueChange={HelperFunction.changeBiometric}
                    value={this.state.biometricEnabled}
                  />
                </>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={Style.passwordbuttonsContainer}>
          {!this.state.oldPassword.value ? (
            <Text
              style={Style.forgotPasswordLabel}
              onPress={this.goToForgotPasswordScreen}>
              {translate('LOGIN_SCREEN_STRINGS.PASSWORD_FORGOTTEN')}
            </Text>
          ) : (
            <CButton
              accessibilityLabel={testIds.updatePasswordBtn}
              testID={testIds.updatePasswordBtn}
              text={translate('CONTACT_DETAILS_SCREEN_STRINGS.UPDATE')}
              textStyle={Style.whiteText}
              onPress={HelperFunction.updatePassword}
              buttonContainerStyle={Style.blackButton}
              loading={this.props.loading}
              backgroundColor={Style.blackButton.backgroundColor}
            />
          )}
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  const {
    changePassword: {loading},
    signIn: {userID, token},
    userProfile: {
      userInfo: {email},
    },
  } = state;
  return {
    userID,
    access_token: token,
    loading,
    email,
  };
};
const mapDispatchToProps = {
  updatePassword: updatePasswordAction,
  sendPublicKey: sendPublicKeyAction,
  updatePublicKey: updatePublicKeyAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(PasswordSettings);
