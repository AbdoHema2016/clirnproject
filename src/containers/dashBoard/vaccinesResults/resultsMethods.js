import React from 'react';
import {View, Platform, TouchableOpacity} from 'react-native';
import CLabel from '../../../components/cLabel';
import CImage from '../../../components/cImage';
import {Style} from './style';
import {
  Constants,
  ImagePicker,
  testIds,
  HelperFunctions,
} from '../../../utilities';

import {translate} from '../../../Localization';

import COverlay from './vaccinePopups/editVaccineDetails';
import CDatePicker from '../../../components/cDatePicker';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
const {checkVaccinationStatus} = HelperFunctions;
const {imagePicker} = ImagePicker;
const {
  LOCAL_PATH,
  DATEFORMATS,
  docTypes,
  cameraError,
  vaccineDateType,
} = Constants;
class ResultsMethods {
  constructor() {
    this.props = null;
    this.instance = null;
  }

  set setProps(props) {
    this.props = props;
  }

  set setInstance(instance) {
    this.instance = instance;
  }
  refreshVaccineResults = () => {
    const {getVaccinations} = this.props;
    getVaccinations();
  };
  setResultIcon = (status, expirationDate, isVerified) => {
    let resultIcon = checkVaccinationStatus(status, isVerified);
    if (!expirationDate) {
      resultIcon = LOCAL_PATH.ADD_IMAGE_ICON;
    }
    return (
      <View style={Style.statusIconContainer}>
        <CImage imageStyle={Style.statusIcon} imagePath={resultIcon} />
      </View>
    );
  };
  formatTestTakenDate = (date) => {
    let duration = dayjs().to(date);
    if (duration.includes('hours')) {
      duration = translate('VACCINE_SCREEN.TODAY');
    }
    let fixedDate = dayjs(date, DATEFORMATS.PROFILE_HEALTH_TEST).format(
      DATEFORMATS.COMPANY_ADDITION,
    );
    return `${fixedDate}, ${duration}`;
  };
  formatExpirationDate = (date) => {
    let duration = dayjs().to(date);
    if (duration.includes('hours')) {
      duration = translate('VACCINE_SCREEN.TODAY');
    }
    return `${translate('VACCINE_SCREEN.ExpirationDate')}${duration}`;
  };
  editVaccineData = (index, item) => {
    this.props.setVaccineFieldsToBeEdited(item);
    this.props.showVaccineModalOnVaccineList(true);
    this.instance.setState({
      editData: true,
      editIndex: index,
    });
  };
  showVaccineDetails = (item) => {
    this.props.navigation.navigate('VaccineDetails', {id: item.id});
  };
  returnEditableVaccineData = (item) => {
    const {
      editVaccineName,
      editHealthCentre,
      editTestDate,
      editExpiryDate,
      editPhoto,
      showDatePicker,
      loading,
    } = this.instance.state;
    const {id} = item;
    let docName = editPhoto.value.substring(
      editPhoto.value.lastIndexOf('/') + 1,
    );
    const image = {value: docName, isEmpty: false};
    const {
      setCentreName,
      setVaccineName,
      uploadImage,
      editVaccineDetails,
      showDatePicker: showDatePickerMethod,
      hideEditableVaccineData,
      renderDatePicker,
    } = this;
    return (
      <COverlay
        id={id}
        vaccineName={editVaccineName}
        healthCentre={editHealthCentre}
        testDate={editTestDate}
        expiryDate={editExpiryDate}
        imageName={image}
        setCentreName={setCentreName}
        setVaccineName={setVaccineName}
        showDatePicker={showDatePickerMethod}
        uploadImage={uploadImage}
        save={() => editVaccineDetails(id)}
        showModal={true}
        modal={true}
        isDatePickerVisible={showDatePicker}
        loading={loading}
        closeModal={hideEditableVaccineData}
        renderDatePicker={() => renderDatePicker()}
      />
    );
  };
  toggleRemoveVaccine = (name, id) => {
    const {removeVaccineVisible} = this.instance.state;
    if (!removeVaccineVisible) {
      this.instance.setState({
        removeVaccineVisible: !removeVaccineVisible,
        vaccineName: name,
        vaccineId: id,
      });
      return;
    }
    this.instance.setState({
      removeVaccineVisible: !removeVaccineVisible,
    });
  };
  showVerified = (isVerified) => {
    if (isVerified) {
      return (
        <CLabel
          style={Style.verify}
          accessibilityLabel={testIds.verifiedTxtSettings}
          testID={testIds.verifiedTxtSettings}
          text={translate('healthTest.verified')}
        />
      );
    }
    if (isVerified === false) {
      return (
        <CLabel
          style={Style.notVerified}
          accessibilityLabel={testIds.verifiedTxtSettings}
          testID={testIds.verifiedTxtSettings}
          text={translate('healthTest.notVerified')}
        />
      );
    }
    return null;
  };
  vaccineRenderItem = ({item, index}) => {
    return (
      <View style={Style.historyCard}>
        <TouchableOpacity
          accessibilityLabel={testIds.vaccine + index}
          style={Style.flexRow}
          onPress={() => this.showVaccineDetails(item)}>
          {this.setResultIcon(
            item.status,
            item.expiration_date,
            item.is_verified,
          )}
          <View style={Style.details}>
            <CLabel style={Style.sharedDetail} text={item.name} />
            {this.showVerified(item.is_verified)}

            {item.expiration_date && (
              <CLabel
                style={Style.expirationDate}
                text={this.formatExpirationDate(item.expiration_date)}
              />
            )}
            <CLabel
              style={Style.dateTaken}
              text={this.formatTestTakenDate(item.test_date)}
            />
          </View>
        </TouchableOpacity>
        <View style={Style.underLine} />
      </View>
    );
  };
  addNewTest = () => {
    this.props.navigation.navigate('VaccineForm');
  };

