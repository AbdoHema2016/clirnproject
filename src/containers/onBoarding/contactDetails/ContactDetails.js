import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Style from './style';
import {connect} from 'react-redux';
import {
  addContactDetailsAction,
  editContactDetailsAction,
  missingContactFieldsAction,
  privacyPolicyCheck,
  getCountryListAction,
} from './redux/actions';
import CLabel from '../../../components/cLabel';
import CChecBox from '../../../components/cCheckBox';
import CPhoneNum from '../../../components/cPhoneNumber';
import CText from '../../../components/cTextField';
import CButton from '../../../components/cButton';
import CPassword from '../../../components/cPassword';
import navigationService from '../../../Navigation/NavigationService';
import CNavigationBackButton from '../../../components/cNavigationBackButton';
import {Constants, testIds} from '../../../utilities';
import {translate} from '../../../Localization';

import HelperFunctions from './HelperFunctions';
const {LOCAL_PATH, defaultCountryCode, defaultCallingCode} = Constants;

class ContactDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {value: '', empty: true, state: ''},
      phone: {value: '', empty: true, state: ''},
      countryCode: {value: defaultCountryCode, empty: false, state: ''},
      callingCode: defaultCallingCode,
      password: {value: '', empty: true, state: '', hidden: true},
    };
    HelperFunctions.setInstance = this;
    HelperFunctions.setProps = this.props;
    this.previousActiveField = null;
    navigationService.navigation = this.props.navigation;
  }

  componentDidMount() {
    this.props.getCodeList();
    this.navigationOptions();
  }

  navigationOptions = () => {
    this.props.navigation.setOptions({
      title: '',
      headerTransparent: true,
      headerLeft: () => (
        <CNavigationBackButton
          title={translate('BACK.BACK_BUTTON_TITLE')}
          backButtonAction={HelperFunctions.goBack}
        />
      ),
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.contactDetails !== this.props.contactDetails) {
      HelperFunctions.setProps = this.props;
    }
  }
  onCountryCodeSelect = ({countryCode, callingCode}) => {
    this.setState({callingCode});
    HelperFunctions.editDetails('countryCode', countryCode);
  };
  focusPassword = () => this.password.focus();

  render() {
    const {
      contactDetails: {
        missingFields,
        error,
        policyChecked,
        loading,
        countryCodeList,
      },
    } = this.props;

    const {email, phone, countryCode, password} = this.state;
    return (
      <View style={Style.container}>
        <KeyboardAvoidingView
          style={Style.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Style.keyboardVerticalOffset.top}>
          <ScrollView
            keyboardDismissMode={true}
            bounces={false}
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}>
            <View>
              <View style={Style.innerContainer}>
                <CLabel
                  style={Style.infoStageLabel}
                  text={translate(
                    'CONTACT_DETAILS_SCREEN_STRINGS.SCREEN_NUMBER',
                  )}
                />
                <CLabel
                  style={Style.appTitle}
                  text={translate(
                    'CONTACT_DETAILS_SCREEN_STRINGS.CONTACT_DETAILS_TITLE',
                  )}
                />
                <View style={Style.inputContainer}>
                  <CLabel
                    style={Style.inputLabel}
                    text={
                      translate('CONTACT_DETAILS_SCREEN_STRINGS.EMAIL_LABEL') +
                      '*'
                    }
                  />
                  <CText
                    testID={testIds.addEmail}
                    accessibilityLabel={testIds.addEmail}
                    reference={(input) => {
                      this.email = input;
                    }}
                    blurOnSubmit={false}
                    onBlur={() =>
                      HelperFunctions.setPreviousActiveFieldStatus(this.email)
                    }
                    onSubmitEditing={HelperFunctions.focusPhoneNumber}
                    returnKeyType={'next'}
                    state={email.state}
                    placeHolderText={translate(
                      'CONTACT_DETAILS_SCREEN_STRINGS.EMAIL_LABEL',
                    )}
                    value={email.value}
                    error={
                      (email.empty && missingFields) ||
                      (error !== '' && error?.email)
                    }
                    keyboardType={'email-address'}
                    onChangeText={(val) =>
                      HelperFunctions.editDetails('email', val, '')
                    }
                    errorMessage={
                      error !== '' && error?.email
                        ? error?.email
                        : translate('LOGIN_SCREEN_STRINGS.ERROR_INVALID_ID')
                    }
                    autoCapitalize={'none'}
                  />

                  <CLabel
                    style={Style.inputLabel}
                    text={
                      translate(
                        'CONTACT_DETAILS_SCREEN_STRINGS.PHONE_NUMBER_LABEL',
                      ) + '*'
                    }
                  />
                  <CPhoneNum
                    testID={testIds.phone}
                    accessibilityLabel={testIds.phone}
                    code={countryCode.value}
                    countryCodeList={countryCodeList}
                    onCountryCodeSelect={this.onCountryCodeSelect}
                    editable={true}
                    onSubmitEditing={this.focusPassword}
                    reference={(input) => {
                      this.phonenumber = input;
                    }}
                    returnKeyType={'next'}
                    state={phone.state}
                    onBlur={() =>
                      HelperFunctions.setPreviousActiveFieldStatus(
                        this.phonenumber,
                      )
                    }
                    placeHolderText={'_ _ _ _ _ _ _ _ _ _'}
                    value={phone.value}
                    maxLength={11}
                    error={
                      (phone.empty && missingFields) ||
                      (error !== '' && error?.mobile)
                    }
                    onChangeText={(val) =>
                      HelperFunctions.editDetails('mobile', val, '')
                    }
                    errorMessage={
                      error !== '' && error?.mobile
                        ? error?.mobile
                        : translate(
                            'CONTACT_DETAILS_SCREEN_STRINGS.EMPTY_PHONE_NUMBER',
                          )
                    }
                    keyboardType={'phone-pad'}
                    accessoryViewLabel={translate('walkthrough.NEXT')}
                    blurOnSubmit={false}
                  />

                  <CLabel
                    style={Style.inputLabel}
                    text={
                      translate('LOGIN_SCREEN_STRINGS.PASSWORD_LABEL') + '*'
                    }
                  />
                  <CPassword
                    testID={testIds.addPassword}
                    accessibilityLabel={testIds.addPassword}
                    blurOnSubmit={true}
                    reference={(input) => {
                      this.password = input;
                    }}
                    onBlur={() =>
                      HelperFunctions.setPreviousActiveFieldStatus(
                        this.password,
                      )
                    }
                    onSubmitEditing={HelperFunctions.submitPasswordEditing}
                    editable={true}
                    value={password.value}
                    hidePasswordAction={HelperFunctions.hidePassword}
                    hidePassword={password.hidden}
                    placeHolderText={translate(
                      'LOGIN_SCREEN_STRINGS.PASSWORD_LABEL',
                    )}
                    state={password.state}
                    customSuperContainer={Style.inputTextsupreContainerStyle}
                    containerStyle={Style.inputTextStyle}
                    returnKeyType={'done'}
                    onChangeText={(val) =>
                      HelperFunctions.editDetails('password', val, '')
                    }
                    error={password.empty && missingFields}
                    errorMessage={translate(
                      'LOGIN_SCREEN_STRINGS.ERROR_INVALID_PASSWORD',
                    )}
                  />

                  <View style={Style.privacyPolicyContainer}>
                    <CChecBox
                      testID={testIds.checkBox}
                      accessibilityLabel={testIds.checkBox}
                      state={policyChecked}
                      textStyle={Style.whiteText}
                      buttonContainerStyle={Style.blackButton}
                      onPress={HelperFunctions.privacyPolicyAction}
                      imagePath={
                        policyChecked
                          ? LOCAL_PATH.PRIVACY_POLICY_CHECKED_ICON
                          : LOCAL_PATH.BLANK_CHECK_BOX_ICON
                      }
                    />
                    <Text
                      style={
                        policyChecked
                          ? Style.IAgreeLabel
                          : Style.IAgreeUncheckedLabel
                      }>
                      {translate('CONTACT_DETAILS_SCREEN_STRINGS.AGREE_LABEL')}{' '}
                    </Text>
                    <TouchableOpacity
                      onPress={HelperFunctions.navToPrivacy}
                      style={Style.privacyPolicyBtn}>
                      <Text
                        style={[
                          policyChecked
                            ? Style.privacyPolicyChecked
                            : Style.privacyPolicyUnchecked,
                          Style.privacyPolicyTxt,
                        ]}>
                        {translate(
                          'CONTACT_DETAILS_SCREEN_STRINGS.PRIVACY_POLICY_LABEL',
                        )}{' '}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={HelperFunctions.navToTerms}
                    style={Style.termsAndConditionsContainer}>
                    <Text>& </Text>
                    <Text
                      style={[
                        policyChecked
                          ? Style.privacyPolicyChecked
                          : Style.privacyPolicyUnchecked,
                        Style.TermsCondsTxt,
                      ]}>
                      {translate(
                        'CONTACT_DETAILS_SCREEN_STRINGS.T_AND_C_LABEL',
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={Style.buttonsContainer}>
          <CButton
            testID={testIds.continue}
            accessibilityLabel={testIds.continue}
            text={translate('LOGIN_SCREEN_STRINGS.CONTINUE_LABEL')}
            textStyle={Style.whiteText}
            buttonContainerStyle={Style.blackButton}
            onPress={HelperFunctions.addDetails}
            loading={loading}
            disabled={loading}
            backgroundColor={Style.blackButton.backgroundColor}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    personalDetails: {access_token, id},
  } = state;
  return {
    userId: id,
    access_token,
    contactDetails: state.contactDetails,
  };
};

const mapDispatchToProps = {
  editContactDetails: editContactDetailsAction,
  addContactetails: addContactDetailsAction,
  missingContactFields: missingContactFieldsAction,
  policyCheck: privacyPolicyCheck,
  getCodeList: getCountryListAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetails);
