import React, {PureComponent} from 'react';
import {View, SafeAreaView, Modal} from 'react-native';
import Style from './style';
import {Constants} from '../../utilities';
import {translate} from '../../Localization';

import CLabel from '../cLabel';
import CButton from '../cButton';
import CButtonWithImage from '../cButtonWithImage';
import {
  logAnalyticsEvent,
  setUserAnalyticsProperties,
} from '../../utilities/Firebase';
const {
  HealthTestPopupTypes,
  LOCAL_PATH,
  analyticsIds,
  screenSource,
} = Constants;

class COverlay extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showPicker: false,
      reasonIndex: 0,
      reason: translate('healthTest.scanIllegible'),
    };
  }
  closePopUp = () => {
    const {instance} = this.props;
    instance.setState({showModal: false});
  };
  approveTest = (status, reason) => {
    const {
      props: {
        approveHealthTest,
        userLocation = '',
        associatedCompany = '',
        route: {params, name = ''} = '',
      },
      goBack,
      source,
      vaccineId,
      reviewVaccine,
    } = this.props;
    const screenName = name;
    setUserAnalyticsProperties({
      userLocation,
      screenName,
      associatedCompany,
    });
    if (source === screenSource.OTHER_USER_PROFILE) {
      logAnalyticsEvent(analyticsIds.approve_health_test, {
        userLocation,
        screenName,
        company: associatedCompany,
      });
      approveHealthTest({
        healthTestId: params?.latest_health_test_results?.id,
        status,
        reason,
      });
    }
    if (source === screenSource.VACCINE) {
      let data = {
        is_verified: status,
        deny_reason: reason,
      };
      reviewVaccine({
        data,
        id: vaccineId,
        cb: (apiStatus) => {
          if (apiStatus) {
            goBack();
          }
        },
      });
    }
    this.closePopUp();
  };
  selectReason = (index, reason) => {
    this.setState({
      reasonIndex: index,
      reason: reason,
    });
  };
  showPopUp = () => {
    const {instanceState, source} = this.props;
    const {reasonIndex} = this.state;
    if (
      instanceState.popUpType === HealthTestPopupTypes.approve &&
      source === screenSource.OTHER_USER_PROFILE
    ) {
      return (
        <View style={Style.approveRejectContainer}>
          <CButtonWithImage
            imagePath={LOCAL_PATH.CROSS_ICON}
            customeImageStyle={Style.closeImage}
            buttonContainerStyle={Style.closeBtnContainer}
            buttonCustomStyle={Style.closeBtn}
            onPress={this.closePopUp}
          />
          <CLabel
            style={Style.popupTitle}
            text={translate('healthTest.approveData')}
          />
          <CLabel
            style={Style.popupBody}
            text={translate('healthTest.approveQuestion')}
          />
          <View style={Style.decision}>
            <CButton
              buttonContainerStyle={Style.no}
              buttonCustomStyle={Style.buttonStyle}
              onPress={this.closePopUp}
              text={translate('healthTest.noWait')}
              textStyle={Style.btnTxt}
            />
            <CButton
              buttonContainerStyle={Style.yes}
              buttonCustomStyle={Style.buttonStyle}
              onPress={() => this.approveTest(true, '')}
              text={translate('healthTest.yesApprove')}
              textStyle={Style.btnTxt}
            />
          </View>
        </View>
      );
    }

    return (
      <View style={Style.approveRejectContainer}>
        <CButtonWithImage
          imagePath={LOCAL_PATH.CROSS_ICON}
          customeImageStyle={Style.closeImage}
          buttonContainerStyle={Style.closeBtnContainer}
          buttonCustomStyle={Style.closeBtn}
          onPress={this.closePopUp}
        />
        <CLabel
          style={Style.popupTitle}
          text={translate('healthTest.rejectData')}
        />
        <CLabel
          style={Style.popupBody}
          text={translate('healthTest.provideReason')}
        />
        <CButton
          accessibilityLabel={translate('healthTest.scanIllegible')}
          buttonContainerStyle={
            reasonIndex === 0 ? Style.selectedReason : Style.reason
          }
          onPress={() =>
            this.selectReason(0, translate('healthTest.scanIllegible'))
          }
          text={translate('healthTest.scanIllegible')}
          textStyle={Style.reasonTxt}
        />
        <CButton
          accessibilityLabel={translate('healthTest.incorrectData')}
          buttonContainerStyle={
            reasonIndex === 1 ? Style.selectedReason : Style.reason
          }
          onPress={() =>
            this.selectReason(1, translate('healthTest.incorrectData'))
          }
          text={translate('healthTest.incorrectData')}
          textStyle={Style.reasonTxt}
        />
        <CButton
          accessibilityLabel={translate('healthTest.otherIssue')}
          buttonContainerStyle={
            reasonIndex === 2 ? Style.selectedReason : Style.reason
          }
          onPress={() =>
            this.selectReason(2, translate('healthTest.otherIssue'))
          }
          text={translate('healthTest.otherIssue')}
          textStyle={Style.reasonTxt}
        />
        <View style={Style.decision}>
          <CButton
            buttonContainerStyle={Style.no}
            buttonCustomStyle={Style.buttonStyle}
            onPress={this.closePopUp}
            text={translate('STRINGS.CANCEL')}
            textStyle={Style.btnTxt}
          />
          <CLabel
            accessibilityLabel={translate('healthTest.confirmRejection')}
            onPress={() => this.approveTest(false, this.state.reason)}
            text={translate('healthTest.confirmRejection')}
            style={Style.rejectionButtonText}
          />
        </View>
      </View>
    );
  };

  render() {
    const {instanceState, hideModal} = this.props;
    return (
      <SafeAreaView>
        {instanceState.showModal && (
          <View style={[Style.modalContainer]}>
            <Modal
              style={Style.modal}
              animationType="slide"
              transparent={true}
              hideModal={hideModal}
              visible={instanceState.showModal}>
              <View style={Style.dataContainer}>{this.showPopUp()}</View>
            </Modal>
          </View>
        )}
      </SafeAreaView>
    );
  }
}
export default COverlay;
