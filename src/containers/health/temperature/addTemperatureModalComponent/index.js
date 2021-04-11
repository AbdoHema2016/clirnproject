import React, {PureComponent} from 'react';
import {View, Text, Platform} from 'react-native';
import {connect} from 'react-redux';
import {
  updateTemperatureAction,
  updateModalIndexAction,
} from '../../../dashBoard/Home/redux/actions';
import {updateTempHistoryModalIndexAction} from '../../../dashBoard/Settings/temperatureResults/redux/actions';
import Style from './style';
import CButton from '../../../../components/cButton';
import CLabel from '../../../../components/cLabel';
import CButtonWithImage from '../../../../components/cButtonWithImage';
import CPicker from '../../../../components/cPicker';
import HelperFunctions from './helperFunctions';
import {Constants} from '../../../../utilities';
import {translate} from '../../../../Localization';

import {
  setTempTypeAction,
  setTempIntValAction,
  setTempDecValAction,
  tempSkippedAction,
} from '../redux/actions';
import {HealthtestMethodsObj} from '../../../dashBoard/Home/Methods';
import ModalsQueue from '../../../../services/ModalsQueue';
import {
  logAnalyticsEvent,
  setUserAnalyticsProperties,
} from '../../../../utilities/Firebase';

const {
  LOCAL_PATH,
  temperatureMaxRangeLimit,
  temperatureDefaultValues,
  temperatureType,
  modalStatus,
  profileModals,
  modalIds,
  testIds,
  analyticsIds,
} = Constants;

class CTemparatureUpdateModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      intOrDec: '',
      showPicker: false,
      modalIndex: props.modalIndex,
      source: props.source,
    };
    HelperFunctions.setProps = this.props;
    HelperFunctions.setInstance = this;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.feeling !== this.props.feeling) {
      HelperFunctions.setProps = this.props;
    }
  }

  getError = () => {
    const {tempDecValue, tempIntValue, tempType} = this.props;
    const celsiusDecimalAndFractionSplitArray = temperatureMaxRangeLimit.celsius.split(
      '.',
    );

    const celsiusMaxDecimalPlace = celsiusDecimalAndFractionSplitArray[0];
    const celsiusMaxFractionPlace = celsiusDecimalAndFractionSplitArray[1];

    const fahrenheitDecimalAndFractionSplitArray = temperatureMaxRangeLimit.fahrenheit.split(
      '.',
    );

    const fahrenheitMaxDecimalPlace = fahrenheitDecimalAndFractionSplitArray[0];
    const fahrenheitMaxFractionPlace =
      fahrenheitDecimalAndFractionSplitArray[1];

    if (
      tempType === temperatureType.celsiusWithDegree &&
      tempIntValue === celsiusMaxDecimalPlace &&
      tempDecValue > celsiusMaxFractionPlace
    ) {
      const errorMessage =
        translate('STRINGS.MAX_TEMP_LIMIT') +
        temperatureMaxRangeLimit.celsius +
        temperatureType.celsiusWithDegree;

      return errorMessage;
    }

    if (
      tempType === temperatureType.fahrenheitWithDegree &&
      tempIntValue === fahrenheitMaxDecimalPlace &&
      tempDecValue > fahrenheitMaxFractionPlace
    ) {
      const errorMessage =
        translate('STRINGS.MAX_TEMP_LIMIT') +
        temperatureMaxRangeLimit.fahrenheit +
        temperatureType.fahrenheitWithDegree;

      return errorMessage;
    }

    return null;
  };

  onContinuePress = () => {
    const {
      tempDecValue,
      tempIntValue,
      updateTempHistoryModalIndex,
      source,
      hideModal,
      tempType,
      associatedCompany = '',
      feeling,
      updateModalIndex,
      instance,
      userLocation = '',
    } = this.props;
    const {route = ''} = instance.props;
    const screenName = route?.name;
    setUserAnalyticsProperties({
      userLocation,
      screenName,
      associatedCompany,
    });
    logAnalyticsEvent(analyticsIds.temp_finished, {
      userLocation,
      screenName,
      company: associatedCompany,
    });
    const {celsiusWithDegree} = temperatureType;

    const addTemperatureError = this.getError();

    if (addTemperatureError) {
      return;
    }
    HelperFunctions.sendTemperatureData(
      tempDecValue,
      tempIntValue,
      tempType || celsiusWithDegree,
    );

    if (
      associatedCompany &&
      (feeling?.feeling?.value === translate('healthStatus.Iamnottoosure') ||
        feeling?.feeling?.value === translate('healthStatus.Idonotfeelwell')) &&
      feeling?.feeling?.value
    ) {
      if (source === 'History') {
        updateTempHistoryModalIndex(profileModals.contactHR);
        return;
      }

      updateModalIndex(profileModals.contactHR);
      return;
    }
    this.hideTemperatureUpdateModal();

    if (source === 'History') {
      hideModal();
      updateTempHistoryModalIndex(profileModals.feelingUpdateModal);
    }
  };

  onSkipPress = () => {
    const {
      source,
      hideModal,
      updateTempHistoryModalIndex,
      feeling,
      associatedCompany,
      updateModalIndex,
    } = this.props;
    if (
      associatedCompany &&
      (feeling?.feeling?.value === translate('healthStatus.Iamnottoosure') ||
        feeling?.feeling?.value === translate('healthStatus.Idonotfeelwell')) &&
      feeling?.feeling?.value
    ) {
      if (source === 'History') {
        updateTempHistoryModalIndex(profileModals.contactHR);
        return;
      }
      updateModalIndex(profileModals.contactHR);
      return;
    }
    if (source === 'History') {
      hideModal();
      updateTempHistoryModalIndex(profileModals.feelingUpdateModal);
      HelperFunctions.showModal(modalStatus.profileModalsClosed);

      return;
    }

    this.hideTemperatureUpdateModal();
  };

  hideTemperatureUpdateModal = () =>
    ModalsQueue.hideModal({
      modalId: modalIds.addNewTemperature,
      hideModalFunction: () =>
        HealthtestMethodsObj.showModal(modalStatus.profileModalsClosed),
    });

  getErrorView = () => {
    if (this.getError()) {
      return <Text style={Style.errorText}>{this.getError()}</Text>;
    }
    return null;
  };

  tempScaleType = (val) => {
    const {celsius, fahrenheit} = temperatureDefaultValues;
    const {fahrenheitWithDegree} = temperatureType;
    let intVal = val === fahrenheitWithDegree ? fahrenheit : celsius;

    this.props.setTempType(val, intVal, '0');
  };

  render() {
    const {showPicker, intOrDec} = this.state;
    const {
      tempType,
      tempDecValue,
      tempIntValue,
      celciusDegrees,
      decimalPart,
      fahrenheit,
    } = this.props;
    const {celsiusWithDegree, fahrenheitWithDegree} = temperatureType;

    return (
      <View style={Style.container}>
        <View style={Style.dataView}>
          <View style={Style.lablesContainer}>
            <CLabel
              style={Style.appTitle}
              text={translate('STRINGS.TEMPERATURE_QUERY')}
            />
            <CLabel
              style={Style.chooseScale}
              text={translate('STRINGS.WE_RECOMMEND_TO_UPDATE_TEMP')}
            />
          </View>
          <View style={Style.tempScaleType}>
            <CButton
              onPress={() => this.tempScaleType(fahrenheitWithDegree)}
              text={fahrenheitWithDegree}
              textStyle={Style.blackText}
              buttonContainerStyle={
                tempType === fahrenheitWithDegree
                  ? Style.selectedTemperatureScaleTypeButtonContainer
                  : Style.unSelectedTemperatureScaleTypeButtonContainer
              }
              buttonCustomStyle={Style.temperatureScaleTypeButton}
            />
            <CButton
              onPress={() => this.tempScaleType(celsiusWithDegree)}
              text={celsiusWithDegree}
              textStyle={Style.blackText}
              buttonContainerStyle={
                tempType === celsiusWithDegree
                  ? Style.selectedTemperatureScaleTypeButtonContainer
                  : Style.unSelectedTemperatureScaleTypeButtonContainer
              }
              buttonCustomStyle={Style.temperatureScaleTypeButton}
            />
          </View>

          <View style={Style.tempScaleType}>
            {Platform.OS === 'ios' ? (
              <CButtonWithImage
                onPress={() =>
                  HelperFunctions.selectTemperatureValue('INT', null)
                }
                text={tempIntValue}
                textStyle={Style.blackText}
                imagePath={LOCAL_PATH.DROP_DOWN_ICON}
                buttonContainerStyle={
                  Style.selTemperatureIntegerValueButtonContainer
                }
                buttonCustomStyle={Style.temperatureIntegerValueButton}
              />
            ) : (
              <CPicker
                testID={testIds.temperaturePickerInt}
                accessibilityLabel={testIds.temperaturePickerInt}
                androidPickerContainer={
                  Style.selTemperatureIntegerValueButtonContainer
                }
                androidPicker={Style.temperatureIntegerValueButton}
                selectedValue={tempIntValue}
                setTitle={(val) =>
                  HelperFunctions.selectTemperatureValue('INT', val)
                }
                showDatePicker={HelperFunctions.showPicker}
                error={this.props.error}
                pickerItems={
                  tempType === celsiusWithDegree
                    ? this.props.celciusDegrees
                    : this.props.fahrenheit
                }
                imagePath={LOCAL_PATH.DROP_DOWN_ICON}
              />
            )}

            <CLabel style={Style.dotLabel} text={'.'} />
            {Platform.OS === 'ios' ? (
              <CButtonWithImage
                onPress={() =>
                  HelperFunctions.selectTemperatureValue('DEC', null)
                }
                text={tempDecValue}
                textStyle={Style.blackText}
                imagePath={LOCAL_PATH.DROP_DOWN_ICON}
                buttonContainerStyle={
                  Style.selTemperatureIntegerValueButtonContainer
                }
                buttonCustomStyle={Style.temperatureIntegerValueButton}
              />
            ) : (
              <CPicker
                testID={testIds.tempPickerDec}
                androidPicker={Style.temperatureIntegerValueButton}
                androidPickerContainer={
                  Style.selTemperatureIntegerValueButtonContainer
                }
                selectedValue={tempDecValue}
                setTitle={(val) =>
                  HelperFunctions.selectTemperatureValue('DEC', val)
                }
                showDatePicker={HelperFunctions.showPicker}
                error={this.props.error}
                pickerItems={this.props.decimalPart}
                imagePath={LOCAL_PATH.DROP_DOWN_ICON}
              />
            )}

            <CLabel
              style={Style.tempScaleLabel}
              text={tempType || celsiusWithDegree}
            />
          </View>

          {this.getErrorView()}
          <View style={Style.buttonsContainer}>
            <CButton
              accessibilityLabel={testIds.continueTemperatureAdd}
              text={translate('LOGIN_SCREEN_STRINGS.CONTINUE_LABEL')}
              textStyle={Style.whiteText}
              onPress={this.onContinuePress}
              buttonContainerStyle={Style.abledGreenButton}
            />
            <Text style={Style.skip} onPress={this.onSkipPress}>
              {translate('STRINGS.SKIP')}
            </Text>
          </View>
          {showPicker && Platform.OS === 'ios' ? (
            <CPicker
              selectedValue={intOrDec === 'DEC' ? tempDecValue : tempIntValue}
              setTitle={(val) =>
                HelperFunctions.selectTemperatureValue(this.state.intOrDec, val)
              }
              showDatePicker={() => HelperFunctions.showPicker(false)}
              pickerItems={
                tempType === celsiusWithDegree
                  ? intOrDec === 'INT'
                    ? celciusDegrees
                    : decimalPart
                  : intOrDec === 'INT'
                  ? fahrenheit
                  : decimalPart
              }
            />
          ) : null}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    userProfile: {modalIndex, associatedCompany},
    feeling,
    selectTempType: {
      decimalPart,
      fahrenheit,
      celciusDegrees,
      tempIntValue,
      error,
      tempDecValue,
      tempType,
    },
  } = state;
  return {
    modalIndex,
    details: state.signIn,
    profile: state.userProfile,
    decimalPart,
    fahrenheit,
    error,
    tempDecValue,
    celciusDegrees,
    tempIntValue,
    feeling,
    tempType,
    associatedCompany,
  };
};

const mapDispatchToProps = {
  updateTemperature: updateTemperatureAction,
  setTempType: setTempTypeAction,
  setTempIntVal: setTempIntValAction,
  setTempDecVal: setTempDecValAction,
  sendTempData: updateTemperatureAction,
  updateModalIndex: updateModalIndexAction,
  updateTempHistoryModalIndex: updateTempHistoryModalIndexAction,
  tempSkipped: tempSkippedAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CTemparatureUpdateModal);
