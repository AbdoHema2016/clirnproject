import React from 'react';
import {View, KeyboardAvoidingView, Platform} from 'react-native';
import Style from './style';
import {connect} from 'react-redux';
import {forgottenPasswordAction, addEmailAction} from './redux/actions';
import CLabel from '../../../components/cLabel';
import CImage from '../../../components/cImage';
import CText from '../../../components/cTextField';
import CButton from '../../../components/cButton';
import {
  Constants,
  HelperFunctions,
  Validations,
  testIds,
} from '../../../utilities';
import {translate} from '../../../Localization';

import CNavigationBackButton from '../../../components/cNavigationBackButton';

const {LOCAL_PATH} = Constants;
const {intoHiddenEmail} = HelperFunctions;
const {validateEmail} = Validations;

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    const {isLoggedInUser} = props.route?.params ?? {};
    this.state = {
      checkValidation: false,
      email: {
        value: isLoggedInUser ? intoHiddenEmail(props.userEmail) : '',
        empty: !isLoggedInUser,
        isValid: !!isLoggedInUser,
        status: '',
      },
    };
  }

  componentDidMount() {
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
    this.props.navigation.pop();
    this.props.addEmail('', '');
  };

  forgotenPassword = () => {
    const {route, userEmail} = this.props;
    const {isLoggedInUser} = route?.params ?? {};
    if (isLoggedInUser) {
      return this.props.forgotPassword({email: userEmail});
    }
    this.setState({
      checkValidation: true,
    });
    let data = {
      email: this.state.email.value,
    };
    if (this.state.email.isValid) {
      this.props.forgotPassword(data);
    }
  };

  updateEmptyStatusOfEmailField = (email) => {
    return email.trim() === '' ? true : false;
  };

  checkIfEmailIsValid = (email) => {
    return validateEmail(email.trim());
  };

  editEmail = (email, status) => {
    this.setState({
      email: {
        value: email,
        empty: this.updateEmptyStatusOfEmailField(email),
        isValid: this.checkIfEmailIsValid(email),
        status: status,
      },
    });
  };

  getEmailErrorMessage = () => {
    const {
      email: {empty, isValid},
    } = this.state;
    const {enterValidEmail, enterEmail} = translate('forgotPassword');

    if (empty) {
      return enterEmail;
    }
    if (!isValid) {
      return enterValidEmail;
    }

    return null;
  };

  render() {
    const {isLoggedInUser} = this.props.route?.params ?? {};

    return (
      <View style={Style.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'android' ? 44 : 0}>
          <View style={Style.innerContainer}>
            <View style={Style.appTitleContainer}>
              <CImage type={'local'} imagePath={LOCAL_PATH.SPLASH_ICON} />
            </View>

            <View style={Style.inputContainer}>
              <CLabel style={Style.inputLabel} text={'Email'} />
              <CText
                testID={testIds.forgottenPasswordEmailField}
                accessibilityLabel={testIds.forgottenPasswordEmailField}
                state={this.state.email.status}
                placeHolderText={'Email'}
                value={this.state.email.value}
                editable={!isLoggedInUser}
                error={!this.state.email.isValid && this.state.checkValidation}
                keyboardType={'email-address'}
                onChangeText={(val) => this.editEmail(val, 'Focused')}
                onSubmitEditing={() =>
                  this.editEmail(this.state.email.value, 'Active')
                }
                errorMessage={this.getEmailErrorMessage()}
                autoCapitalize={'none'}
                textInputStyle={isLoggedInUser && Style.blurredTextInput}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        <View style={Style.buttonsContainer}>
          <CButton
            testID={testIds.sendLinkToEmailToResetPassword}
            accessibilityLabel={testIds.sendLinkToEmailToResetPassword}
            text={'Send'}
            textStyle={Style.whiteText}
            onPress={this.forgotenPassword}
            buttonContainerStyle={Style.blackButton}
            loading={this.props.email.loading}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({
  forgottenPassword,
  userProfile: {
    userInfo: {email},
  },
}) => {
  return {
    email: forgottenPassword,
    userEmail: email,
  };
};

const mapDispatchToProps = {
  forgotPassword: forgottenPasswordAction,
  addEmail: addEmailAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
