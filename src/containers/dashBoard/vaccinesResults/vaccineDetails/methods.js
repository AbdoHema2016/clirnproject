import React from 'react';
import {Platform} from 'react-native';
import {Constants, ImagePicker} from '../../../../utilities';
import ModalsQueue from '../../../../services/ModalsQueue';
import CDatePicker from '../../../../components/cDatePicker';
import dayjs from 'dayjs';
import {
  logAnalyticsEvent,
  setUserAnalyticsProperties,
} from '../../../../utilities/Firebase';
const {
  cameraError,
  docTypes,
  DATEFORMATS,
  vaccineDateType,
  profileModals,
  screenSource,
  analyticsIds,
  otherVaccineTypeKey,
} = Constants;
const {imagePicker} = ImagePicker;
class VaccineMethods {
  constructor() {
    this.props = null;
    this.instance = null;
  }

  setProps(props) {
    this.props = props;
  }

  setInstance(instance) {
    this.instance = instance;
  }
  goBack = () => {
    this.props.navigation.pop();
  };
  formatDate = (date) => {
    return `${dayjs(date).format(DATEFORMATS.VACCINE_DATE)}`;
  };
  uploadVaccineDetails = () => {
    const {EDIT_VACCINE, PROFILE, ADD_VACCINE} = screenSource;
    const {
      userID,
      showVaccinePopUp,
      vaccineDetailsToBeEdited: {
        name,
        health_center,
        test_date,
        expiration_date,
        document,
        id,
      },
    } = this.props;

    const {otherVaccineName} = this.instance.state;
    let data = {};
    let vaccineName = name.value;
    if (name.value === otherVaccineTypeKey) {
      vaccineName = otherVaccineName;
    }
    if (expiration_date.value) {
      data = {
        name: vaccineName,
        health_center: health_center.value,
        test_date: `${dayjs(test_date.value).format(
          DATEFORMATS.PROFILE_HEALTH_TEST,
        )}`,
        expiration_date: `${dayjs(expiration_date.value).format(
          DATEFORMATS.PROFILE_HEALTH_TEST,
        )}`,
        document: document.value,
      };
    } else {
      data = {
        name: vaccineName,
        health_center: health_center.value,
        test_date: `${dayjs(test_date.value).format(
          DATEFORMATS.PROFILE_HEALTH_TEST,
        )}`,
        document: document.value,
      };
    }
    if (id) {
      this.props.editVaccineDetails({
        data,
        id,
        source: EDIT_VACCINE,
      });
      return;
    }
    this.props.uploadVaccineDetails({
      data,
      userID,
      source: showVaccinePopUp ? PROFILE : ADD_VACCINE,
    });
  };
  checkAnyMissingField = () => {
    const {
      name,
      health_center,
      test_date,
      expiration_date,
      document,
    } = this.props.vaccineDetailsToBeEdited;
    const {otherVaccineName} = this.instance.state;
    if (name.value === otherVaccineTypeKey && !otherVaccineName.trim()) {
      this.instance.setState({otherVaccineNameError: true});
      return true;
    }
    const vaccinedetails = [
      name.value,
      health_center.value,
      test_date.value,
      document.value,
    ];
    if (vaccinedetails.findIndex((obj) => !obj) >= 0) {
      return true;
    }
    if (!expiration_date.value) {
      return false;
    }
    if (
      dayjs(test_date.value).toDate().getTime() >
      dayjs(expiration_date.value).toDate().getTime()
    ) {
      this.props.setVaccineAddDate({
        value: test_date.value,
        isEmpty: true,
      });
      this.instance.setState({
        test_date: {
          value: test_date.value,
          isEmpty: true,
        },
      });
      this.instance.setState({
        expiration_date: {
          value: expiration_date.value,
          isEmpty: true,
        },
      });
      return true;
    }
    return false;
  };
  setVaccineName = (name) => {
    this.props.setVaccineName({
      value: name,
      isEmpty: name === '' ? true : false,
    });
  };
  setOtherVaccineName = (otherVaccineName) => {
    this.instance.setState({otherVaccineName, otherVaccineNameError: false});
  };
  setCentreName = (name) => {
    this.props.setVaccineCentreName({
      value: name,
      isEmpty: name === '' ? true : false,
    });
  };
  uploadImage = async (buttonIndex, docType, callback) => {
    this.instance.setState({
      vaccineImageUploading: true,
    });
    let accessToken = this.props.details.token;
    let userID = this.props.details.userID;
    imagePicker(buttonIndex, async (source) => {
      if (!source?.fileName) {
        this.instance.setState({
          vaccineImageUploading: false,
        });
        return;
      }
      if (source === cameraError) {
        callback ? callback() : this.instance.setState({error: true});

        return;
      }
      if (Platform.OS !== 'android' && source && source.uri) {
        source.fileName = source.uri.substring(source.uri.lastIndexOf('/') + 1);
      }
      source.fileName = source.fileName.replace(/ /g, '_').toLowerCase();
      this.props.uploadVaccineImage(
        source,
        accessToken,
        userID,
        docType,
        (doc) => {
          this.props.setVaccineDocument({value: doc.name, isEmpty: false});
          this.instance.setState({
            photo: {value: doc.name, isEmpty: false},
            vaccineImageUploading: false,
          });
        },
      );
    });
  };
  save = () => {
    const {associatedCompany = '', userInfo} = this.props.profile;
    const {
      vaccineDetailsToBeEdited: {name},
    } = this.props;
    let screenName = this.props.screenName || '';

    let analyticsScreenName =
      screenName === analyticsIds.settings_vaccine_screenName
        ? analyticsIds.settings_vaccine_screenName
        : screenName;
    let eventName =
      screenName === analyticsIds.settings_vaccine_screenName
        ? analyticsIds.finish_vaccine_settings
        : analyticsIds.finish_vaccine_profile;
    this.instance.setState(
      {
        checkMissingFields: true,
      },
      () => {
        if (!this.checkAnyMissingField()) {
          this.uploadVaccineDetails();
          setUserAnalyticsProperties({
            userLocation: userInfo.userLocation || '',
            associatedCompany,
            screenName: analyticsScreenName,
            vaccineType: name.value,
          });
          logAnalyticsEvent(eventName, {
            userLocation: userInfo.userLocation,
            associatedCompany,
            screenName: analyticsScreenName,
            vaccineType: name.value,
          });
        }
      },
    );
  };
  addVaccineDetails = () => {
    const {vaccineName, healthCentre, testDate, expiryDate, photo} = this.props;
    const data = {
      name: vaccineName.value,
      health_center: healthCentre.value,
      test_date: `${dayjs(testDate.value).format(
        DATEFORMATS.PROFILE_HEALTH_TEST,
      )}`,
      expiration_date: `${dayjs(expiryDate.value).format(
        DATEFORMATS.PROFILE_HEALTH_TEST,
      )}`,
      document: photo.value,
    };
    this.props.uploadVaccineDetails({
      data,
      source: docTypes.VACCINE,
    });
  };

