import React, {Component} from 'react';
import {View, Switch, Platform, Image, Text} from 'react-native';
import CLabel from '../../../../../components/cLabel';
import CImage from '../../../../../components/cImage';
import CButton from '../../../../../components/cButton';
import {Style} from './style';
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import {connect} from 'react-redux';
import {
  HealthtestMethodsObj,
  HealthStatusMethodObj,
  ProfleMethodsObj,
} from '../../Methods';
import {
  Constants,
  Layout,
  analyticsIds,
  HelperFunctions,
} from '../../../../../utilities';
import {translate} from '../../../../../Localization';

import ModalsQueue from '../../../../../services/ModalsQueue';
import {
  logAnalyticsEvent,
  setUserAnalyticsProperties,
} from '../../../../../utilities/Firebase';
const {isHealthTestPositive, getTempStatusIndicator} = HelperFunctions;

const {SlideInMenu} = renderers;

const {LOCAL_PATH, profileModals, modalIds, profileScreenRow} = Constants;
const {LAYOUT_CONSTRAINTS} = Layout;

class NoDataComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoAlertVisible: false,
    };
  }

  setSwitchPoisition = () => {
    const {index} = this.props;
    if (!this.switch || index === profileScreenRow.temperature) {
      return;
    }

    this.switch.measure((x, y, width, height, pageX, pageY) => {
      this.props.instance.setState({
        switchPosition: {
          height: height,
          top: this.checkDeviceTypeAndReturnMarginTop(pageY),
          x: pageX - width / 4,
        },
      });
    });
  };

  renderInfoButton = () => {
    const {index} = this.props;

    if (index === profileScreenRow.temperature) {
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
    }
    return null;
  };

  showInfoAlert = () => this.setState({infoAlertVisible: true});
  hideInfoAlert = () => this.setState({infoAlertVisible: false});

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
        showModalFunction: () =>
          ProfleMethodsObj.showVaccineModal(profileModals.vaccine),
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

  checkDeviceTypeAndReturnMarginTop = (pageY) => {
    const {via} = this.props;
    if (Platform.OS === 'android') {
      return pageY;
    }
    if (LAYOUT_CONSTRAINTS.SCREEN_HEIGHT > 800) {
      return via === 'SignUp' ? pageY : pageY + 44;
    }
    return via === 'SignUp' ? pageY : pageY + 22;
  };

  setIconName = () => {
    const {stats, index, isVerified} = this.props;
    if (!stats) {
      return LOCAL_PATH.ADD_IMAGE_ICON;
    }
    if (index === profileScreenRow.health) {
      return isHealthTestPositive(stats.test, isVerified);
    }
    if (index === profileScreenRow.vaccine) {
      return LOCAL_PATH.ADD_IMAGE_ICON;
    }
    return getTempStatusIndicator(stats);
  };

  returnTitle = () => {
    const {index} = this.props;
    if (index === profileScreenRow.health) {
      return translate('profile.healthTest');
    }
    if (index === profileScreenRow.temperature) {
      return translate('profile.Temperature');
    }
    return translate('VACCINE_SCREEN.Flu');
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
  render() {
    const {testID, index} = this.props;
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
          <CLabel text={this.returnTitle()} style={Style.healthTestLabel} />
          <CButton
            accessibilityLabel={testID}
            textStyle={Style.buttonTextStyle}
            text={translate('profile.adddetails')}
            onPress={this.addNewButtonPressed}
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
            onLayout={this.setSwitchPoisition}>
            <Switch
              trackColor={{
                false: Style.trackColorWhenFalse,
                true: Style.trackColorWhenTrue,
              }}
              style={Style.switchStyle}
              thumbColor={
                this.props.isEnabled
                  ? Style.thumbColorWhenEnabled
                  : Style.thumbColorWhenDisEnabled
              }
              onValueChange={this.toggleSwitch}
              value={this.returnToggleValue()}
            />
          </View>

          {this.renderInfoButton()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    userProfile: {
      via,
      showTestInfo,
      userInfo: {stats},
      showTemperature,
      showVaccineToOtherUser,
    },
  } = state;
  return {
    showTestInfo,
    showTemperature,
    showVaccineToOtherUser,
    via,
    stats,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NoDataComponent);
