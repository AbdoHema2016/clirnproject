import React from 'react';
import {View} from 'react-native';
import CLabel from '../../../../../components/cLabel';
import {Style} from '../style';
import {Constants} from '../../../../../utilities';
import {translate} from '../../../../../Localization';

import CNavigationBackButton from '../../../../../components/cNavigationBackButton';
import dayjs from 'dayjs';
import ModalsQueue from '../../../../../services/ModalsQueue';
import {
  logAnalyticsEvent,
  setUserAnalyticsProperties,
} from '../../../../../utilities/Firebase';

const {DATEFORMATS, temperatureType, modalIds, analyticsIds} = Constants;

class TemperatureHistoryHelperFunctions {
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

  getHistoryAction = async () => {
    const {getHistory, access_token} = this.props;
    getHistory(access_token);
  };

  navigationOptions = () => {
    this.props.navigation.setOptions({
      title: '',
      headerTransparent: true,
      headerLeft: () => (
        <CNavigationBackButton
          grey={true}
          title={translate('BACK.BACK_BUTTON_TITLE')}
          titleStyle={Style.backButtonStyle}
          backButtonAction={this.goBack}
        />
      ),
    });
  };

  goBack = () => {
    this.props.navigation.pop();
  };

  checkTemperatureType = (type) => {
    if (type === 1) {
      return temperatureType.C;
    }
    return temperatureType.F;
  };

  checkTemperatureSource = (source) => {
    if (source === 0) {
      return temperatureType.User_Added;
    }
    if (source === 1) {
      return temperatureType.HIK_Camera;
    }
    return temperatureType.Thermal_Scanner;
  };

  historyRenderItem = ({item, index}) => {
    return (
      <View style={Style.historyCard}>
        <View style={Style.flexRow}>
          <CLabel style={Style.temperature} text={item.temperature} />
          <CLabel
            style={Style.temperature}
            text={' ' + this.checkTemperatureType(item.preferred_measurement)}
          />
          <CLabel
            style={Style.temperature}
            text={' (' + this.checkTemperatureSource(item.source) + ')'}
          />
        </View>

        <CLabel style={Style.status} text={item.health_status} />
        <CLabel
          style={Style.time}
          text={dayjs(
            item.date_of_reading,
            DATEFORMATS.TEMPERATURE_DATE,
          ).format(DATEFORMATS.TESTDETAILS)}
        />
        <View style={Style.underLine} />
      </View>
    );
  };

  addNew = () => {
    const {userLocation = '', associatedCompany = ''} = this.props;
    const screenName = analyticsIds.tempResultsScreen;
    setUserAnalyticsProperties({
      userLocation,
      screenName,
      associatedCompany,
    });
    logAnalyticsEvent(analyticsIds.tempResultsScreen_temp_added, {
      userLocation,
      screenName,
      company: associatedCompany,
    });
    ModalsQueue.showModal({
      modalId: modalIds.addNewTemperature,
      showModalFunction: () => this.instance.setState({showModal: true}),
    });
  };

  hideModal = () => {
    ModalsQueue.hideModal({
      modalId: modalIds.addNewTemperature,
      hideModalFunction: () => this.instance.setState({showModal: false}),
    });
  };
}

const temperatureHistoryHelperFunctionsHelperFunctions = new TemperatureHistoryHelperFunctions();

export default temperatureHistoryHelperFunctionsHelperFunctions;
