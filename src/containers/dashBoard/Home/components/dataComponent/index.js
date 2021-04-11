import React, {Component} from 'react';
import {View, Switch, Text, Image} from 'react-native';
import CLabel from '../../../../../components/cLabel';
import CImage from '../../../../../components/cImage';
import {connect} from 'react-redux';
import {Constants, HelperFunctions} from '../../../../../utilities';
import {translate} from '../../../../../Localization';
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import {
  HealthtestMethodsObj,
  HealthStatusMethodObj,
  ProfleMethodsObj,
} from '../../Methods';
import CButton from '../../../../../components/cButton';
import {Style} from './style';
import dayjs from 'dayjs';
import ModalsQueue from '../../../../../services/ModalsQueue';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {
  logAnalyticsEvent,
  setUserAnalyticsProperties,
} from '../../../../../utilities/Firebase';
dayjs.extend(customParseFormat);

const {SlideInMenu} = renderers;

const {
  DATEFORMATS,
  profileScreenRow,
  temperatureSource,
  LOCAL_PATH,
  temperatureType,
  profileModals,
  modalIds,
  analyticsIds,
  testIds,
} = Constants;
const {
  isHealthTestPositive,
  getTempStatusIndicator,
  formatDate,
  checkVaccinationStatus,
} = HelperFunctions;

class DataComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoAlertVisible: false,
    };
  }

  setSwitchPosition = () => {
    const {index} = this.props;

    if (!this.switch || index !== profileScreenRow.health) {
      return;
    }

    this.switch.measure((x, y, width, height, pageX, pageY) => {
      this.props.instance.setState({
        switchPosition: {
          height: height,
          top: pageY,
          x: pageX - 12,
        },
      });
    });
  };

  checkVisitVia = () => {};

  addNewButtonPressed = () => {
    HealthtestMethodsObj.setInstance = this.props.instance;
    HealthtestMethodsObj.setProps = this.props.props;
    const {props} = this.props;
    const {userLocation = '', route = '', associatedCompany = ''} = props;
    const screenName = route?.name;
    setUserAnalyticsProperties({
      userLocation,
      screenName,
      associatedCompany,
    });
    if (this.props.index === profileScreenRow.health) {
      logAnalyticsEvent(analyticsIds.profile_health_test_started, {
        userLocation,
        screenName,
        company: associatedCompany,
      });
      ModalsQueue.showModal({
        modalId: modalIds.addNewHealthTest,
        showModalFunction: () =>
          HealthtestMethodsObj.showModal(profileModals.HealthUpdateModal),
      });

      return;
    }
    if (this.props.index === profileScreenRow.vaccine) {
      logAnalyticsEvent(analyticsIds.profile_vaccination_started, {
        userLocation,
        screenName,
        company: associatedCompany,
      });
      ModalsQueue.showModal({
        modalId: modalIds.vaccine,
        showModalFunction: () => ProfleMethodsObj.showVaccineModal(true),
      });

      return;
    }
    logAnalyticsEvent(analyticsIds.profile_temp_started, {
      userLocation,
      screenName,
      company: associatedCompany,
    });
    ModalsQueue.showModal({
      modalId: modalIds.addNewTemperature,
      showModalFunction: () =>
        HealthtestMethodsObj.showModal(profileModals.feelingUpdateModal),
    });
  };

  showInfoAlert = () => this.setState({infoAlertVisible: true});
  hideInfoAlert = () => this.setState({infoAlertVisible: false});

  renderInfoButton = () => {
    const {index} = this.props;
    if (index === profileScreenRow.health) {
      return null;
    }

    const {infoAlertVisible} = this.state;

    return (
      <View style={Style.tempSwitchContainer}>
        <Menu
          opened={infoAlertVisible}
          renderer={SlideInMenu}
          onBackdropPress={this.hideInfoAlert}
          rendererProps={{placement: 'bottom'}}>
          <MenuTrigger onPress={this.showInfoAlert} style={Style.menuTrigger}>
            <View style={Style.profileInfoIconContainer}>
              <Image
                source={LOCAL_PATH.PROFILE_INFO_ICON}
                style={Style.infoIcon}
              />
            </View>
          </MenuTrigger>

          <MenuOptions optionsContainerStyle={Style.infoAlertContainer}>
            <Text style={Style.infoAlertText}>
              {translate('profile.healthDeclaration')}
            </Text>
          </MenuOptions>
        </Menu>
      </View>
    );
  };

  setIconName = () => {
    const {stats, index, isVerified, lastAddedVaccine} = this.props;
    if (!stats) {
      return LOCAL_PATH.ADD_IMAGE_ICON;
    }
    if (index === profileScreenRow.health) {
      return isHealthTestPositive(stats.test, isVerified);
    }
    if (index === profileScreenRow.vaccine) {
      return checkVaccinationStatus(lastAddedVaccine.status, isVerified);
    }
    return getTempStatusIndicator(stats, isVerified);
  };

  showSubInfo = (index, testTaken, testType, source, hikDeviceName) => {
    const {lastAddedVaccine, temperature, preferred_measurement} = this.props;
    if (index === profileScreenRow.health) {
      return testTaken ? testType : '';
    }
    if (index === profileScreenRow.vaccine) {
      return lastAddedVaccine?.name ? lastAddedVaccine?.name : '';
    }
    return temperature + ' ' + preferred_measurement;
  };

  checkTemperatureSource = (source, hikDeviceName) => {
    if (source === temperatureSource.User_Added) {
      return temperatureType.User_Added;
    }
    if (source === temperatureSource.HIK_Camera) {
      return hikDeviceName;
    }
    return temperatureType.Thermal_Scanner;
  };

  returnTitle = () => {
    const {index, preferred_measurement, temperature} = this.props;
    if (index === profileScreenRow.health) {
      return translate('profile.healthTest');
    }
    if (index === profileScreenRow.temperature) {
      return temperature + ' ' + preferred_measurement;
    }
    return translate('VACCINE_SCREEN.Flu');
  };

  returnDate = () => {
    const {index, testDate, dateOfReading, lastAddedVaccine} = this.props;
    if (index === profileScreenRow.health) {
      return dayjs(testDate).format(DATEFORMATS.TESTDATE);
    }
    if (index === profileScreenRow.temperature) {
      return dayjs(dateOfReading, DATEFORMATS.TEMPERATURE_DATE).format(
        DATEFORMATS.TESTDATE,
      );
    }
    return formatDate(lastAddedVaccine?.test_date);
  };

  toggleSwitch = () => {
    const {index} = this.props;
    if (index === profileScreenRow.health) {
      return HealthtestMethodsObj.showHideHealthTest();
    }
    if (index === profileScreenRow.temperature) {
      return HealthStatusMethodObj.isTempEnabled();
    }
    return ProfleMethodsObj.toggleVaccineSharing();
  };

  returnToggleValue = () => {
    const {
      index,
      showTestInfo,
      showTemperature,
      showVaccineToOtherUser,
    } = this.props;
    if (index === profileScreenRow.health) {
      return showTestInfo;
    }
    if (index === profileScreenRow.temperature) {
      return showTemperature;
    }
    return showVaccineToOtherUser;
  };
  showVerifiedLabel = () => {
    const {index, isVerified} = this.props;
    if (
      (index === profileScreenRow.health ||
        index === profileScreenRow.vaccine) &&
      isVerified
    ) {
      return (
        <Text accessibilityLabel={testIds.verify} style={Style.verifiedLabel}>
          {translate('healthTest.verified')}
        </Text>
      );
    }
    return null;
  };
  render() {
    const {
      index,
      testTaken,
      testType,
      source,
      testID,
      SwitchTestID,
      hikDeviceName,
    } = this.props;
    return (
      <View style={Style.data}>
        <View style={Style.infoIconContainer}>
          <View style={Style.verifiedIconCotainer}>
            <CImage
              imageStyle={Style.verifiedIcon}
              imagePath={this.setIconName()}
            />
          </View>
        </View>
        <View style={Style.healthTestDetailsContainer}>
          <CLabel
            text={this.showSubInfo(
              index,
              testTaken,
              testType,
              source,
              hikDeviceName,
            )}
            numberOfLines={1}
            ellipsizeMode="middle"
            style={Style.healthTestStatusLabel}
          />
          {this.showVerifiedLabel()}
          <CLabel
            testID={testIds.profileTestDate}
            accessibilityLabel={testIds.profileTestDate}
            text={this.returnDate()}
            style={Style.dateLabel}
          />
          <CButton
            accessibilityLabel={testID}
            onPress={this.addNewButtonPressed}
            textStyle={Style.buttonTextStyle}
            text={translate('profile.addNew')}
            buttonCustomStyle={Style.addNewButtonInnerContainer}
            buttonContainerStyle={Style.buttonCustomStyle}
          />
        </View>
        <View style={Style.alertContainer}>
          <View
            ref={(ref) => {
              if (index === 1) {
                this.switch = ref;
              }
            }}
            onLayout={this.setSwitchPosition}>
            <Switch
              accessibilityLabel={SwitchTestID}
              trackColor={{
                false: Style.trackColorWhenFalse,
                true: Style.trackColorWhenTrue,
              }}
              style={Style.switchStyle}
              thumbColor={
                this.props.isEnabled
                  ? Style.thumbColorWhenEnabled
                  : Style.thumbColorWhenDisabled
              }
              onValueChange={this.toggleSwitch}
              value={this.returnToggleValue()}
            />
          </View>
          {index === profileScreenRow.temperature && this.renderInfoButton()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    userProfile: {
      userInfo: {
        lastAddedVaccine,
        healthReport: {
          infected,
          dateOfReading,
          temperature,
          preferred_measurement,
          testTaken,
          testType,
          testDate,
          testResult,
          source,
          hikDeviceName,
        },
        username,
        stats,
      },
      via,
      showTestInfo,
      showTemperature,
      showVaccineToOtherUser,
    },
  } = state;
  return {
    stats,
    dateOfReading,
    username,
    infected,
    showTestInfo,
    showTemperature,
    testDate,
    temperature,
    preferred_measurement,
    via,
    testTaken,
    testType,
    testResult,
    source,
    hikDeviceName,
    lastAddedVaccine,
    showVaccineToOtherUser,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DataComponent);