  setVaccineName = (name) => {
    this.instance.setState({
      editVaccineName: {value: name, isEmpty: name === '' ? true : false},
    });
  };
  setCentreName = (name) => {
    this.instance.setState({
      editHealthCentre: {value: name, isEmpty: name === '' ? true : false},
    });
  };
  setDate = (event, date) => {
    const {dateType} = this.instance.state;
    if (Platform.OS === 'android') {
      this.instance.setState({
        showDatePicker: false,
      });
    }
    if (date) {
      if (dateType === vaccineDateType.EXPIRY) {
        this.instance.setState({
          editExpiryDate: {value: date, isEmpty: date === '' ? true : false},
        });
        return;
      }
      this.instance.setState({
        editTestDate: {value: date, isEmpty: date === '' ? true : false},
      });
    }
  };

  showDatePicker = (type) => {
    this.instance.setState({
      showDatePicker: !this.instance.state.showDatePicker,
      dateType: type,
    });
  };

  returnChosenDate = () => {
    const {editExpiryDate, editTestDate, dateType} = this.instance.state;
    if (!editExpiryDate.value && !editTestDate.value) {
      return new Date();
    }
    if (dateType === vaccineDateType.EXPIRY) {
      return dayjs(editExpiryDate.value).toDate();
    }
    return dayjs(editTestDate.value).toDate();
  };

  uploadImage = () => {
    const {token, userID} = this.props;
    let docType = docTypes.VACCINE;
    this.instance.setState({
      loading: true,
    });
    imagePicker(async (source) => {
      if (!source?.fileName) {
        this.instance.setState({
          loading: false,
        });
        return;
      }
      if (source === cameraError) {
        this.instance.setState({error: true});
        return;
      }
      if (Platform.OS !== 'android' && source && source.uri) {
        source.fileName = source.uri.substring(source.uri.lastIndexOf('/') + 1);
      }
      source.fileName = source.fileName.replace(/ /g, '_').toLowerCase();
      this.props.uploadImageS3(source, token, userID, docType, (doc) => {
        this.instance.setState({
          editPhoto: {value: doc.name, isEmpty: false},
          loading: false,
        });
      });
    });
  };
  renderDatePicker = () => {
    const {showDatePicker, dateType} = this.instance.state;
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

  editVaccineDetails = (id) => {
    const {
      editVaccineName,
      editHealthCentre,
      editTestDate,
      editExpiryDate,
      editPhoto,
    } = this.instance.state;
    const data = {
      name: editVaccineName.value,
      health_center: editHealthCentre.value,
      test_date: `${dayjs(editTestDate.value).format(
        DATEFORMATS.PROFILE_HEALTH_TEST,
      )}`,
      expiration_date: `${dayjs(editExpiryDate.value).format(
        DATEFORMATS.PROFILE_HEALTH_TEST,
      )}`,
      document: editPhoto.value,
    };
    this.props.editVaccineDetails({data, id});
  };
  checkAnyMissingField = () => {
    const {
      name,
      health_center,
      test_date,
      expiration_date,
      document,
    } = this.props.vaccineDetailsToBeEdited;
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
}

const resultsMethods = new ResultsMethods();

export default resultsMethods;
