import React, {Component} from 'react';
import {View, Platform} from 'react-native';
import {connect} from 'react-redux';
import Style from './style';
import {LOCAL_PATH, Constants, docTypes} from '../../../../utilities';
import {translate} from '../../../../Localization';

import CTitleAndInputField from '../../../../components/cTitleAndInputField';
import CButtonWithImage from '../../../../components/cButtonWithImage';
import CButton from '../../../../components/cButton';
import {ScrollView, Switch} from 'react-native-gesture-handler';
import CLabel from '../../../../components/cLabel';
import VaccineMethods from './methods';
import helperMethods from './helperFunctionsForAddVaccine';
import {
  uploadVaccineImageAction,
  uploadVaccineDetailsAction,
  showVaccineModalAction,
  setVaccineNameAction,
  setVaccineCentreNameAction,
  setVaccineAddDateAction,
  setVaccineExpireDateAction,
  setVaccineDocumentAction,
  editVaccineDetailsAction,
  resetDetailsAction,
} from '../redux/actions';
import {showVaccinePopUpOnHomeAction} from '../../Home/redux/actions';
import {connectActionSheet} from '@expo/react-native-action-sheet';
import CDatePicker from '../../../../components/cDatePicker';
import CPicker from '../../../../components/cPicker';
import CTextField from '../../../../components/cTextField';
const {testIds, fieldTypes, vaccineDateType, otherVaccineTypeKey} = Constants;
const unfinishedChanges = true;
class CVaccineForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDatePicker: false,
      dateType: '',
      checkMissingFields: false,
      modalOpen: false,
      test_date: {value: '', isEmpty: true},
      expiration_date: {value: '', isEmpty: true},
      showPicker: false,
      otherVaccineTypeChosen: false,
      otherVaccineName: '',
      otherVaccineNameError: false,
    };
    VaccineMethods.setProps(this.props);
    VaccineMethods.setInstance(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.vaccinations !== this.props.vaccinations) {
      VaccineMethods.setProps(this.props);
    }
  }

  uploadVaccineImage = () => {
    const options = [
      translate('CAMERA_OPTIONS.TAKE_PHOTO'),
      translate('CAMERA_OPTIONS.LIBRARY'),
      translate('CAMERA_OPTIONS.CANCEL'),
    ];
    const cancelButtonIndex = 2;
    this.props.showActionSheetWithOptions(
      {
        useModal: true,
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        VaccineMethods.uploadImage(buttonIndex, docTypes.VACCINE);
      },
    );
  };
  showTypePicker = (name) => {
    const {vaccineTypes} = this.props;
    if (!name.value) {
      VaccineMethods.setVaccineName(vaccineTypes[0]);
    }

    this.setState({otherVaccineTypeChosen: name.value === otherVaccineTypeKey});

    this.setState({showPicker: !this.state.showPicker});
  };
  render() {
    const {modal} = this.props;
    const {
      showDatePicker,
      checkMissingFields,
      otherVaccineTypeChosen,
      otherVaccineNameError,
    } = this.state;
    const {
      vaccineDetailsToBeEdited: {
        name,
        health_center,
        test_date,
        expiration_date,
        document,
      },
      vaccineTypes,
    } = this.props;

    return (
      <View style={Style.inputContainer}>
        <ScrollView>
          <View style={Style.inputInnerContainer}>
            {modal && (
              <CButtonWithImage
                buttonContainerStyle={Style.crossButtonContainer}
                buttonCustomStyle={Style.crsossButton}
                textStyle={Style.textStyle}
                customeImageStyle={Style.customeImageStyle}
                imagePath={LOCAL_PATH.CROSS_ICON}
                onPress={() => VaccineMethods.hideVaccineModal()}
              />
            )}
            <CTitleAndInputField
              testID={testIds.vaccineName}
              accessibilityLabel={testIds.vaccineName}
              type={Platform.OS === 'ios' ? 'Button' : 'Picker'}
              imagePath={LOCAL_PATH.DROP_DOWN_ICON}
              onPress={() => this.showTypePicker(name)}
              selectedValue={name.value}
              androidPickerContainer={modal && Style.buttonContainerStyle}
              setTitle={(title) => {
                VaccineMethods.setVaccineName(title);
                this.setState({
                  otherVaccineTypeChosen: title === otherVaccineTypeKey,
                });
              }}
              pickerItems={vaccineTypes}
              textStyle={
                !name.value ? Style.titleNillColor : Style.titleSelectedColor
              }
              buttonContainerStyle={modal && Style.buttonContainerStyle}
              buttonCustomStyle={modal && Style.buttonContainerStyle}
              text={
                name.value || translate('VACCINE_SCREEN.CHOOSE_VACCINE_TYPE')
              }
              titleStyle={Style.inputLabel}
              title={translate('VACCINE_SCREEN.VACCINE_NAME')}
              customSuperContainer={modal && Style.buttonContainerStyle}
              placeHolderText={translate('STRINGS.ENTER_NAME')}
              value={name.value}
              onChangeText={(val) => VaccineMethods.setVaccineName(val)}
              error={checkMissingFields && name.isEmpty}
              errorMessage={translate('VACCINE_SCREEN.EMPTY_VACCINE_NAME')}
            />
            {otherVaccineTypeChosen && (
              <CTextField
                customSuperContainer={modal && Style.buttonContainerStyle}
                placeHolderText={translate(
                  'VACCINE_SCREEN.PLEASE_ENTER_VACCINE_NAME',
                )}
                error={otherVaccineNameError}
                onChangeText={(val) => VaccineMethods.setOtherVaccineName(val)}
                errorMessage={translate(
                  'VACCINE_SCREEN.VACCINE_NAME_CANNOT_BE_EMPTY',
                )}
              />
            )}
            <CTitleAndInputField
              testID={testIds.vaccineCentre}
              accessibilityLabel={testIds.vaccineCentre}
              type={fieldTypes.TEXT_FIELD}
              titleStyle={Style.inputLabel}
              title={translate('VACCINE_SCREEN.CENTRE')}
              customSuperContainer={modal && Style.buttonContainerStyle}
              imagePath={LOCAL_PATH.DROP_DOWN_ICON}
              textStyle={Style.titleSelectedColor}
              placeHolderText={translate('VACCINE_SCREEN.WHERE')}
              androidPickerContainer={Style.buttonContainerStyleOnDataFilled}
              value={health_center.value}
              onChangeText={(val) => VaccineMethods.setCentreName(val)}
              error={checkMissingFields && health_center.isEmpty}
              errorMessage={translate(
                'VACCINE_SCREEN.EMPTY_HEALTH_CENTRE_NAME',
              )}
            />
            <CTitleAndInputField
              testID={testIds.vaccineDate}
              accessibilityLabel={testIds.vaccineDate}
              type={fieldTypes.BUTTON}
              titleStyle={Style.inputLabel}
              title={translate('VACCINE_SCREEN.DATE')}
              buttonContainerStyle={modal && Style.buttonContainerStyle}
              buttonCustomStyle={modal && Style.buttonContainerStyle}
              imagePath={LOCAL_PATH.DROP_DOWN_ICON}
              textStyle={Style.titleSelectedColor}
              text={
                !test_date.value
                  ? translate('STRINGS.DATE')
                  : VaccineMethods.formatDate(test_date.value)
              }
              onPress={() => {
                this.setState(
                  {
                    showDatePicker: !this.state.showDatePicker,
                    dateType: vaccineDateType.TEST,
                  },

                  () => {
                    VaccineMethods.setDate();
                  },
                );
              }}
              error={checkMissingFields && test_date.isEmpty}
              errorMessage={translate('VACCINE_SCREEN.TEST_DATE_ERROR')}
            />
            <CTitleAndInputField
              testID={testIds.vaccineExpirationDate}
              accessibilityLabel={testIds.vaccineExpirationDate}
              type={fieldTypes.BUTTON}
              titleStyle={Style.inputLabel}
              title={translate('VACCINE_SCREEN.EXPIRATION_DATE')}
              buttonContainerStyle={modal && Style.buttonContainerStyle}
              buttonCustomStyle={modal && Style.buttonContainerStyle}
              imagePath={LOCAL_PATH.DROP_DOWN_ICON}
              textStyle={Style.titleSelectedColor}
              text={
                !expiration_date.value
                  ? translate('STRINGS.DATE')
                  : VaccineMethods.formatDate(expiration_date.value)
              }
              onPress={() => {
                this.setState(
                  {
                    showDatePicker: !this.state.showDatePicker,
                    dateType: vaccineDateType.EXPIRY,
                  },

                  () => {
                    VaccineMethods.setDate();
                  },
                );
              }}
            />
            {!unfinishedChanges && (
              <View style={Style.reminderSwitchView}>
                <View style={Style.notificationLabelView}>
                  <CLabel
                    text={translate('STRINGS.NOTIFICATION')}
                    style={Style.notificationLabel}
                  />
                  <CLabel
                    text={translate('VACCINE_SCREEN.REMINDER')}
                    style={Style.reminderLabel}
                  />
                </View>
                <Switch style={Style.switchStyle} />
              </View>
            )}

            <CTitleAndInputField
              testID={testIds.imagePicker}
              accessibilityLabel={testIds.imagePicker}
              type={fieldTypes.BUTTON}
              titleStyle={Style.inputLabel}
              title={translate('VACCINE_SCREEN.DOCUMENT')}
              imagePath={LOCAL_PATH.UPLOAD_ICON}
              textStyle={Style.uploadButtonTitle}
              buttonContainerStyle={[
                Style.uploadButtonContainer,
                modal && Style.uploadButtonContainerWidthOnDataFilled,
              ]}
              customeImageStyle={Style.uploadButtonIcon}
              buttonCustomStyle={Style.uploadButton}
              text={
                !document.value
                  ? translate('VACCINE_SCREEN.UPLOAD')
                  : document.value
              }
              onPress={this.uploadVaccineImage}
              error={checkMissingFields && !document.value}
              errorMessage={translate('STRINGS.NO_IMAGE_ERROR')}
            />
            <CButton
              testID={testIds.continue}
              accessibilityLabel={testIds.continue}
              text={translate('STRINGS.SAVE')}
              textStyle={Style.whiteText}
              buttonContainerStyle={[
                Style.greenButton,
                modal && Style.greenButtonInModal,
              ]}
              onPress={VaccineMethods.save}
            />
          </View>
          {!modal && (
            <View style={Style.backButtonView}>
              <CButton
                testID={testIds.continue}
                accessibilityLabel={testIds.continue}
                text={translate('BACK.BACK_BUTTON_TITLE')}
                textStyle={Style.blackText}
                buttonContainerStyle={Style.whiteButton}
                onPress={helperMethods.goBack}
              />
            </View>
          )}
          {showDatePicker && (
            <CDatePicker
              maximumDate={
                this.state.dateType === vaccineDateType.EXPIRY
                  ? null
                  : new Date()
              }
              mode={'date'}
              showDatePicker={() => {
                this.setState({
                  showDatePicker: !this.state.showDatePicker,
                });
              }}
              setChosenDate={VaccineMethods.getDate}
              modalVisible={showDatePicker}
              chosenDate={VaccineMethods.returnChosenDate()}
            />
          )}
        </ScrollView>
        <CLabel text={this.state.showPicker} style={Style.reminderLabel} />
        {this.state.showPicker && (
          <CPicker
            setTitle={VaccineMethods.setVaccineName}
            showDatePicker={() => this.showTypePicker(name)}
            pickerItems={vaccineTypes}
            selectedValue={name.value}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    userProfile: {
      showVaccinePopUp,
      userInfo: {lastAddedVaccine},
      loadingImage,
    },
    vaccinations: {
      vaccineDetailsToBeEdited,
      uploadingImageLoader,
      showVaccineModal,
      vaccineTypes,
    },
    vaccinations,
  } = state;

  return {
    details: state.signIn,
    profile: state.userProfile,
    feeling: state.feeling,
    healthTests: state.healthTest,
    loadingImage,
    lastAddedVaccine,
    showVaccinePopUp,
    vaccineDetailsToBeEdited,
    uploadingImageLoader,
    vaccinations,
    showVaccineModal,
    vaccineTypes,
  };
};

const mapDispatchToProps = {
  uploadVaccineImage: uploadVaccineImageAction,
  uploadVaccineDetails: uploadVaccineDetailsAction,
  showVaccinePopUpOnHome: showVaccinePopUpOnHomeAction,
  showVaccineModalOnVaccineList: showVaccineModalAction,
  setVaccineName: setVaccineNameAction,
  setVaccineCentreName: setVaccineCentreNameAction,
  setVaccineAddDate: setVaccineAddDateAction,
  setVaccineExpireDate: setVaccineExpireDateAction,
  setVaccineDocument: setVaccineDocumentAction,
  editVaccineDetails: editVaccineDetailsAction,
  resetDetails: resetDetailsAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(connectActionSheet(CVaccineForm));
