import React from 'react';
import {View, Text} from 'react-native';
import Style from './style';
import {connect} from 'react-redux';
import CButton from '../../../../../components/cButton';
import CLabel from '../../../../../components/cLabel';

import CButtonWithImage from '../../../../../components/cButtonWithImage';
import {Constants} from '../../../../../utilities';
import {translate} from '../../../../../Localization';

import {HealthtestMethodsObj} from '../../Methods';
import ModalsQueue from '../../../../../services/ModalsQueue';
import CImage from '../../../../../components/cImage';
const {LOCAL_PATH, profileModals} = Constants;
import {navigate} from '../../../../../Navigation/NavigationService';
class TestReviewPopup extends React.PureComponent {
  closemodal = () => {
    const {modalIndex, instance} = this.props;
    ModalsQueue.hideModal({
      modalId: modalIndex,
      hideModalFunction: () => {
        HealthtestMethodsObj.showModal(profileModals.closeModal);
        instance.setState({showModal: false});
      },
    });
  };

  openTestDetails = () => {
    const {verifiedTestId, modalIndex} = this.props;
    this.closemodal();
    if (modalIndex === profileModals.healthTestApproved) {
      navigate('HealthDetails', {id: verifiedTestId});
      return;
    }
    if (modalIndex === profileModals.vaccineApproved) {
      navigate('VaccineDetails', {id: verifiedTestId});
      return;
    }
  };
  render() {
    const {modalIndex} = this.props;
    return (
      <View style={Style.reviewPopupContainer}>
        <CButtonWithImage
          imagePath={LOCAL_PATH.CROSS_ICON}
          customeImageStyle={Style.closeImage}
          buttonContainerStyle={Style.closeBtnContainer}
          buttonCustomStyle={Style.closeBtn}
          onPress={this.closemodal}
        />
        <CImage
          imagePath={LOCAL_PATH.testVerified}
          imageStyle={Style.testVerifiedImg}
        />
        <CLabel
          text={translate('NOTIFICATION_SCREEN.TEST_VERIFY_COMPLETE')}
          style={Style.verifyTitleTxt}
        />
        <Text style={Style.verifyBodyContainerTxt}>
          <Text style={Style.verifyBodyTxt}>
            {translate('NOTIFICATION_SCREEN.YOUR')}
          </Text>
          <Text style={Style.verifyBodyTestTxt}>
            {modalIndex === profileModals.healthTestApproved
              ? translate('NOTIFICATION_SCREEN.VERIFIED_HEALTH_TEST')
              : translate('NOTIFICATION_SCREEN.VERIFIED_VACCINE')}
          </Text>
          <Text style={Style.verifyBodyTxt}>
            {translate('NOTIFICATION_SCREEN.DATA_VERIFIED_SEUCCESS')}
          </Text>
        </Text>
        <CButton
          buttonContainerStyle={Style.seeDetailsBtn}
          textStyle={Style.seeDetailsBtnTxt}
          text={translate('NOTIFICATION_SCREEN.SEE_DETAILS')}
          onPress={this.openTestDetails}
        />
      </View>
    );
  }
}

const mapStateToProps = ({
  userProfile: {modalIndex, verifiedTestId, testApproved},
}) => ({
  modalIndex,
  verifiedTestId,
  testApproved,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TestReviewPopup);