  renderDatePicker = () => {
    const {showDatePicker, dateType} = this.instance.state;
    const {showDatePickerMethod, getDate, returnChosenDate} = this;
    if (!showDatePicker) {
      return null;
    }
    return (
      <CDatePicker
        maximumDate={dateType === vaccineDateType.EXPIRY ? null : new Date()}
        mode={'date'}
        showDatePicker={showDatePickerMethod}
        setChosenDate={getDate}
        modalVisible={showDatePicker}
        chosenDate={returnChosenDate()}
      />
    );
  };
  returnChosenDate = () => {
    const {dateType, test_date, expiration_date} = this.instance.state;
    if (dateType === vaccineDateType.EXPIRY && !expiration_date.value) {
      return new Date();
    }
    if (dateType === vaccineDateType.EXPIRY && expiration_date.value) {
      return dayjs(expiration_date.value).toDate();
    }
    if (!test_date.value) {
      return new Date();
    }
    return dayjs(test_date.value).toDate();
  };

  showDatePickerMethod = (type) => {
    this.instance.setState(
      {
        showDatePicker: !this.instance.state.showDatePicker,
        dateType: type,
      },
      () => {
        this.setDate();
      },
    );
  };
  getDate = (event, date) => {
    if (Platform.OS === 'android') {
      this.instance.setState({
        showDatePicker: false,
      });
    }
    if (date) {
      this.setDate(date);
    }
  };
  setDate = (date) => {
    const {expiration_date, test_date, dateType} = this.instance.state;
    if (dateType === vaccineDateType.EXPIRY) {
      this.props.setVaccineExpireDate({
        value: date || expiration_date.value || new Date(),
        isEmpty: date === '' ? true : false,
      });
      this.instance.setState({
        expiration_date: {
          value: date || expiration_date.value || new Date(),
          isEmpty: date === '' ? true : false,
        },
      });
      return;
    }
    if (dateType === vaccineDateType.TEST) {
      this.props.setVaccineAddDate({
        value: date || test_date.value || new Date(),
        isEmpty: date === '' ? true : false,
      });
      this.instance.setState({
        test_date: {
          value: date || test_date.value || new Date(),
          isEmpty: date === '' ? true : false,
        },
      });
    }
  };
  showVaccineModal = () => {
    if (this.props.showVaccinePopUp) {
      this.props.showVaccinePopUpOnHome(false);
    } else {
      this.props.showVaccineModalOnVaccineList(false);
    }
    this.resetVaccineDetails();
  };
  resetVaccineDetails = () => {
    this.props.resetDetails();
  };
  hideVaccineModal = (source) => {
    ModalsQueue.hideModal({
      modalId: profileModals.vaccine,
      hideModalFunction: () => this.showVaccineModal(),
    });
  };
  setEditableFields = (data) => {
    const {name, health_center, test_date, expiration_date, document} = data;
    this.instance.setState({
      vaccineName: {value: name, isEmpty: false},
      healthCentre: {value: health_center, isEmpty: false},
      testDate: {value: test_date, isEmpty: false},
      expiryDate: {value: expiration_date, isEmpty: false},
      photo: {value: document, isEmpty: false},
    });
  };
}

const vaccineMethods = new VaccineMethods();

export default vaccineMethods;
