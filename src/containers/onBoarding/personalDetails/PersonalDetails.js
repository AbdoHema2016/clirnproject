import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
} from 'react-native';
import Style from './style';
import {connect} from 'react-redux';
import {
  addPersonalDetailsAction,
  editPersonalDetailsAction,
  missingFieldsAction,
} from './redux/actions';
import CLabel from '../../../components/cLabel';
import CButtonWithImage from '../../../components/cButtonWithImage';
import CText from '../../../components/cTextField';
import CButton from '../../../components/cButton';
import CPicker from '../../../components/cPicker';
import navigationService from '../../../Navigation/NavigationService';
import {
  InitialFunctionCallFromApp,
  Constants,
  HelperFunctions,
  testIds,
} from '../../../utilities';
import {translate} from '../../../Localization';

import CNavigationBackButton from '../../../components/cNavigationBackButton';
import {logAnalyticsEvent} from '../../../utilities/Firebase';

const {LOCAL_PATH, analyticsIds} = Constants;
const {deviceToken} = InitialFunctionCallFromApp;
const {intoWordCase} = HelperFunctions;

class PersonalDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnabled: false,
      watchID: null,
      location: {},
      showPicker: false,
      error: false,
      loading: false,
    };
    this.nextextInputRef = {};
    navigationService.navigation = this.props.navigation;
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
    this.props.navigation.navigate('Benefits');
  };

  showPicker = (title) => {
    this.setState(
      {
        showPicker: !this.state.showPicker,
      },
      () => {
        if (title !== 'hide') {
          this.editDetails('title', title);
        }
      },
    );
  };

  setDetailsValue(label, matchlabelwith, value, state) {
    return label === matchlabelwith ? value : state;
  }

  setDetailsState(label, matchlabelwith, value) {
    return label === matchlabelwith ? 'Focused' : value !== '' ? 'Active' : '';
  }

  editDetails = (label, value) => {
    let personalDetails = {
      title: {
        value: this.setDetailsValue(
          label,
          'title',
          value,
          this.props.details.title.value,
        ),
        state: this.setDetailsState(
          label,
          'title',
          this.props.details.title.value,
        ),
      },
      first_name: {
        value: this.setDetailsValue(
          label,
          'first_name',
          intoWordCase(value),
          this.props.details.first_name.value,
        ),
        state: this.setDetailsState(
          label,
          'first_name',
          this.props.details.first_name.value,
        ),
      },
      middle_name: {
        value: this.setDetailsValue(
          label,
          'middle_name',
          intoWordCase(value),
          this.props.details.middle_name.value,
        ),
        state: this.setDetailsState(
          label,
          'middle_name',
          this.props.details.middle_name.value,
        ),
      },
      last_name: {
        value: this.setDetailsValue(
          label,
          'last_name',
          intoWordCase(value),
          this.props.details.last_name.value,
        ),
        state: this.setDetailsState(
          label,
          'last_name',
          this.props.details.last_name.value,
        ),
      },
    };
    this.props.editPersonalDetails(personalDetails);
  };

  addDetails = () => {
    deviceToken((token) => {
      const {
        details: {middle_name, title, first_name, last_name},
      } = this.props;

      const personalDetails = {
        title: title.value,
        first_name: first_name.value.trim(),
        last_name: last_name.value.trim(),
        device_token: token || null,
        device: Platform.OS,
        step: 1,
      };

      if (!middle_name.empty) {
        personalDetails.middle_name = middle_name.value.trim();
      }

      if (title.empty || first_name.empty || last_name.empty) {
        this.props.missingFields(true);
      } else {
        this.props.missingFields(false);
        this.props.addPersonalDetails(personalDetails);
        logAnalyticsEvent(analyticsIds.finish_personal_details);
      }
    });
  };

  toggleSwitch = () => {
    this.setState(
      {
        isEnabled: !this.state.isEnabled,
      },
      () => {
        this.getAccessToLocation();
      },
    );
  };

  checkFirstnameError = () => {
    if (
      this.props.details.first_name?.empty &&
      this.props.details.missingFields
    ) {
      return true;
    }
    if (this.props.error !== '' && this.props.error?.first_name) {
      return true;
    }
  };

  returnFirstnameError = () => {
    if (
      this.props.details.first_name?.empty &&
      this.props.details.missingFields
    ) {
      return translate('PERSONAL_DETAILS_SCREEN_STRINGS.ERROR_ENTER_FIRSTNAME');
    }
    if (this.props.error !== '' && this.props.error?.first_name) {
      return this.props.error.first_name[0];
    }
  };

  checkLastnameError = () => {
    if (
      this.props.details.last_name?.empty &&
      this.props.details.missingFields
    ) {
      return true;
    }
    if (this.props.error !== '' && this.props.error?.last_name) {
      return true;
    }
  };

  returnLastnameError = () => {
    if (
      this.props.details.last_name?.empty &&
      this.props.details.missingFields
    ) {
      return translate('PERSONAL_DETAILS_SCREEN_STRINGS.ERROR_ENTER_LASTNAME');
    }
    if (this.props.error !== '' && this.props.error?.last_name) {
      return this.props.error.last_name[0];
    }
  };

  checkMiddlenameError = () => {
    if (this.props.error !== '' && this.props.error?.middle_name) {
      return true;
    }
  };

  returnMiddlenameError = () => {
    if (this.props.error !== '' && this.props.error?.middle_name) {
      return this.props.error.middle_name[0];
    }
  };

  onTitleClicked = () => {
    Keyboard.dismiss();
    this.showPicker('hide');
  };

  focusMiddleName = () => {
    this.middlename.focus();
  };

  focusLastName = () => {
    this.lastname.focus();
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
            alwaysBounceVertical={false}
            showsVerticalScrollIndicator={false}>
            <View style={Style.innerContainer}>
              <CLabel
                style={Style.infoStageLabel}
                text={translate(
                  'PERSONAL_DETAILS_SCREEN_STRINGS.SCREEN_NUMBER',
                )}
              />
              <CLabel
                style={Style.appTitle}
                text={translate(
                  'PERSONAL_DETAILS_SCREEN_STRINGS.PERSONAL_DETAILS_LABEL',
                )}
              />
              <View style={Style.inputContainer}>
                <CLabel
                  style={Style.inputLabel}
                  text={
                    translate('PERSONAL_DETAILS_SCREEN_STRINGS.TITLE_LABEL') +
                    '*'
                  }
                />
                {Platform.OS === 'ios' ? (
                  <CButtonWithImage
                    testID={testIds.title}
                    accessibilityLabel={testIds.title}
                    imagePath={LOCAL_PATH.DROP_DOWN_ICON}
                    onPress={this.onTitleClicked}
                    state={this.props.details.title.state}
                    error={
                      this.props.details.title.empty &&
                      this.props.details.missingFields
                    }
                    textStyle={
                      this.props.details.title.value === ''
                        ? Style.titleNillColor
                        : Style.titleSelectedColor
                    }
                    text={
                      this.props.details.title.value === ''
                        ? translate(
                            'PERSONAL_DETAILS_SCREEN_STRINGS.CHOOSE_TITLE',
                          )
                        : this.props.details.title.value
                    }
                  />
                ) : (
                  <CPicker
                    testID={testIds.title}
                    accessibilityLabel={testIds.title}
                    state={this.props.title.state}
                    selectedValue={this.props.title.value}
                    setTitle={(title) => {
                      this.editDetails('title', title);
                    }}
                    showDatePicker={this.showPicker}
                    error={
                      this.props.title.empty && this.props.details.missingFields
                    }
                    pickerItems={translate('nameTitles')}
                    imagePath={LOCAL_PATH.DROP_DOWN_ICON}
                  />
                )}

                <CLabel
                  style={Style.inputLabel}
                  text={
                    translate(
                      'PERSONAL_DETAILS_SCREEN_STRINGS.FIRSTNAME_LABEL',
                    ) + '*'
                  }
                />
                <CText
                  testID={testIds.firstName}
                  accessibilityLabel={testIds.firstName}
                  blurOnSubmit={false}
                  onSubmitEditing={this.focusMiddleName}
                  reference={(input) => {
                    this.firstname = input;
                  }}
                  state={this.props.details.first_name.state}
                  placeHolderText={translate(
                    'PERSONAL_DETAILS_SCREEN_STRINGS.FIRSTNAME_LABEL',
                  )}
                  value={this.props.details.first_name.value}
                  error={this.checkFirstnameError()}
                  returnKeyType={'next'}
                  onChangeText={(val) => this.editDetails('first_name', val)}
                  errorMessage={this.returnFirstnameError()}
                  autoCapitalize={'words'}
                />

                <CLabel
                  style={Style.inputLabel}
                  text={translate(
                    'PERSONAL_DETAILS_SCREEN_STRINGS.MIDDLENAME_LABEL',
                  )}
                />
                <CText
                  testID={testIds.middleName}
                  accessibilityLabel={testIds.middleName}
                  blurOnSubmit={false}
                  onSubmitEditing={this.focusLastName}
                  reference={(input) => {
                    this.middlename = input;
                  }}
                  returnKeyType={'next'}
                  state={this.props.details.middle_name.state}
                  placeHolderText={translate(
                    'PERSONAL_DETAILS_SCREEN_STRINGS.MIDDLENAME_LABEL',
                  )}
                  value={this.props.details.middle_name.value}
                  error={this.checkMiddlenameError()}
                  onChangeText={(val) => this.editDetails('middle_name', val)}
                  errorMessage={this.returnMiddlenameError()}
                  autoCapitalize={'words'}
                />

                <CLabel
                  style={Style.inputLabel}
                  text={
                    translate(
                      'PERSONAL_DETAILS_SCREEN_STRINGS.LASTNAME_LABEL',
                    ) + '*'
                  }
                />
                <CText
                  testID={testIds.lastName}
                  accessibilityLabel={testIds.lastName}
                  reference={(input) => {
                    this.lastname = input;
                  }}
                  state={this.props.details.last_name.state}
                  placeHolderText={translate(
                    'PERSONAL_DETAILS_SCREEN_STRINGS.LASTNAME_LABEL',
                  )}
                  value={this.props.details.last_name.value}
                  error={this.checkLastnameError()}
                  returnKeyType={'done'}
                  onChangeText={(val) => this.editDetails('last_name', val)}
                  errorMessage={this.returnLastnameError()}
                  autoCapitalize={'words'}
                />
              </View>
            </View>
            <View style={Style.buttonsContainer}>
              <CButton
                testID={testIds.continueToContactDetails}
                accessibilityLabel={testIds.continueToContactDetails}
                text={translate('LOGIN_SCREEN_STRINGS.CONTINUE_LABEL')}
                textStyle={Style.whiteText}
                buttonContainerStyle={Style.blackButton}
                onPress={this.addDetails}
                loading={this.props.details.loading}
                disabled={this.props.details.loading}
                backgroundColor={Style.blackButton.backgroundColor}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        {this.state.showPicker && Platform.OS === 'ios' ? (
          <CPicker
            testID={testIds.titlePicker}
            accessibilityLabel={testIds.titlePicker}
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
    personalDetails: {title, error},
  } = state;
  return {
    details: state.personalDetails,
    title,
    error,
    deviceToken: state.signIn.deviceToken,
  };
};

const mapDispatchToProps = {
  editPersonalDetails: editPersonalDetailsAction,
  addPersonalDetails: addPersonalDetailsAction,
  missingFields: missingFieldsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetails);
