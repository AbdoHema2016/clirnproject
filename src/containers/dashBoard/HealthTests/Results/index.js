import React, {Component} from 'react';
import {View, FlatList, RefreshControl} from 'react-native';
import {Style} from './style';
import CLabel from '../../../../components/cLabel';
import {connect} from 'react-redux';
import {
  HelperFunctions,
  testIds,
  HealthTestScreen,
  LOCAL_PATH,
} from '../../../../utilities';
import {translate} from '../../../../Localization';
import Loader from '../../../../components/cLoader';
import resultsMethods from './ResultsMethods';
import CButtonWithImage from '../../../../components/cButtonWithImage';
import {getHealthTestsAction, updateHealthTestIDAction} from './redux/actions';
import {
  editHealthTestAction,
  addHealthTestAction,
} from '../../Home/redux/actions';
const {keyExtractor} = HelperFunctions;
import COverlay from '../COverlay/COverlay';
import {HealthtestMethodsObj} from '../../Home/Methods';

class HealthTestsResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errored: false,
      showModal: false,
      refreshing: false,
      showDatePicker: false,
      date: new Date(),
      id: 0,
      error: false,
      screen: HealthTestScreen,
    };
    resultsMethods.setProps = this.props;
    resultsMethods.setInstance = this;
    this.healthRefState = HealthtestMethodsObj.instance;
    this.healthRefProps = HealthtestMethodsObj.props;
  }
  componentDidMount() {
    HealthtestMethodsObj.setInstance = this;
    HealthtestMethodsObj.setProps = this.props;
    let {access_token} = this.props;
    this.props.getHealthTests(access_token);
  }
  componentWillUnmount() {
    HealthtestMethodsObj.setInstance = this.healthRefState;
    HealthtestMethodsObj.setProps = this.healthRefProps;
  }

  checkIfThereIsAnyHistory = () => {
    let {healthTestsResults} = this.props;
    if (healthTestsResults.length > 0) {
      return (
        <View style={Style.flatList}>
          <FlatList
            data={healthTestsResults}
            contentContainerStyle={Style.listContainer}
            renderItem={resultsMethods.historyRenderItem}
            keyExtractor={keyExtractor}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={resultsMethods.refreshTests}
              />
            }
            showsVerticalScrollIndicator={false}
          />
        </View>
      );
    }

    return (
      <View style={Style.noHistoryContainer}>
        <CLabel
          style={Style.noData}
          text={translate('HEALTH_TEST_SCREEN.NO_TESTS')}
        />
      </View>
    );
  };

  render() {
    return (
      <View style={Style.container}>
        <COverlay
          instance={this}
          source={'HealthResults'}
          instanceState={this.state}
          props={this.props}
        />
        <CLabel
          style={Style.appTitle}
          text={translate('HEALTH_TEST_SCREEN.TITLE')}
        />
        {this.checkIfThereIsAnyHistory()}

        <Loader loading={this.props.loading} />
        <CButtonWithImage
          testID={testIds.addNew}
          accessibilityLabel={testIds.addNew}
          buttonContainerStyle={Style.addNewButton}
          text={translate('VACCINE_SCREEN.ADD')}
          textStyle={Style.addNewButtonText}
          imagePath={LOCAL_PATH.plus}
          customeImageStyle={Style.addImageStyle}
          onPress={resultsMethods.addNewTest}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    signIn: {token},
    temperatureHistoryReducer: {modalIndex},
    healthTestResults: {loading, healthTestsResults},
    userProfile: {
      uploadingHealhtTestImage,
      associatedCompany,
      userInfo: {userLocation},
    },
  } = state;
  return {
    access_token: token,
    loading,
    modalIndex,
    healthTestsResults,
    userLocation,
    associatedCompany,
    healthTests: state.healthTest,
    uploadingHealhtTestImage,
  };
};

const mapDispatchToProps = {
  getHealthTests: getHealthTestsAction,
  updateHealthTestID: updateHealthTestIDAction,
  editHealthData: editHealthTestAction,
  addHealthDataFields: addHealthTestAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(HealthTestsResults);
