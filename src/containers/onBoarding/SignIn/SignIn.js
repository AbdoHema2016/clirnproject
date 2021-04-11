import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Alert,
} from 'react-native';
import Style from './style';
import {connect} from 'react-redux';
import {loginAction} from './redux/actions';
import {visitingProfileViaAction} from '../../dashBoard/Home/redux/actions';
import CLabel from '../../../components/cLabel';
import CImage from '../../../components/cImage';
import CText from '../../../components/cTextField';
import CPassword from '../../../components/cPassword';
import CButton from '../../../components/cButton';
import {Constants, HelperFunctions, Validations} from '../../../utilities';
import {translate} from '../../../Localization';

import navigationService from '../../../Navigation/NavigationService';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import AsyncStorage, {AsyncConstants} from '../../../utilities/AsyncStorage';
import {createSignature, ifKeyAlreadyExists} from '../../Biomitric/Biometrics';
import {BiometricSignAction} from '../../Biomitric/redux/actions';
import {getHash} from '../otp/OTPDetect';
const {showErrorMessage} = HelperFunctions;
const {LOCAL_PATH, testIds} = Constants;
const {validateEmail, validatePassword} = Validations;
class SignIn extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      checkValidation: false,
      username: {value: '', empty: true, isValid: false, status: ''},
      password: {
        value: '',
        empty: true,
        isValid: false,
        status: '',
        hidden: true,
      },
      biometricEnabled: false,
    };
    navigationService.navigation = this.props.navigation;
  }

  doLogin = () => {
    const {visitingProfileVia, login} = this.props;
    const {username, password} = this.state;
    if (
      username.value === 'gauravrana7777@gmail.com' &&
      Platform.OS === 'android'
    ) {
      getHash((cb) => {
        Alert.alert(cb);
      });
    }
    this.setState({checkValidation: true}, () => {
      if (!password.isValid || !username.isValid) {
        return;
      }

      login(username.value, password.value);
      visitingProfileVia('SignIn');
    });
  };

  goToBenefits = () => {
    this.props.navigation.navigate('Benefits');
  };

  goToForgotenPassword = () => {
    this.props.navigation.navigate('ForgotPassword');
  };

  biometricLogin = async () => {
    const {biometricSign} = this.props;
    try {
      let email = await AsyncStorage.getItemFromStorage(
        AsyncConstants.USER_EMAIL,
      );
      let device_token = await AsyncStorage.getItemFromStorage(
        AsyncConstants.DEVICE_TOKEN,
      );
      let biometric_id = await AsyncStorage.getItemFromStorage(
        AsyncConstants.BIOMETRIC_ID,
      );
      let signature = await createSignature(
        `${translate('LOGIN_SCREEN_STRINGS.CONTINUE_TO_LABEL')} ${email}`,
        email.toLowerCase(),
      );

      if (!signature) {
        throw new Error();
      }
      biometricSign({email, signature, device_token, biometric_id});
    } catch {
      showErrorMessage(translate('STRINGS.SOMETHING_WENT_WRONG'));
    }
  };
  editLoginFields = (label, value) => {
    const {username, password} = this.state;

    if (label === 'username') {
      this.setState({
        username: {
          value: value,
          status: 'Focused',
          empty: value.trim() === '' ? true : false,
          isValid: validateEmail(value.trim()),
        },
        password: {
          ...password,
          status: !password.value ? 'Active' : '',
        },
      });
      return;
    }
    this.setState({
      password: {
        ...password,
        value: value,
        status: 'Focused',
        empty: value.trim() === '' ? true : false,
        isValid: validatePassword(value.trim()),
      },
      username: {
        ...username,
        status: !username.value ? 'Active' : '',
      },
    });
    return;
  };

  focusPasswordField = () => {
    this.password.focus();
  };

  checkEmailError = () => {
    const {username} = this.state;

    if (!username.isValid && this.state.checkValidation) {
      return true;
    }
  };

  returnEmailError = () => {
    const {username} = this.state;

    if (username.empty) {
      return translate('LOGIN_SCREEN_STRINGS.ERROR_EMPTY_ID');
    }
    if (!username.isValid) {
      return translate('LOGIN_SCREEN_STRINGS.ERROR_INVALID_ID');
    }
  };

  checkPasswordError = () => {
    const {password} = this.state;
    const {checkValidation} = this.state;

    if (!password.isValid && checkValidation) {
      return true;
    }

    return false;
  };

  returnPasswordError = () => {
    const {password} = this.state;

    if (password.empty) {
      return translate('LOGIN_SCREEN_STRINGS.ERROR_EMPTY_PASSWORD');
    }
    if (!password.isValid) {
      return translate('LOGIN_SCREEN_STRINGS.ERROR_INVALID_PASSWORD');
    }
  };
  componentDidMount() {
    this.unsubscribe = dynamicLinks().onLink(this.handleDynamicLink);
    this.checkBiometric();
  }
  checkBiometric = async () => {
    let biometricEnabledCheck = await AsyncStorage.getItemFromStorage(
      AsyncConstants.BIOMETRIC_ENABLED,
    );
    if (biometricEnabledCheck) {
      this.setState({biometricEnabled: true});
    }
  };
  handleDynamicLink = async (link) => {
    AsyncStorage.setItemInStorage(AsyncConstants.LINKING, link);
  };
  componentWillUnmount() {
    this.unsubscribe();
  }
  hidePassword = () => {
    const {password} = this.state;

    this.setState({
      password: {
        ...password,
        hidden: !password.hidden,
      },
    });
  };
  render() {
    const {
      signInState: {loading},
    } = this.props;
    const {username, password, biometricEnabled} = this.state;
    return (
      <View style={Style.container}>
        <KeyboardAvoidingView
          style={Style.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'position' : 'height'}
          keyboardVerticalOffset={Style.keyboardVerticalOffset.top}>
          <View style={Style.innerContainer}>
            <View style={Style.appTitleContainer}>
              <CImage
                type={'local'}
                imagePath={LOCAL_PATH.SPLASH_ICON}
                resizeMode="center"
                imageStyle={Style.logo}
              />
            </View>

            <View style={Style.inputContainer}>
              <CLabel
                style={Style.inputLabel}
                text={translate('CONTACT_DETAILS_SCREEN_STRINGS.EMAIL_LABEL')}
              />
              <CText
                accessibilityLabel={testIds.emailSignIn}
                blurOnSubmit={false}
                onSubmitEditing={this.focusPasswordField}
                returnKeyType={'next'}
                placeHolderText={translate(
                  'CONTACT_DETAILS_SCREEN_STRINGS.EMAIL_LABEL',
                )}
                keyboardType={'email-address'}
                onChangeText={(val) => {
                  this.editLoginFields('username', val);
                }}
                state={username.status}
                error={this.checkEmailError()}
                errorMessage={this.returnEmailError()}
                autoCapitalize={'none'}
              />
              <CLabel
                style={Style.inputLabel}
                text={translate('LOGIN_SCREEN_STRINGS.PASSWORD_LABEL')}
              />
              <CPassword
                accessibilityLabel={testIds.passwordSignIn}
                blurOnSubmit={true}
                reference={(input) => {
                  this.password = input;
                }}
                editable={true}
                hidePasswordAction={this.hidePassword}
                hidePassword={password.hidden}
                placeHolderText={translate(
                  'LOGIN_SCREEN_STRINGS.PASSWORD_LABEL',
                )}
                state={password.status}
                customSuperContainer={Style.inputTextsupreContainerStyle}
                containerStyle={Style.inputTextStyle}
                returnKeyType={'done'}
                onChangeText={(val) => {
                  this.editLoginFields('password', val);
                }}
                onSubmitEditing={Keyboard.dismiss}
                error={this.checkPasswordError()}
                errorMessage={this.returnPasswordError()}
              />
              {ifKeyAlreadyExists && biometricEnabled && (
                <CLabel
                  onPress={this.biometricLogin}
                  style={Style.Biometric}
                  text={translate('LOGIN_SCREEN_STRINGS.LOGIN_TOUCH_FACE_ID')}
                />
              )}

              <CLabel
                accessibilityLabel={testIds.passwordForgotten}
                onPress={this.goToForgotenPassword}
                style={Style.forgotenPasswordLink}
                text={translate('LOGIN_SCREEN_STRINGS.PASSWORD_FORGOTTEN')}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        <View style={Style.buttonsContainer}>
          <CButton
            accessibilityLabel={testIds.signIn}
            text={translate('LOGIN_SCREEN_STRINGS.CONTINUE_LABEL')}
            textStyle={Style.whiteText}
            onPress={this.doLogin}
            loading={loading}
            buttonContainerStyle={Style.blackButton}
          />
          <CButton
            accessibilityLabel={testIds.continueToBenefits}
            text={translate('LOGIN_SCREEN_STRINGS.CREATE_ACCOUNT_LABEL')}
            textStyle={Style.blackText}
            marginTop={Style.whiteButton.marginTop}
            onPress={this.goToBenefits}
            backgroundColor={Style.whiteButton.backgroundColor}
            buttonContainerStyle={Style.whiteButton}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({signIn: signInState}) => ({signInState});

const mapDispatchToProps = {
  login: loginAction,
  visitingProfileVia: visitingProfileViaAction,
  biometricSign: BiometricSignAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
