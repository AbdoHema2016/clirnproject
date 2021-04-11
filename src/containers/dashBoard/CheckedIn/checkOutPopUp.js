import React, {PureComponent} from 'react';
import {View, Modal, Text} from 'react-native';
import {Style} from './checkOutPopUpStyle';
import {translate} from '../../../Localization';

import Button from '../../../components/cButton';
import {connect} from 'react-redux';
import ModalsQueue from '../../../services/ModalsQueue';
import {Constants} from '../../../utilities';
import CButtonWithImage from '../../../components/cButtonWithImage';
import {manualCheckout} from './redux/action';
const {profileModals, LOCAL_PATH} = Constants;

class CheckedInInfo extends PureComponent {
  close = () => {
    const {showCheckOutPopup} = this.props;
    ModalsQueue.hideModal({
      modalId: profileModals.checkOutInfoPopUp,
      hideModalFunction: () => showCheckOutPopup(false),
    });
  };
  checkOut = (doYouWantTocheckOut) => {
    const {showCheckOutPopup, checkOut, visitorId} = this.props;
    if (doYouWantTocheckOut) {
      checkOut({
        visitorId,
      });
    }
    ModalsQueue.hideModal({
      modalId: profileModals.checkOutInfoPopUp,
      hideModalFunction: () => showCheckOutPopup(false),
    });
  };
  render() {
    const {checked_in, isCheckOutPopupVisible} = this.props;
    return (
      <Modal
        visible={isCheckOutPopupVisible}
        style={Style.modal}
        animationType="fade"
        transparent={true}>
        <View style={Style.modalContainer}>
          {checkOutAlert(checked_in, this.checkOut)}
        </View>
      </Modal>
    );
  }
}

export const checkOutAlert = (checked_in, checkOut) => {
  return (
    <View style={Style.popup}>
      <CButtonWithImage
        buttonContainerStyle={Style.crossButtonContainer}
        buttonCustomStyle={Style.crsossButton}
        textStyle={Style.textStyle}
        customeImageStyle={Style.customeImageStyle}
        imagePath={LOCAL_PATH.CROSS_ICON}
        onPress={() => checkOut(false)}
      />
      <Text style={Style.checkoutText}>
        {translate('CHECK_OUT_POPUP.CHECKOUT')}
      </Text>
      <Text style={Style.subText}>
        {translate('CHECK_OUT_POPUP.SUB_TITLE')}
        <Text style={Style.companyName}>
          {checked_in?.company?.location_name || checked_in?.company?.company}
        </Text>
        <Text>{translate('CHECK_OUT_POPUP.QUESTION')}</Text>
      </Text>
      <View style={Style.alertButtonsView}>
        <Button
          text={translate('CHECK_OUT_POPUP.NO')}
          textStyle={Style.no}
          buttonContainerStyle={Style.noButton}
          buttonCustomStyle={Style.buttonCustomStyle}
          onPress={() => checkOut(false)}
        />
        <Button
          text={translate('CHECK_OUT_POPUP.YES_CHECKOUT')}
          textStyle={Style.checkOutButtonText}
          buttonContainerStyle={Style.checkoutButton}
          buttonCustomStyle={Style.alertButtonCustomStyle}
          onPress={() => checkOut(true)}
        />
      </View>
    </View>
  );
};
const mapStateToProps = (state) => {
  const {
    userProfile: {checked_in},
  } = state;
  return {
    checked_in,
  };
};
const mapDispatchToProps = {
  checkOut: manualCheckout,
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckedInInfo);
