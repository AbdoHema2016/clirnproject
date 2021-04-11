import {Platform, Keyboard} from 'react-native';
import dayjs from 'dayjs';
import {ProfleMethodsObj} from '../../dashBoard/Home/Methods/profileMethods';
import {Constants, HelperFunctions} from '../../../utilities';
import {translate} from '../../../Localization';

import resultsMethods from '../../dashBoard/HealthTests/Results/ResultsMethods';

const {DATEFORMATS, docTypes, profileModals, HealthTestScreen} = Constants;
const {errorReportLogger} = HelperFunctions;

class HealthtestMethods {
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

  showTestPicker = (index, type) => {
    Keyboard.dismiss();
    this.instance.setState(
      {
        showTestPicker: !this.instance.state.showTestPicker,
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

  pickerSelectedValue = (index, type) => {
    const {
      testType,
      testDate,
      testResult,
    } = this.props.profile.healthTestData[0].testData;

    if (type === 'type') {
      return testType.value;
    }
    if (type === 'date') {
      return testDate.value;
    }
    if (type === 'result') {
      return testResult.value;
    }
  };
  showHideHealthTest = () => {
    const {
      details: {token, userID},
      showTestInfo,
    } = this.instance.props;
    this.instance.setState(
      {
        showHealthTest: !this.instance.state.showHealthTest,
      },
      () => {
        let data = {
          token: token,
          userID: userID,
          status: !showTestInfo ? '1' : '0',
        };
        this.props.showHealthTestInfoAction(data);
      },
    );
  };

  uploadHealthTest = (callback) => {
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
        ProfleMethodsObj.uploadImage(buttonIndex, docTypes.HEALTH, callback);
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

  setChosenDate = (event, date) => {
    if (Platform.OS === 'android') {
      this.instance.setState({
        showDatePicker: false,
      });
    }
    if (date) {
      this.instance.setState({
        date: date,
      });
      this.setTestData(0, 'date', date);
    }
  };

  showDatePicker = (index, type) => {
    Keyboard.dismiss();
    const {
      profile: {healthTestData},
    } = this.props;
    const {
      testData: {testDate},
    } = healthTestData[0];
    this.instance.setState(
      {
        showDatePicker: !this.instance.state.showDatePicker,
      },
      () => {
        let data = {
          index: index,
          type: type,
        };
        this.props.updateTypeAndIndex(data);
        if (!testDate.value) {
          this.setTestData(0, 'date', new Date());
        }
      },
    );
  };

  setTestData = (index, type, value) => {
    const {
      editHealthData,
      profile: {healthTestData},
    } = this.props;
    let data = {
      healthTestData: [],
      index: index,
    };
    if (type === 'centre') {
      data.healthTestData[0] = {
        testData: {
          ...healthTestData[index].testData,
          testCentre: {
            value: value,
            state: this.setHealthTestState(
              type,
              'centre',
              healthTestData[index].testData.testCentre.value,
            ),
            empty: this.setHealthTestEmptyState(
              type,
              'centre',
              value,
              healthTestData[index].testData.testCentre.value,
            ),
          },
        },
      };
    }
    if (type === 'type') {
      data.healthTestData[0] = {
        testData: {
          ...healthTestData[index].testData,
          testType: {
            value: value
              ? value
              : healthTestData[index].testData.testType.value,
            state: this.setHealthTestState(
              type,
              'type',
              healthTestData[index].testData.testType.value,
            ),
            empty: this.setHealthTestEmptyState(
              type,
              'type',
              value,
              healthTestData[index].testData.testType.value,
            ),
          },
        },
      };
    }
    if (type === 'date') {
      data.healthTestData[0] = {
        testData: {
          ...healthTestData[index].testData,
          testDate: {
            value: value
              ? dayjs(value).format(DATEFORMATS.PROFILE_HEALTH_TEST)
              : healthTestData[index].testData.testDate.value,
            state: this.setHealthTestState(
              type,
              'date',
              healthTestData[index].testData.testDate.value,
            ),
            empty: this.setHealthTestEmptyState(
              type,
              'date',
              value,
              healthTestData[index].testData.testDate.value,
            ),
          },
        },
      };
    }
    if (type === 'result') {
      data.healthTestData[0] = {
        testData: {
          ...healthTestData[index].testData,
          testResult: {
            value: value
              ? value
              : healthTestData[index].testData.testResult.value,
            state: this.setHealthTestState(
              type,
              'result',
              healthTestData[index].testData.testResult.value,
            ),
            empty: this.setHealthTestEmptyState(
              type,
              'result',
              value,
              healthTestData[index].testData.testResult.value,
            ),
          },
        },
      };
    }
    if (type === 'how') {
      data.healthTestData[0] = {
        testData: {
          ...healthTestData[index].testData,
          howWasThistestPerformed: {
            value: value
              ? value
              : healthTestData[index].testData.howWasThistestPerformed.value,
            state: this.setHealthTestState(
              type,
              'how',
              healthTestData[index].testData.howWasThistestPerformed.value,
            ),
            empty: this.setHealthTestEmptyState(
              type,
              'how',
              value,
              healthTestData[index].testData.howWasThistestPerformed.value,
            ),
          },
        },
      };
    }
    if (type === 'photo') {
      data.healthTestData[0] = {
        testData: {
          ...healthTestData[index].testData,
          document: {
            name: this.setHealthTestValue(
              type,
              'photo',
              type === 'photo' ? value.name : '',
              healthTestData[index]?.testData?.document?.name,
            ),
          },
        },
      };
    }
    if (type === 'type') {
      data.healthTestData[0].testData.testResult.value =
        Platform.OS === 'ios'
          ? ''
          : healthTestData[index].testData.testResult.value;
      data.healthTestData[0].testData.testResult.empty =
        Platform.OS === 'ios' ? true : false;
      data.healthTestData[0].testData.missingFields =
        Platform.OS === 'ios' ? true : false;
    }
    editHealthData(data);
  };

  checkMissingFieldsInTestObject = () => {
    this.props.checkMissingFieldsInTestObject();
  };

  checkAnyMissingField = () => {
    if (
      this.props.profile.healthTestData.findIndex(
        (detail) => detail.testData.missingFields,
      ) >= 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  formatNewTestData = (HealthData) => {
    const form = new FormData();
    HealthData.forEach((test, index) => {
      form.append('step', 7);
      form.append(`data[${index}][user_id]`, this.props.details.userID);
      form.append(
        `data[${index}][test_center]`,
        test.testData.testCentre.value,
      );
      form.append(`data[${index}][test_type]`, test.testData.testType.value);
      form.append(`data[${index}][test_date]`, test.testData.testDate.value);
      form.append(
        `data[${index}][test_result]`,
        test.testData.testResult.value,
      );
      form.append(
        `data[${index}][test_performed]`,
        test.testData.howWasThistestPerformed.value,
      );
      form.append(`data[${index}][document]`, test.testData.document.name);
    });
    return form;
  };
  updateTestFormat = (HealthData) => {
    let updateData = {};
    HealthData.forEach((test) => {
      updateData = {
        user_id: this.props.details.userID,
        test_center: test.testData.testCentre.value,
        test_type: test.testData.testType.value,
        test_date: test.testData.testDate.value,
        test_result: test.testData.testResult.value,
        test_performed: test.testData.howWasThistestPerformed.value,
        document: test.testData.document.name,
      };
    });
    return updateData;
  };
  sendTestDetails = async () => {
    if (!this.props?.details?.token) {
      const error = new Error(
        'this.props.details.token not found in "sendTestDetails" in healthTestMethods.js',
      );

      errorReportLogger(error);
      return;
    }

    const {healthTestID, profile} = this.props;
    const {screen} = this.instance.state;
    this.showModal(-1);
    if (screen === HealthTestScreen) {
      resultsMethods.refreshTests();
    }
    if (healthTestID) {
      let prevTestData = this.updateTestFormat(profile.healthTestData);
      this.props.updateHealthData({
        data: prevTestData,
        healthTestID: healthTestID,
        token: this.props.details.token,
      });
      this.props.updateHealthTestID(0);
      this.setTestData(0, 'centre', '');
      this.setTestData(0, 'type', '');
      this.setTestData(0, 'date', '');
      this.setTestData(0, 'result', '');
      this.setTestData(0, 'how', '');
      this.setTestData(0, 'photo', {
        name: '',
      });
      return;
    }
    let newTestData = this.formatNewTestData(profile.healthTestData);
    this.props.submitHealthTestData(
      newTestData,
      this.props.details.token,
      this.props.details.userID,
      'Profile',
    );
  };

  showModal = (type, updatePrevTest) => {
    this.instance.setState(
      {
        showModal: type !== profileModals.closeModal,
      },
      () => {
        this.props.updateModalIndex(type);
        if (type === profileModals.HealthUpdateModal) {
          this.addTestDetails(updatePrevTest);
        }
      },
    );
  };

  showNextModal = () => {
    const {modalIndex} = this.instance.state;
    const index =
      modalIndex > profileModals.HealthUpdateModal ? 1 : modalIndex + 1;
    this.props.updateModalIndex(index);
    if (modalIndex === profileModals.HealthUpdateModal) {
      this.addTestDetails();
    }
  };

  addTestDetails = (updatePrevTest) => {
    if (!updatePrevTest) {
      this.props.addHealthDataFields();
    }
    this.checkMissingFieldAtIndex(0);
  };

  checkMissingFieldAtIndex = (index, type = '') => {
    let forbiddenValues = [
      type === 'photo'
        ? type
        : this.props.profile?.healthTestData[index]?.testData?.document?.name,
      type === 'how'
        ? type
        : this.props.profile.healthTestData[
            index
          ].testData.howWasThistestPerformed.value.trim(),
      type === 'result'
        ? type
        : this.props.profile.healthTestData[
            index
          ].testData.testResult.value.trim(),
      type === 'date'
        ? type
        : this.props.profile.healthTestData[
            index
          ].testData.testDate.value.trim(),
      type === 'type'
        ? type
        : this.props.profile.healthTestData[
            index
          ].testData.testType.value.trim(),
      type === 'centre'
        ? type
        : this.props.profile.healthTestData[
            index
          ].testData.testCentre.value.trim(),
    ];
    return forbiddenValues.indexOf('') === -1 ? false : true;
  };
}

export const HealthtestMethodsObj = new HealthtestMethods();
