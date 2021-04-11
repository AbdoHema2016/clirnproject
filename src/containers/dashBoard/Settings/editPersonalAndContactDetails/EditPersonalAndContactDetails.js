import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Style from './style';
import {connect} from 'react-redux';
import CLabel from '../../../../components/cLabel';
import CImage from '../../../../components/cImage';
import CButton from '../../../../components/cButton';
import CPicker from '../../../../components/cPicker';
import navigationService from '../../../../Navigation/NavigationService';
import CNavigationBackButton from '../../../../components/cNavigationBackButton';
import {Constants, Validations} from '../../../../utilities';
import {translate} from '../../../../Localization';

import {
  createContactDetailFields,
  createPersonalDetailFields,
} from './components/CData';
import {updateContactDetailsAction, getContactDetails} from './redux/actions';
import {getCountryListAction} from '../../../onBoarding/contactDetails/redux/actions';

const {LOCAL_PATH, testIds} = Constants;
const {validateEmail, validatePhonenumber} = Validations;

class EditPersonalAndContactDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnabled: false,
      watchID: null,
      location: {},
      showPicker: false,
      error: false,
      loading: false,
      fetchingData: false,
      editDetails: false,
      email: {value: '', state: ''},
      mobileNumber: {value: '', state: ''},
      countryCode: '',
      callingCode: '',
    };
    this.mobile = {};
    this.scrollView = React.createRef();
    navigationService.navigation = this.props.navigation;
  }

  componentDidMount() {
    const {getCountryList, navigation, getContactDetailsAction} = this.props;
    getCountryList();
    this.navigationOptions();
    this.unsubscribe = navigation.addListener('blur', () => {
      this.setState({
        editDetails: false,
      });
    });
    this.screenWillAppear = navigation.addListener('focus', () => {
      this.setState({
        fetchingData: true,
      });
      getContactDetailsAction({
        cb: ({email, mobile, countries}) => {
          this.setState({
            email: {value: email, state: ''},
            fetchingData: false,
            mobileNumber: {
              value: this.extractMobileNumber(countries.phone_code, mobile),
              state: '',
            },
            callingCode: countries.phone_code,
            countryCode: countries.country_code,
          });
        },
      });
    });
  }

  extractMobileNumber = (callingCode, mobileNumber) => {
    let mobileNumberWithoutCode = mobileNumber.substring(
      callingCode.toString().length + 1,
      mobileNumber.length,
    );
    return mobileNumberWithoutCode;
  };

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    if (this.screenWillAppear) {
      this.screenWillAppear();
    }
  }

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

  checkEmailError = () => {
    return !validateEmail(this.state.email.value);
  };

  returnEmailError = () => {
    if (!this.state.email.value) {
      return translate('LOGIN_SCREEN_STRINGS.ERROR_EMPTY_ID');
    }
    if (!validateEmail(this.state.email.value)) {
      return translate('LOGIN_SCREEN_STRINGS.ERROR_INVALID_ID');
    }
  };

  checkMobileError = () => {
    return !validatePhonenumber(this.state.mobileNumber.value);
  };

  returnMobileError = () => {
    if (!this.state.mobileNumber.value) {
      return translate('CONTACT_DETAILS_SCREEN_STRINGS.EMPTY_PHONE_NUMBER');
    }
    if (!validatePhonenumber(this.state.mobileNumber.value)) {
      return translate('CONTACT_DETAILS_SCREEN_STRINGS.INVALID_PHONE_NUMBER');
    }
  };

  editEmail = (email) => {
    this.setState({email: {value: email, state: 'Focused'}});
  };

  editMobile = (mobile) => {
    this.setState({mobileNumber: {value: mobile, state: 'Focused'}});
  };

  setMobileRef = (ref) => {
    this.mobile = ref;
  };
  focusMobile = () => {
    this.mobile.focus();
  };

  doneAction = () => {
    Keyboard.dismiss();
  };

  onCountryCodeSelect = ({countryCode, callingCode}) =>
    this.setState({countryCode, callingCode});

  createContactDetailFieldsFuntion = () => {
    const {
      email,
      mobileNumber,
      countryCode,
      fetchingData,
      editDetails,
    } = this.state;
    const {countryCodeList} = this.props;

    const props = {
      instance: this,
      editable: editDetails,
      checkEmailError: this.checkEmailError(),
      returnEmailError: this.returnEmailError(),
      checkMobileError: this.checkMobileError(),
      returnMobileError: this.returnMobileError(),
      editMobile: this.editMobile,
      email: email,
      countryCode,
      doneAction: this.doneAction,
      mobile: mobileNumber,
      editEmail: this.editEmail,
      setMobileRef: this.setMobileRef,
      focusMobile: this.focusMobile,
      fetchingData: fetchingData,
      countryCodeList,
      onCountryCodeSelect: this.onCountryCodeSelect,
    };
    return createContactDetailFields(props);
  };

  createPersonalDetailFieldsFunction = () => {
    const {title, firstName, middleName, lastName} = this.props;
    const props = {
      title: title,
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
    };
    return createPersonalDetailFields(props);
  };

  editDetailsAction = () => {
    this.setState(
      {
        editDetails: !this.state.editDetails,
        email: {
          value: this.state.email.value,
          state: !this.state.editDetails ? 'Active' : '',
        },
        mobileNumber: {
          value: this.state.mobileNumber.value,
          state: !this.state.editDetails ? 'Active' : '',
        },
      },
      () => {
        this.scrollView.current.scrollToEnd({animated: true});
      },
    );
  };

  updateDetails = () => {
    if (this.checkEmailError() || this.checkMobileError()) {
      return;
    }
    const {email, mobileNumber, countryCode, callingCode} = this.state;
    const {userID, access_token, mobileNumber: mob} = this.props;
    let details;
    if ('+' + callingCode + mobileNumber.value === mob) {
      details = {
        country_code: countryCode,
        email: email.value,
        step: 12,
      };
    } else {
      details = {
        country_code: countryCode,
        email: email.value,
        mobile: `+${callingCode + mobileNumber.value}`,
        step: 12,
      };
    }
    this.props.updateContactDetails(details, userID, access_token);
    this.setState({
      editDetails: !this.state.editDetails,
    });
  };
  render() {
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
            contentContainerStyle={Style.contentContainerStyle}
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}>
            <View style={Style.innerContainer}>
              <CLabel
                style={Style.appTitle}
                text={translate(
                  'PERSONAL_DETAILS_SCREEN_STRINGS.PERSONAL_DETAILS_LABEL',
                )}
              />
              <View style={Style.inputContainer}>
                {this.createPersonalDetailFieldsFunction()}
                <View style={Style.flexRow}>
                  <CLabel
                    style={[Style.appTitle, Style.contactDetailsTitle]}
                    text={translate(
                      'CONTACT_DETAILS_SCREEN_STRINGS.CONTACT_DETAILS_TITLE',
                    )}
                  />
                  <TouchableOpacity
                    testID={testIds.edit}
                    accessibilityLabel={testIds.edit}
                    style={Style.editButton}
                    onPress={this.editDetailsAction}>
                    <CImage
                      resizeMode={'center'}
                      imageStyle={Style.imgEditButton}
                      imagePath={
                        this.state.editDetails
                          ? LOCAL_PATH.EDIT_ENABLED_ICON
                          : LOCAL_PATH.EDIT_DISABLED_ICON
                      }
                    />
                  </TouchableOpacity>
                </View>
                {this.createContactDetailFieldsFuntion()}
              </View>
            </View>
            {this.state.editDetails && (
              <View style={Style.buttonsContainer}>
                <CButton
                  testID={testIds.updateContactDetails}
                  accessibilityLabel={testIds.updateContactDetails}
                  text={translate('CONTACT_DETAILS_SCREEN_STRINGS.UPDATE')}
                  textStyle={Style.whiteText}
                  buttonContainerStyle={Style.blackButton}
                  onPress={this.updateDetails}
                  loading={this.props.loading}
                  backgroundColor={Style.blackButton.backgroundColor}
                />
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
        {this.state.showPicker && Platform.OS === 'ios' ? (
          <CPicker
            selectedValue={
              this.props.title.value === ''
                ? translate('nameTitles')[0]
                : this.props.title.value
            }
            setTitle={(title) => this.editDetails('title', title)}
            showDatePicker={(val) => {
              this.showPicker(val);
            }}
            pickerItems={translate('nameTitles')}
          />
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    userProfile: {
      userInfo: {title, firstName, lastName, middleName, mobileNumber},
    },
    signIn: {userID, token},
    contactDetails: {countryCodeList},
    updateContactDetailsReducer: {loading},
  } = state;
  return {
    title,
    firstName,
    lastName,
    middleName,
    countryCodeList,
    userID,
    access_token: token,
    loading,
    mobileNumber,
  };
};

const mapDispatchToProps = {
  getCountryList: getCountryListAction,
  updateContactDetails: updateContactDetailsAction,
  getContactDetailsAction: getContactDetails,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditPersonalAndContactDetails);
