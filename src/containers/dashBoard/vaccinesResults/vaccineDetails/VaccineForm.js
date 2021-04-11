import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
} from 'react-native';
import Style from './style';
import {connect} from 'react-redux';
import CLabel from '../../../../components/cLabel';
import CLoader from '../../../../components/cLoader';
import CVaccineForm from './CVaccineForm';
import CNavigationBackButton from '../../../../components/cNavigationBackButton';
import {Constants} from '../../../../utilities';
import {translate} from '../../../../Localization';

import CDatePicker from '../../../../components/cDatePicker';
import {
  uploadVaccineImageAction,
  resetDetailsAction,
  uploadVaccineDetailsAction,
  showVaccineModalAction,
} from '../redux/actions';
import addVaccineHelperMethods from './helperFunctionsForAddVaccine';
import {
  logAnalyticsEvent,
  setUserAnalyticsProperties,
} from '../../../../utilities/Firebase';

const {vaccineDateType, analyticsIds} = Constants;

class VaccineForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showDatePicker: false,
      dateType: '',
      vaccineName: {value: '', isEmpty: true},
      healthCentre: {value: '', isEmpty: true},
      testDate: {value: '', isEmpty: true},
      expiryDate: {value: '', isEmpty: true},
      photo: {value: '', isEmpty: true},
      checkMissingFields: false,
      error: false,
      loading: false,
    };
    addVaccineHelperMethods.setInstance = this;
    addVaccineHelperMethods.setProps = this.props;
  }

  sendAnalytics = () => {
    const {userLocation = '', associatedCompany = ''} = this.props;
    const screenName = analyticsIds.VaccinationResults;
    setUserAnalyticsProperties({
      userLocation,
      screenName,
      associatedCompany,
    });
    logAnalyticsEvent(analyticsIds.Add_vaccination_settings, {
      userLocation,
      screenName,
      company: associatedCompany,
    });
  };
  componentDidMount() {
    this.navigationOptions();
    this.props.resetDetails();
    this.sendAnalytics();
  }

  navigationOptions = () => {
    this.props.navigation.setOptions({
      title: '',
      headerTransparent: true,
      headerLeft: () => (
        <CNavigationBackButton
          title={translate('BACK.BACK_BUTTON_TITLE')}
          backButtonAction={addVaccineHelperMethods.goBack}
        />
      ),
    });
  };

  vaccineDetailItem = () => {
    const {loading} = this.state;
    const screenName = analyticsIds.settings_vaccine_screenName;
    return <CVaccineForm loading={loading} screenName={screenName} />;
  };

  setDate = (event, date) => {
    const {dateType} = this.state;
    if (Platform.OS === 'android') {
      this.setState({
        showDatePicker: false,
      });
    }
    if (date) {
      if (dateType === vaccineDateType.EXPIRY) {
        this.setState({
          expiryDate: {value: date, isEmpty: date === '' ? true : false},
        });
        return;
      }
      this.setState({
        testDate: {value: date, isEmpty: date === '' ? true : false},
      });
    }
  };

  showDatePicker = (type) => {
    this.setState({
      showDatePicker: !this.state.showDatePicker,
      dateType: type,
    });
  };

  returnChosenDate = () => {
    const {expiryDate, testDate, dateType} = this.state;
    if (dateType === vaccineDateType.EXPIRY) {
      if (expiryDate.value === '') {
        return new Date();
      }
      return expiryDate.value;
    }
    return !testDate.value ? new Date() : testDate.value;
  };

  renderDatePicker = () => {
    const {showDatePicker, dateType} = this.state;
    const {
      showDatePicker: showDatePickerMethod,
      setDate,
      returnChosenDate,
    } = this;
    if (!showDatePicker) {
      return null;
    }
    return (
      <CDatePicker
        maximumDate={dateType === vaccineDateType.EXPIRY ? null : new Date()}
        mode={'date'}
        showDatePicker={showDatePickerMethod}
        setChosenDate={setDate}
        modalVisible={showDatePicker}
        chosenDate={returnChosenDate()}
      />
    );
  };

  render() {
    const {uploadingImageLoader} = this.props;
    return (
      <View style={Style.container}>
        <KeyboardAvoidingView
          style={Style.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'android' ? 44 : 0}>
          <ScrollView style={Style.scrollView}>
            <View style={Style.innerContainer}>
              <CLabel
                style={Style.appTitle}
                text={translate('VACCINE_SCREEN.NEW_VACCINE_RESULTS')}
              />
              {this.vaccineDetailItem()}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        {this.renderDatePicker()}
        <Modal visible={uploadingImageLoader} transparent>
          <CLoader loading={uploadingImageLoader} />
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    signIn: {token, userID},
    vaccinations: {uploadingImageLoader, imageName},
    userProfile: {
      userInfo: {userLocation},
      associatedCompany,
    },
  } = state;
  return {
    token,
    userID,
    uploadingImageLoader,
    imageName,
    userLocation,
    associatedCompany,
    vaccinations: state.vaccinations,
  };
};

const mapDispatchToProps = {
  uploadImageS3: uploadVaccineImageAction,
  resetDetails: resetDetailsAction,
  uploadVaccineDetails: uploadVaccineDetailsAction,
  showVaccineModal: showVaccineModalAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(VaccineForm);
