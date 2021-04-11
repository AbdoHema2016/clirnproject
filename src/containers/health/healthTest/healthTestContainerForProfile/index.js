import React from 'react';
import {View, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import {connect} from 'react-redux';
import Style from './style';
import CButton from '../../../../components/cButton';
import CPicker from '../../../../components/cPicker';
import CDatePicker from '../../../../components/cDatePicker';
import {HealthtestMethodsObj} from '../healthTestMethods';
import CTestDetail from '../testDetailsComponent/testDetails';
import {restHealthtTestDataAction} from '../../../dashBoard/Home/redux/actions';
import ModalsQueue from '../../../../services/ModalsQueue';
import {Constants, testIds} from '../../../../utilities';
import {
  logAnalyticsEvent,
  setUserAnalyticsProperties,
} from '../../../../utilities/Firebase';

const {modalIds, profileModals, analyticsIds} = Constants;

class CHealthTestContainer extends React.Component {
  onDeleteCellPress = (cellindex) => {
    const {deleteTestDetailRow} = this.props;
    deleteTestDetailRow(cellindex);

    ModalsQueue.hideModal({
      modalId: modalIds.addNewHealthTest,
      hideModalFunction: () =>
        HealthtestMethodsObj.showModal(profileModals.closeModal),
    });
  };

  checkMissingFields = () => {
    const {
      profile: {healthTestData},
    } = this.props;
    let healthTestObj = healthTestData[0].testData;
    let valuesArray = [];
    for (let key in healthTestObj) {
      if (this.checkKeyType(key)) {
        valuesArray.push(this.checkValue(healthTestObj, key));
      }
    }
    if (valuesArray.indexOf(true) >= 0) {
      return true;
    }
    return false;
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

  sendTestDetails = () => {
    const {associatedCompany = '', userInfo = ''} = this.props.profile;
    const {props} = this.props.instance;
    const screenName = props?.route?.name;
    let eventName = analyticsIds.profile_health_test_finished;
    if (screenName === 'HealthTests') {
      eventName = analyticsIds.healthResultsScreen_health_test_finished;
    }

    setUserAnalyticsProperties({
      userLocation: userInfo.userLocation || '',
      screenName,
      associatedCompany,
    });
    logAnalyticsEvent(eventName, {
      userLocation: userInfo.userLocation || '',
      screenName,
      company: associatedCompany,
    });
    ModalsQueue.hideModal({
      modalId: modalIds.addNewHealthTest,
      hideModalFunction: () => HealthtestMethodsObj.sendTestDetails(),
    });
  };

  render() {
    const {
      instance,
      pickerSelectedValue,
      feeling,
      profile: {
        healthTestData,
        loading,
        results,
        currentSelectedIndex,
        currentType,
        types,
      },
      healthTests: {types: healthTestTypes, testDetails, missingFields},
      callback,
    } = this.props;

    let resultOptions = [];

    const selectedResultValue = results.find(
      (result) =>
        result.type.toLowerCase() ===
        healthTestData[0].testData.testType.value.toLowerCase(),
    );

    if (selectedResultValue) {
      resultOptions = selectedResultValue.options;
    }

    return (
      <View style={Style.container}>
        <KeyboardAvoidingView
          style={Style.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Style.keyboardVerticalOffset.top}>
          <View style={Style.subContainer}>
            <ScrollView
              style={Style.innerContainer}
              bounces={false}
              keyboardShouldPersistTaps="always">
              <View style={Style.scrollViewChildContainer}>
                <CTestDetail
                  item={healthTestData[0]}
                  showDatePicker={HealthtestMethodsObj.showDatePicker}
                  showPicker={HealthtestMethodsObj.showTestPicker}
                  typeArray={healthTestTypes}
                  source={'Profile'}
                  loading={loading}
                  results={results}
                  resultsArray={resultOptions}
                  setTestData={HealthtestMethodsObj.setTestData}
                  index={testDetails.length - 1}
                  uploadImage={() =>
                    HealthtestMethodsObj.uploadHealthTest(callback)
                  }
                  checkAnyMissingField={missingFields}
                  deleteCell={this.onDeleteCellPress}
                  dataSize={testDetails.length}
                />
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
        <View style={Style.buttonsContainer}>
          <CButton
            accessibilityLabel={testIds.saveHealthTest}
            testID={testIds.saveHealthTest}
            text={'Save'}
            textStyle={Style.whiteText}
            loading={feeling.loading}
            onPress={() => {
              this.checkMissingFields()
                ? HealthtestMethodsObj.checkMissingFieldsInTestObject()
                : this.sendTestDetails();
            }}
            buttonContainerStyle={Style.abledGreenButton}
          />
        </View>
        {instance.state.showTestPicker && Platform.OS === 'ios' ? (
          <CPicker
            setTitle={(title) =>
              HealthtestMethodsObj.setTestData(
                currentSelectedIndex,
                currentType,
                title,
              )
            }
            selectedValue={pickerSelectedValue(
              currentSelectedIndex,
              currentType,
            )}
            showDatePicker={() => HealthtestMethodsObj.showTestPicker('')}
            pickerItems={currentType === 'type' ? types : resultOptions}
          />
        ) : null}
        {instance.state.showDatePicker && (
          <CDatePicker
            maximumDate={new Date()}
            mode={'date'}
            showDatePicker={() => HealthtestMethodsObj.showDatePicker('date')}
            setChosenDate={HealthtestMethodsObj.setChosenDate}
            modalVisible={instance.state.showDatePicker}
            chosenDate={instance.state.date}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    userProfile: {
      userInfo: {
        healthReport: {
          infected,
          dateOfReading,
          temperature,
          preferred_measurement,
          testTaken,
          testType,
        },
        username,
      },
      via,
      showTestInfo,
    },
  } = state;
  return {
    dateOfReading,
    username,
    infected,
    showTestInfo,
    temperature,
    preferred_measurement,
    via,
    healthTests: state.healthTest,
    feeling: state.feeling,
    profile: state.userProfile,
    testTaken,
    testType,
  };
};

const mapDispatchToProps = {
  deleteTestDetailRow: restHealthtTestDataAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CHealthTestContainer);
