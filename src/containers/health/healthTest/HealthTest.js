import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  FlatList,
  Platform,
  Modal,
} from 'react-native';
import Style from './style';
import {connect} from 'react-redux';
import {
  editHealthDataAction,
  addHealthDataFieldsAction,
  updateTypeAndIndexAction,
  checkMissingFieldsAction,
  deleteTestDetailRowAction,
  submitHealthTestDataAction,
  checkMissingFieldsInTestObjectAction,
  uploadImageAction,
  updateMissingFieldAction,
} from './redux/actions';
import {profileVisitedBeforeAction} from '../../dashBoard/Home/redux/actions';
import {visitingProfileViaAction} from '../../dashBoard/Home/redux/actions';
import {StoreToken} from '../../onBoarding/SignIn/redux/actions';
import CLabel from '../../../components/cLabel';
import CButton from '../../../components/cButton';
import CPicker from '../../../components/cPicker';
import navigationService from '../../../Navigation/NavigationService';
import CDatePicker from '../../../components/cDatePicker';
import TestDetail from './testDetailsComponent/testDetails';
import dayjs from 'dayjs';
import AsyncStorage, {AsyncConstants} from '../../../utilities/AsyncStorage';
import CNavigationBackButton from '../../../components/cNavigationBackButton';
import {
  keyExtractor,
  Constants,
  ImagePicker,
  getTestIdentifiers,
} from '../../../utilities';
import {translate} from '../../../Localization';

import ErrorView from '../../../components/cMeError';
import ReactNativeBiometrics from 'react-native-biometrics';
import ModalsQueue from '../../../services/ModalsQueue';
import {logAnalyticsEvent} from '../../../utilities/Firebase';
import {connectActionSheet} from '@expo/react-native-action-sheet';

const {
  DATEFORMATS,
  cameraError,
  modalIds,
  docTypes,
  healthTestDataFieldName,
  testIds,
  analyticsIds,
} = Constants;
const {imagePicker} = ImagePicker;

