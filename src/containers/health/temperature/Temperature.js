import React from 'react';
import {View, SafeAreaView, Platform, Text} from 'react-native';
import Style from './style';
import {connect} from 'react-redux';
import CLabel from '../../../components/cLabel/index';
import CButton from '../../../components/cButton/index';
import CButtonWithImage from '../../../components/cButtonWithImage/index';
import navigationService from '../../../Navigation/NavigationService';
import CPicker from '../../../components/cPicker';
import {
  setTempTypeAction,
  setTempIntValAction,
  setTempDecValAction,
  sendTempAction,
} from './redux/actions';
import {signUpStepAction} from '../../onBoarding/personalDetails/redux/actions';
import dayjs from 'dayjs';
import AsyncStorage, {AsyncConstants} from '../../../utilities/AsyncStorage';
import CNavigationBackButton from '../../../components/cNavigationBackButton';
import {
  DATEFORMATS,
  signUpSteps,
  LOCAL_PATH,
  temperatureDefaultValues,
  showErrorMessage,
  temperatureMaxRangeLimit,
  temperatureType,
  testIds,
  analyticsIds,
} from '../../../utilities';
import {translate} from '../../../Localization';

import {logAnalyticsEvent} from '../../../utilities/Firebase';

class Temperature extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showPicker: false,
      intOrDec: '',
      intVal: 0,
      decVal: 0,
    };
    this.nextextInputRef = {};
    navigationService.navigation = this.props.navigation;
  }

  componentDidMount() {
    const {celsius, fahrenheit} = temperatureDefaultValues;
    this.props.setTempIntVal(
      this.props.temperature.tempType === '°F' ? fahrenheit : celsius,
    );
    this.props.setTempDecVal('0');
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
    this.props.navigation.navigate('Feeling');
  };

  tempScaleType = (val) => {
    const {celsius, fahrenheit} = temperatureDefaultValues;
    let intVal = val === '°F' ? fahrenheit : celsius;
    this.props.setTempType(val, intVal, '0');
  };

  hidePicker = () => this.setState({showPicker: false});
  showPicker = (val) => {
    this.setState({
      showPicker: val,
    });
  };

  selectTemperatureValue = (type, val) => {
    this.showPicker(true);
    if (val === null) {
      this.setState({
        intOrDec: type,
      });
    } else {
      if (type === 'INT') {
        this.props.setTempIntVal(val);
      } else {
        this.props.setTempDecVal(val);
      }
    }
  };

  onSkipPressed = () => {
    this.props.signupStep('7');
    AsyncStorage.setItemInStorage(AsyncConstants.STEP, signUpSteps.HealthTest);
    this.props.navigation.navigate('HealthTest');
    logAnalyticsEvent(analyticsIds.onboard_temp_skipped);
  };

  sendTemperatureData = () => {
    const {
      temperature: {tempType, tempIntValue, tempDecValue},
      access_token: token,
      statId,
      sendTempData,
      userID,
    } = this.props;
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

      return showErrorMessage(errorMessage);
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

      return showErrorMessage(errorMessage);
    }
    let data = {
      date_of_reading: dayjs(new Date()).format(DATEFORMATS.TEMPERATURE_DATA),
      temperature: tempIntValue + '.' + tempDecValue,
      preferred_measurement: tempType === '°C' ? '1' : '2',
      user_id: userID,
      step: 6,
    };

    sendTempData(data, token, statId);
    logAnalyticsEvent(analyticsIds.onboard_temp_added);
  };

  render() {
    const {
      temperature: {
        tempType,
        tempIntValue,
        error,
        celciusDegrees,
        fahrenheit,
        tempDecValue,
        decimalPart,
        loading,
      },
    } = this.props;
    const {intOrDec} = this.state;

    return (
      <SafeAreaView style={Style.container}>
        <View style={Style.lablesContainer}>
          <CLabel style={Style.infoStageLabel} text={'6/7'} />
          <CLabel
            style={Style.appTitle}
            text={translate('STRINGS.TEMPERATURE_QUERY')}
          />
          <CLabel
            style={Style.chooseScale}
            text={translate('STRINGS.TEMPERATURE_SCALE')}
          />
        </View>

        <View style={Style.tempScaleType}>
          <CButton
            testID={testIds.selectFeh}
            accessibilityLabel={testIds.selectFeh}
            onPress={() => this.tempScaleType('°F')}
            text={'°F'}
            textStyle={Style.blackText}
            buttonContainerStyle={
              tempType === '°F'
                ? Style.selectedTemperatureScaleTypeButtonContainer
                : Style.unSelectedTemperatureScaleTypeButtonContainer
            }
            buttonCustomStyle={Style.temperatureScaleTypeButton}
          />
          <CButton
            testID={testIds.selectCel}
            accessibilityLabel={testIds.selectCel}
            onPress={() => this.tempScaleType('°C')}
            text={'°C'}
            textStyle={Style.blackText}
            buttonContainerStyle={
              tempType === '°C'
                ? Style.selectedTemperatureScaleTypeButtonContainer
                : Style.unSelectedTemperatureScaleTypeButtonContainer
            }
            buttonCustomStyle={Style.temperatureScaleTypeButton}
          />
        </View>

        <View style={Style.tempScaleType}>
          {Platform.OS === 'ios' ? (
            <CButtonWithImage
              testID={testIds.SelInt}
              accessibilityLabel={testIds.SelInt}
              onPress={() => this.selectTemperatureValue('INT', null)}
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
              testID={testIds.IntPicker}
              accessibilityLabel={testIds.IntPicker}
              androidPickerContainer={
                Style.selTemperatureIntegerValueButtonContainer
              }
              androidPicker={Style.temperatureIntegerValueButton}
              selectedValue={tempIntValue}
              setTitle={(val) => this.selectTemperatureValue('INT', val)}
              showDatePicker={this.showPicker}
              error={error}
              pickerItems={tempType === '°C' ? celciusDegrees : fahrenheit}
              imagePath={LOCAL_PATH.DROP_DOWN_ICON}
            />
          )}

          <CLabel style={Style.dotLabel} text={'.'} />
          {Platform.OS === 'ios' ? (
            <CButtonWithImage
              testID={testIds.SelDec}
              accessibilityLabel={testIds.SelDec}
              onPress={() => this.selectTemperatureValue('DEC', null)}
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
              testID={testIds.DecPicker}
              accessibilityLabel={testIds.DecPicker}
              androidPicker={Style.temperatureIntegerValueButton}
              androidPickerContainer={
                Style.selTemperatureIntegerValueButtonContainer
              }
              selectedValue={tempDecValue}
              setTitle={(val) => this.selectTemperatureValue('DEC', val)}
              showDatePicker={this.showPicker}
              error={error}
              pickerItems={decimalPart}
              imagePath={LOCAL_PATH.DROP_DOWN_ICON}
            />
          )}

          <CLabel style={Style.tempScaleLabel} text={tempType} />
        </View>

        <View style={Style.buttonsContainer}>
          <CButton
            testID={testIds.continue}
            accessibilityLabel={testIds.continue}
            text={translate('LOGIN_SCREEN_STRINGS.CONTINUE_LABEL')}
            textStyle={Style.whiteText}
            onPress={() => this.sendTemperatureData()}
            buttonContainerStyle={Style.abledGreenButton}
            loading={loading}
          />

          <Text
            accessible={true}
            testID={testIds.skip}
            accessibilityLabel={testIds.skip}
            style={Style.skip}
            onPress={() => this.onSkipPressed()}>
            {translate('STRINGS.SKIP')}
          </Text>
        </View>
        {this.state.showPicker && Platform.OS === 'ios' ? (
          <CPicker
            testID={testIds.DecPicker}
            accessibilityLabel={testIds.DecPicker}
            selectedValue={intOrDec === 'DEC' ? tempDecValue : tempIntValue}
            setTitle={(val) => this.selectTemperatureValue(intOrDec, val)}
            showDatePicker={this.hidePicker}
            pickerItems={
              tempType === '°C'
                ? intOrDec === 'INT'
                  ? celciusDegrees
                  : decimalPart
                : intOrDec === 'INT'
                ? fahrenheit
                : decimalPart
            }
          />
        ) : null}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({
  signIn: {userID},
  selectTempType,
  feeling,
  personalDetails,
  userProfile: {
    userInfo: {email},
  },
}) => {
  return {
    email,
    temperature: selectTempType,
    statId: feeling.id,
    access_token: personalDetails.access_token,
    userID,
  };
};

const mapDispatchToProps = {
  setTempType: setTempTypeAction,
  setTempIntVal: setTempIntValAction,
  setTempDecVal: setTempDecValAction,
  sendTempData: sendTempAction,
  signupStep: signUpStepAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Temperature);
