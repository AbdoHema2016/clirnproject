import React from 'react';
import {View, KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import {connect} from 'react-redux';
import Style from './style';
import CLabel from '../../../../components/cLabel';
import {translate} from '../../../../Localization';

import {
  healthTestDetailsAction,
  updateHealthTestIDAction,
  healthTestDeleteAction,
  approveHealthTestAction,
  editRejectedHealTestImageAction,
} from '../Results/redux/actions';
import {editHealthTestAction} from '../../Home/redux/actions';
import DetailsMethod from './detailsMethod';
import COverlay from '../COverlay/COverlay';
import {HealthtestMethodsObj} from '../../Home/Methods';
import HealthTestRemovePopup from './healthTestRemovePopup';
import {Constants} from '../../../../utilities';
import dayjs from 'dayjs';
import CLoader from '../../../../components/cLoader';
import {
  logAnalyticsEvent,
  setUserAnalyticsProperties,
} from '../../../../utilities/Firebase';
import HealthDetailsComponent from './detailsComponent';
import {connectActionSheet} from '@expo/react-native-action-sheet';

const {DATEFORMATS, analyticsIds, screenSource} = Constants;
class HealthDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPicker: false,
      zoom: false,
      showModal: false,
      showDatePicker: false,
      removeHealthTestModalVisible: false,
      date: new Date(),
      loading: true,
      popupType: 1,
      uploadingImage: false,
    };
    DetailsMethod.setProps = this.props;
    DetailsMethod.setInstance = this;
    this.healthRefState = HealthtestMethodsObj.instance;
    this.healthRefProps = HealthtestMethodsObj.props;
  }
  componentDidMount() {
    HealthtestMethodsObj.setInstance = this;
    HealthtestMethodsObj.setProps = this.props;
    const {token, route: {params: {id: id} = {}} = {}} = this.props;
    this.props.getHealthTestDetails({token, id});
  }
  componentWillUnmount() {
    HealthtestMethodsObj.setInstance = this.healthRefState;
    HealthtestMethodsObj.setProps = this.healthRefProps;
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.showModal !== this.state.showModal) {
      const {
        token,

        route: {params: id},
      } = this.props;
      this.props.getHealthTestDetails({token, id});
    }
  }
  handleModal = () => {
    this.setState({
      zoom: !this.state.zoom,
    });
  };
  createHealthDetailFields() {
    const {
      healthTestDetails: {
        test_center,
        test_date,
        test_performed,
        test_type,
        test_result,
      },
    } = this.props;
    let healthDetails = [
      {
        id: '0',
        title: translate('healthTest.healthTestCentreName'),
        value: test_center,
      },
      {
        id: '1',
        title: translate('healthTest.type'),
        value: test_type,
      },
      {
        id: '2',
        title: translate('healthTest.date'),
        value: dayjs(test_date, DATEFORMATS.TEMPERATURE_DATA).format(
          DATEFORMATS.PROFILE_HEALTH_TEST,
        ),
      },
      {
        id: '3',
        title: translate('healthTest.results'),
        value: test_result,
      },
      {
        id: '4',
        title: translate('healthTest.how'),
        value: test_performed,
      },
    ];
    return healthDetails.map(({title, id, value}) => (
      <View key={id}>
        <CLabel style={Style.inputLabel} text={title} />
        <CLabel
          style={this.checkPositiveStatus(id, value)}
          text={value}
          accessibilityLabel={title}
          testID={title}
        />
      </View>
    ));
  }
  setImageLoader = (state) => {
    this.setState({loading: state});
  };

  checkPositiveStatus = (id, status) => {
    if (id !== '3') {
      return Style.healthTestDetailText;
    }
    if (status?.search('Positive') && status?.search('positive') === -1) {
      return [Style.healthTestDetailText, Style.nagtiveHealhTestResultColor];
    }
    return [Style.healthTestDetailText, Style.positiveHealhTestResultColor];
  };
  removeHealthTest = () => {
    const {route = '', userLocation = '', associatedCompany = ''} = this.props;
    const screenName = route?.name;
    setUserAnalyticsProperties({
      userLocation,
      screenName,
      associatedCompany,
    });
    logAnalyticsEvent(analyticsIds.healthResultsScreen_delete_health_test, {
      userLocation,
      screenName,
      associatedCompany,
    });
    this.setState({
      removeHealthTestModalVisible: !this.state.removeHealthTestModalVisible,
    });
  };

  editTest = () => {
    const {healthTestDetails, editTest} = this.props;
    editTest(healthTestDetails);
  };
  render() {
    const {
      healthTestDetails: {document_url},
      healthTestDetails,
      route: {params: id} = {},
      healthTestDelete,
      loading,
    } = this.props;
    return (
      <View style={Style.container}>
        <COverlay
          instance={this}
          source={'HealthResults'}
          instanceState={this.state}
          props={this.props}
        />
        <KeyboardAvoidingView
          style={Style.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Style.keyboardVerticalOffset.top}>
          <ScrollView
            bounces={false}
            ref={this.scrollView}
            alwaysBounceVertical={false}
            contentContainerStyle={Style.contentContainerStyle}
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}>
            <HealthDetailsComponent
              source={screenSource.HEALTH_RESULTS}
              healthTestDetails={healthTestDetails}
              document_url={document_url}
              setImageLoader={this.setImageLoader}
              handleModal={this.handleModal}
              zoom={this.state.zoom}
              loading={this.state.loading}
              editTest={() => DetailsMethod.editTest(healthTestDetails)}
              removeHealthTest={this.removeHealthTest}
              editRejectedTest={() =>
                DetailsMethod.uploadHealthTest(healthTestDetails)
              }
            />
          </ScrollView>
        </KeyboardAvoidingView>
        {this.state.removeHealthTestModalVisible && (
          <HealthTestRemovePopup
            id={id}
            toggleRemoveModal={this.removeHealthTest}
            healthTestDelete={healthTestDelete}
          />
        )}
        <CLoader loading={loading} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    healthTestResults: {healthTestDetails, loading},
    signIn: {token, userID},
    userProfile: {uploadingHealhtTestImage},
  } = state;
  return {
    healthTestDetails,
    loading,
    token,
    uploadingHealhtTestImage,
    userID,
  };
};
const mapDispatchToProps = {
  getHealthTestDetails: healthTestDetailsAction,
  updateHealthTestID: updateHealthTestIDAction,
  editHealthData: editHealthTestAction,
  healthTestDelete: healthTestDeleteAction,
  approveHealthTest: approveHealthTestAction,
  uploadImageS3: editRejectedHealTestImageAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(connectActionSheet(HealthDetails));