class HealthTest extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showPicker: false,
      showDatePicker: false,
      type: '',
      date: new Date(),
      error: false,
      id: 2,
    };
    this.nextextInputRef = {};
    navigationService.navigation = this.props.navigation;
  }

  componentDidMount() {
    this.navigationOptions();
    logAnalyticsEvent(analyticsIds.onboard_health_test_started);
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
    this.props.navigation.navigate('Temperature');
  };

  showPicker = (index, type) => {
    this.setState(
      {
        showPicker: !this.state.showPicker,
      },
      () => {
        let data = {
          index: index,
          type: type,
        };
        this.props.updateTypeAndIndex(data);
      },
    );
  };

  setHealthTestValue(type, matchtypewith, value, state) {
    return type === matchtypewith ? value : state;
  }

  setHealthTestState(type, matchtypewith, state) {
    return type === matchtypewith ? 'Focused' : state !== '' ? 'Active' : '';
  }

  setHealthTestEmptyState(type, matchtypewith, value, state) {
    return type === matchtypewith
      ? value === ''
        ? true
        : false
      : state === ''
      ? true
      : false;
  }

  setTestData = (index, type, value) => {
    const {testDetails, editHealthData, checkMissingFields} = this.props;
    let data = {
      testDetail: {},
      index,
      checkMissingFieldsAtTheEnd: false,
      missingFields:
        type === healthTestDataFieldName.photo
          ? value.name === ''
            ? true
            : this.checkMissingFieldAtIndex(index, type)
          : value === ''
          ? true
          : this.checkMissingFieldAtIndex(index, type),
    };
    if (type === healthTestDataFieldName.centre) {
      data.testDetail = {
        testData: {
          ...testDetails[index].testData,
          testCentre: {
            value: value,
            state: this.setHealthTestState(
              type,
              healthTestDataFieldName.centre,
              testDetails[index].testData.testCentre.value,
            ),
            empty: this.setHealthTestEmptyState(
              type,
              healthTestDataFieldName.centre,
              value,
              testDetails[index].testData.testCentre.value,
            ),
          },
        },
      };
    }
    if (type === healthTestDataFieldName.type) {
      data.testDetail = {
        testData: {
          ...testDetails[index].testData,
          testType: {
            value: value ? value : testDetails[index].testData.testType.value,
            state: this.setHealthTestState(
              type,
              healthTestDataFieldName.type,
              testDetails[index].testData.testType.value,
            ),
            empty: this.setHealthTestEmptyState(
              type,
              healthTestDataFieldName.type,
              value,
              testDetails[index].testData.testType.value,
            ),
          },
        },
      };
    }
    if (type === healthTestDataFieldName.date) {
      data.testDetail = {
        testData: {
          ...testDetails[index].testData,
          testDate: {
            value: value
              ? dayjs(value).format(DATEFORMATS.PROFILE_HEALTH_TEST)
              : testDetails[index].testData.testDate.value,
            state: this.setHealthTestState(
              type,
              healthTestDataFieldName.date,
              testDetails[index].testData.testDate.value,
            ),
            empty: this.setHealthTestEmptyState(
              type,
              healthTestDataFieldName.date,
              value,
              testDetails[index].testData.testDate.value,
            ),
          },
        },
      };
    }
    if (type === healthTestDataFieldName.result) {
      data.testDetail = {
        testData: {
          ...testDetails[index].testData,
          testResult: {
            value: value ? value : testDetails[index].testData.testResult.value,
            state: this.setHealthTestState(
              type,
              healthTestDataFieldName.result,
              testDetails[index].testData.testResult.value,
            ),
            empty: this.setHealthTestEmptyState(
              type,
              healthTestDataFieldName.result,
              value,
              testDetails[index].testData.testResult.value,
            ),
          },
        },
      };
    }
    if (type === healthTestDataFieldName.how) {
      data.testDetail = {
        testData: {
          ...testDetails[index].testData,
          howWasThistestPerformed: {
            value: value
              ? value
              : testDetails[index].testData.howWasThistestPerformed.value,
            state: this.setHealthTestState(
              type,
              healthTestDataFieldName.how,
              testDetails[index].testData.howWasThistestPerformed.value,
            ),
            empty: this.setHealthTestEmptyState(
              type,
              healthTestDataFieldName.how,
              value,
              testDetails[index].testData.howWasThistestPerformed.value,
            ),
          },
        },
      };
    }
    if (type === healthTestDataFieldName.photo) {
      data.testDetail = {
        testData: {
          ...testDetails[index].testData,
          document: {
            name: this.setHealthTestValue(
              type,
              healthTestDataFieldName.photo,
              type === healthTestDataFieldName.photo ? value.name : '',
              testDetails[index].testData.document.name,
            ),
          },
        },
      };
    }
    if (type === healthTestDataFieldName.type) {
      data.testDetail.testData.testResult.value = '';
    }
    editHealthData(data);
    checkMissingFields(value === '' ? true : this.checkMissingFields());
  };

  checkMissingFieldAtIndex = (index, type) => {
    let forbiddenValues = [
      type === healthTestDataFieldName.photo
        ? type
        : this.props.testDetails[index]?.testData?.document?.name,
      type === healthTestDataFieldName.how
        ? type
        : this.props.testDetails[
            index
          ].testData.howWasThistestPerformed.value.trim(),
      type === healthTestDataFieldName.result
        ? type
        : this.props.testDetails[index].testData.testResult.value,
      type === healthTestDataFieldName.date
        ? type
        : this.props.testDetails[index].testData.testDate.value.trim(),
      type === healthTestDataFieldName.type
        ? type
        : this.props.testDetails[index].testData.testType.value,
      type === healthTestDataFieldName.centre
        ? type
        : this.props.testDetails[index].testData.testCentre.value.trim(),
    ];
    return forbiddenValues.indexOf('') === -1 ? false : true;
  };

  checkAnyMissingField = () => {
    if (
      this.props.testDetails.findIndex(
        (detail) => detail.testData.missingFields,
      ) >= 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  addTestDetails = () => {
    let data = {
      testData: {
        id: this.state.id,
        testCentre: {value: '', empty: true, status: ''},
        testType: {
          value: Platform.select({ios: '', android: 'Antibody test'}),
          empty: Platform.OS === 'ios',
          status: '',
        },
        testDate: {value: '', empty: true, status: ''},
        testResult: {
          value: Platform.select({ios: '', android: 'IgG only positive'}),
          empty: Platform.OS === 'ios',
          status: '',
        },
        howWasThistestPerformed: {
          value: translate('testMethods')[0],
          empty: false,
          status: '',
        },
        document: {
          name: '',
          type: '',
          uri: '',
        },
        missingFields: true,
      },
    };
    this.setState({
      id: this.state.id + 1,
    });
    this.props.checkMissingFields(true);
    this.props.addHealthDataFields(data);
    this.props.updateMissingFieldStatus(this.props.testDetails.length - 1);
    this.checkMissingFieldAtIndex(this.props.testDetails.length - 1);
    this.flatList.scrollToEnd();
  };

  sendTestDetails = () => {
    logAnalyticsEvent(analyticsIds.onboard_health_test_finished);
    const data = new FormData();
    data.append('step', 7);
    this.props.testDetails.forEach((test, index) => {
      data.append(`data[${index}][user_id]`, this.props.id);
      data.append(
        `data[${index}][test_center]`,
        test.testData.testCentre.value,
      );
      data.append(`data[${index}][test_type]`, test.testData.testType.value);
      data.append(`data[${index}][test_date]`, test.testData.testDate.value);
      data.append(
        `data[${index}][test_result]`,
        test.testData.testResult.value,
      );
      data.append(
        `data[${index}][test_performed]`,
        test.testData.howWasThistestPerformed.value,
      );
      data.append(`data[${index}][document]`, test.testData.document.name);
    });
    this.props.submitHealthTestData(
      data,
      this.props.access_token,
      this.props.id,
      'SignUp',
    );
    this.props.visitingProfileViaAction('SignUp');
  };

  pickerSelectedValue = (index, type) => {
    if (type === 'type') {
      return this.props.testDetails[index].testData.testType.value;
    }
    if (type === 'date') {
      return this.props.testDetails[index].testData.testDate.value;
    }
    if (type === 'result') {
      return this.props.testDetails[index].testData.testResult.value;
    }
  };

  formatImageSource = (source) => {
    if (Platform.OS !== 'android' && source && source.uri) {
      source.fileName = source.uri.substring(source.uri.lastIndexOf('/') + 1);
    }
    source.fileName = source.fileName.replace(/ /g, '_').toLowerCase();
    return source;
  };
  uploadImage = (index, type = 'photo') => {
    let accessToken = this.props.access_token;
    let userID = this.props.id;
    let docType = docTypes.HEALTH;
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
        imagePicker(buttonIndex, async (source) => {
          if (!source?.fileName) {
            this.props.loading(false);
            return;
          }
          if (source === cameraError) {
            this.setState({error: true});
            return;
          }
          let OSformattedImageSource = this.formatImageSource(source);
          this.props.uploadImageS3(
            OSformattedImageSource,
            accessToken,
            userID,
            docType,
            index,
          );
        });
      },
    );
  };

  storeUserDataAndGotToProfile = async () => {
    logAnalyticsEvent(analyticsIds.onboard_test_skipped);
    let sensor = await ReactNativeBiometrics.isSensorAvailable();
    const {available, biometryType} = sensor;
    if (available && biometryType === ReactNativeBiometrics.TouchID) {
      this.props.navigation.navigate('TouchID');
      return;
    }
    if (available && biometryType === ReactNativeBiometrics.FaceID) {
      this.props.navigation.navigate('FaceID');
      return;
    }
    if (available && biometryType === ReactNativeBiometrics.Biometrics) {
      this.props.navigation.navigate('TouchID');
      return;
    }
    this.props.storeToken(this.props.access_token, this.props.id, null, true);
    AsyncStorage.removeItemFromStorage('PROFILEVISITED');

    ModalsQueue.showModal({
      modalId: modalIds.walkThrough,
      showModalFunction: () => this.props.profileVisitedBeforeAction(false),
    });
  };
  closeError = () => {
    this.setState({error: false});
  };

  testDetailItem = ({index, item, resultOptions}) => {
    return (
      <TestDetail
        item={item}
        results={this.props.results}
        showDatePicker={this.showDatePicker}
        showPicker={this.showPicker}
        typeArray={this.props.types}
        resultsArray={resultOptions}
        setTestData={this.setTestData}
        borderStyle={Style.borderStyle}
        index={index}
        uploadImage={this.uploadImage}
        checkAnyMissingField={this.props.missingFields}
        deleteCell={(cellindex) => this.props.deleteTestDetailRow(cellindex)}
        dataSize={this.props.testDetails.length}
      />
    );
  };

  continueButtonAction = async () => {
    const {access_token, id, storeToken} = this.props;
    if (this.checkMissingFields()) {
      this.props.checkMissingFieldsInTestObject();
      return;
    }
    this.sendTestDetails();

    let sensor = await ReactNativeBiometrics.isSensorAvailable();
    const {available, biometryType} = sensor;
    if (available && biometryType === ReactNativeBiometrics.TouchID) {
      this.props.navigation.navigate('TouchID');
      return;
    }
    if (available && biometryType === ReactNativeBiometrics.FaceID) {
      this.props.navigation.navigate('FaceID');
      return;
    }
    if (available && biometryType === ReactNativeBiometrics.Biometrics) {
      this.props.navigation.navigate('TouchID');
      return;
    }

    storeToken(access_token, id);
    AsyncStorage.removeItemFromStorage(AsyncConstants.STEP);
  };

  checkMissingFields = () => {
    let healthTestArray = this.props.testDetails;
    let valuesArray = [];
    let status = null;
    healthTestArray.forEach((test) => {
      for (let key in test.testData) {
        if (this.checkKeyType(key)) {
          valuesArray.push(this.checkValue(test.testData, key));
        }
      }
    });
    if (valuesArray.indexOf(true) >= 0) {
      status = true;
    } else {
      status = false;
    }
    return status;
  };

  checkValue = (obj, key) => {
    if (key === 'document') {
      return obj[key].name !== '' ? false : true;
    }
    if (obj[key].value !== '') {
      return false;
    }
    return true;
  };

  checkKeyType = (key) => {
    if (key === 'missingFields') {
      return false;
    }
    if (key === 'checkMissingFieldsAtTheEnd') {
      return false;
    }
    return true;
  };

  renderDatePicker = () => {
    const {showDatePicker, date} = this.state;
    if (!showDatePicker) {
      return null;
    }
    return (
      <CDatePicker
        maximumDate={new Date()}
        mode={'date'}
        showDatePicker={this.datePickerSelected}
        setChosenDate={this.setChosenDate}
        modalVisible={showDatePicker}
        chosenDate={date}
      />
    );
  };

  setChosenDate = (event, date) => {
    if (Platform.OS === 'android') {
      this.setState({
        showDatePicker: false,
      });
    }
    if (date) {
      this.setState({
        date: date,
      });
      this.setTestData(this.props.currentSelectedIndex, 'date', date);
    }
  };

  datePickerSelected = () => {
    this.showDatePicker(this.props.currentSelectedIndex, 'date');
  };

  showDatePicker = (index, type) => {
    this.setState(
      {
        showDatePicker: !this.state.showDatePicker,
      },
      () => {
        let data = {
          index: index,
          type: type,
        };
        this.props.updateTypeAndIndex(data);
      },
    );
    if (
      dayjs(this.state.date).format(DATEFORMATS.PROFILE_HEALTH_SPACED) ===
        dayjs(new Date()).format(DATEFORMATS.PROFILE_HEALTH_SPACED) &&
      type === 'date'
    ) {
      this.setTestData(
        this.props.currentSelectedIndex,
        'date',
        this.state.date,
      );
    }
  };
  render() {
    let resultOptions = [];

    const selectedResultValue = this.props.results.find(
      (result) =>
        result.type.toLowerCase() ===
        this.props.testDetails[
          this.props.currentSelectedIndex
        ].testData.testType.value.toLowerCase(),
    );

    if (selectedResultValue) {
      resultOptions = selectedResultValue.options;
    }

    return (
      <View style={Style.container}>
        <KeyboardAvoidingView
          style={Style.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'android' ? 44 : 0}>
          <View style={Style.innerContainer}>
            <CLabel style={Style.infoStageLabel} text={'7/7'} />
            <CLabel
              style={Style.appTitle}
              text={translate('healthTest.didYouHaveHealthTest')}
            />
            <FlatList
              ref={(ref) => (this.flatList = ref)}
              data={this.props.testDetails}
              extraData={this.props}
              keyExtractor={(item) => keyExtractor(item.testData)}
              renderItem={this.testDetailItem}
            />
            {this.checkMissingFields() ? null : (
              <CButton
                testID={testIds.addAnotherTest}
                accessibilityLabel={testIds.addAnotherTest}
                text={translate('healthTest.addAnotherTest')}
                textStyle={Style.blackText}
                buttonContainerStyle={Style.addDocsButton}
                onPress={this.addTestDetails}
              />
            )}
          </View>
        </KeyboardAvoidingView>
        <View style={Style.buttonsContainer}>
          <CButton
            testID={testIds.continue}
            accessibilityLabel={testIds.continue}
            text={translate('healthTest.continue')}
            textStyle={Style.whiteText}
            buttonContainerStyle={Style.blackButton}
            onPress={this.continueButtonAction}
            loading={this.props.loading}
            disabled={this.props.loading}
            backgroundColor={Style.blackButton.backgroundColor}
          />
          <CButton
            {...getTestIdentifiers(testIds.skipTest)}
            text={translate('healthTest.iDoNotHaveAnyTest')}
            textStyle={Style.blackText}
            buttonContainerStyle={Style.whiteButton}
            onPress={this.storeUserDataAndGotToProfile}
            disabled={this.props.loading}
            backgroundColor={Style.whiteButton.backgroundColor}
          />
        </View>
        {this.state.showPicker && (
          <CPicker
            selectedValue={this.pickerSelectedValue(
              this.props.currentSelectedIndex,
              this.props.currentType,
            )}
            setTitle={(title) => {
              this.setTestData(
                this.props.currentSelectedIndex,
                this.props.currentType,
                title,
              );
            }}
            showDatePicker={(title) => {
              this.showPicker(this.props.currentSelectedIndex);
              this.setTestData(
                this.props.currentSelectedIndex,
                this.props.currentType,
                title,
              );
            }}
            pickerItems={
              this.props.currentType === 'type'
                ? this.props.types
                : resultOptions
            }
          />
        )}

        <Modal visible={this.state.error}>
          <ErrorView
            style={Style.errorStyle}
            errorText={translate('STRINGS.ERROR_CAMERA_HEALTH_TEST')}
            onClose={this.closeError}
          />
        </Modal>

        {this.renderDatePicker()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    personalDetails: {access_token, id},
  } = state;
  const {
    testDetails,
    currentSelectedIndex,
    results,
    types,
    currentType,
    missingFields,
    loading,
  } = state.healthTest;
  return {
    testDetails,
    currentSelectedIndex,
    results,
    currentType,
    missingFields,
    loading,
    types,
    access_token,
    id,
  };
};

const mapDispatchToProps = {
  editHealthData: editHealthDataAction,
  addHealthDataFields: addHealthDataFieldsAction,
  updateTypeAndIndex: updateTypeAndIndexAction,
  checkMissingFields: checkMissingFieldsAction,
  deleteTestDetailRow: deleteTestDetailRowAction,
  submitHealthTestData: submitHealthTestDataAction,
  checkMissingFieldsInTestObject: checkMissingFieldsInTestObjectAction,
  storeToken: StoreToken,
  uploadImageS3: uploadImageAction,
  visitingProfileViaAction: visitingProfileViaAction,
  updateMissingFieldStatus: updateMissingFieldAction,
  profileVisitedBeforeAction: profileVisitedBeforeAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(connectActionSheet(HealthTest));
