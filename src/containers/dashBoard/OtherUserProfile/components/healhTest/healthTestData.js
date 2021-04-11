import React from 'react';
import {View, KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import {connect} from 'react-redux';
import Style from './style';
import {Constants} from '../../../../../utilities';
import HealthDetailsComponent from '../../../HealthTests/Details/detailsComponent';
import {approveHealthTestAction} from '../../redux/actions';
import CLoader from '../../../../../components/cLoader';
import COverlay from '../../../../../components/cRejectionPopUp';

const {screenSource} = Constants;
class OtherUserHealthDetails extends React.Component {
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
      testData: {},
      popUpType: 1,
    };
  }
  handleModal = () => {
    this.setState({
      zoom: !this.state.zoom,
    });
  };
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
    this.setState({
      removeHealthTestModalVisible: !this.state.removeHealthTestModalVisible,
    });
  };

  togglePopUp = (popUpType) => {
    this.setState({showModal: !this.state.showModal, popUpType});
  };
  render() {
    const {
      route: {
        params: {latest_health_test_results},
        params: {
          latest_health_test_results: {document_url, is_verified},
        },
      },
      loading,
    } = this.props;
    return (
      <View style={Style.container}>
        <COverlay
          instance={this}
          source={screenSource.OTHER_USER_PROFILE}
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
              source={screenSource.OTHER_USER_PROFILE}
              healthTestDetails={latest_health_test_results}
              document_url={document_url}
              is_verified={is_verified}
              setImageLoader={this.setImageLoader}
              handleModal={this.handleModal}
              zoom={this.state.zoom}
              loading={this.state.loading}
              editTest={() => this.togglePopUp(1)}
              removeHealthTest={() => {
                this.togglePopUp(2);
              }}
            />
          </ScrollView>
        </KeyboardAvoidingView>

        <CLoader loading={loading} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    healthTestResults: {healthTestDetails},
    otherUserProfile: {loading},
    signIn: {token},
    userProfile: {
      associatedCompany,
      userInfo: {userLocation},
    },
  } = state;
  return {
    healthTestDetails,
    loading,
    token,
    associatedCompany,
    userLocation,
  };
};
const mapDispatchToProps = {
  approveHealthTest: approveHealthTestAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OtherUserHealthDetails);
