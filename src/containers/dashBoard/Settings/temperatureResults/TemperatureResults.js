import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import {Style} from './style';
import CLabel from '../../../../components/cLabel';
import CButton from '../../../../components/cButton';
import {connect} from 'react-redux';
import {updateModalIndexAction as updateProfileModalIndexAction} from '../../Home/redux/actions';
import {getTempHistoryAction, updateModalIndexAction} from './redux/actions';
import {
  HelperFunctions as HelperUtilityFunctions,
  Constants,
} from '../../../../utilities';
import {translate} from '../../../../Localization';

import Loader from '../../../../components/cLoader';
import COverlay from './addNewTemperature';
import HelperFunction from './helperFunctions';

const {keyExtractor} = HelperUtilityFunctions;
const {profileModals, testIds} = Constants;

class TemperatureResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errored: false,
      showModal: false,
    };
    HelperFunction.setProps = this.props;
    HelperFunction.setInstance = this;
  }

  componentDidMount() {
    this.props.updateProfileModalIndex(profileModals.closeModal);
    HelperFunction.navigationOptions();
    HelperFunction.getHistoryAction();
  }

  checkIfThereIsAnyHistory = () => {
    const {temperatureHistory} = this.props;
    if (temperatureHistory?.length > 0) {
      return (
        <View style={Style.flatList}>
          <FlatList
            data={temperatureHistory}
            contentContainerStyle={Style.listContainer}
            renderItem={HelperFunction.historyRenderItem}
            keyExtractor={keyExtractor}
          />
        </View>
      );
    }

    return (
      <View style={Style.noHistoryContainer}>
        <CLabel
          style={Style.noData}
          text={translate('TEMPERATURE_SCREEN_STRINGS.NO_TEMPERATURE_HISTORY')}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={Style.container}>
        <COverlay
          instance={this}
          instanceState={this.state}
          props={this.props}
          source={'History'}
          hideModal={HelperFunction.hideModal}
        />
        <CLabel
          style={Style.appTitle}
          text={translate('TEMPERATURE_SCREEN_STRINGS.TITLE')}
        />
        {this.checkIfThereIsAnyHistory()}
        <Loader loading={this.props.loading} />
        <CButton
          accessibilityLabel={testIds.addNew}
          testID={testIds.addNew}
          onPress={HelperFunction.addNew}
          buttonContainerStyle={Style.addNewButton}
          text={translate('profile.addNew')}
          textStyle={Style.addNewButtonText}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    signIn: {token},
    temperatureHistoryReducer: {temperatureHistory, loading, modalIndex},
    feeling: {id},
    userProfile: {
      userInfo: {userLocation},
      associatedCompany,
    },
  } = state;
  return {
    access_token: token,
    temperatureHistory,
    loading,
    modalIndex,
    userLocation,
    associatedCompany,
    statId: id,
  };
};

const mapDispatchToProps = {
  getHistory: getTempHistoryAction,
  updateTempHistoryModalIndex: updateModalIndexAction,
  updateProfileModalIndex: updateProfileModalIndexAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TemperatureResults);
