import React from 'react';
import {View, Modal} from 'react-native';
import Style from './style';
import CButtonWithImage from '../../../../components/cButtonWithImage';
import CButton from '../../../../components/cButton';
import {Constants} from '../../../../utilities';
import {translate} from '../../../../Localization';

import {HealthtestMethodsObj} from '../../Home/Methods';
import ModalsQueue from '../../../../services/ModalsQueue';
import CImage from '../../../../components/cImage';
import CLabel from '../../../../components/cLabel';

const {LOCAL_PATH, profileModals} = Constants;
class VaccineReminder extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  closemodal = () => {
    ModalsQueue.hideModal({
      modalId: profileModals.vaccineReminder,
      hideModalFunction: () =>
        HealthtestMethodsObj.showModal(profileModals.closeModal),
    });
  };

  goToDetails = () => {
    this.closemodal();
  };

  render() {
    const {} = this.props;
    return (
      <Modal
        visible={true}
        style={Style.modal}
        animationType="fade"
        transparent={true}>
        <View style={Style.modalContainer}>
          <View style={Style.remiderPopupContainer}>
            <CButtonWithImage
              imagePath={LOCAL_PATH.CROSS_ICON}
              customeImageStyle={Style.closeImage}
              buttonContainerStyle={Style.closeBtnContainer}
              buttonCustomStyle={Style.closeBtn}
              onPress={this.closemodal}
            />
            <CImage
              resizeMode={'contain'}
              imagePath={LOCAL_PATH.vaccineReminder}
              imageStyle={Style.popupIcon}
            />
            <CLabel
              style={Style.popupTitle}
              text={translate('VACCINE_SCREEN.VACCINE_REMINDER_TITLE')}
            />
            <CLabel
              style={Style.popupBody}
              text={translate('VACCINE_SCREEN.VACCINE_REMINDER_BODY')}
            />

            <CButton
              buttonContainerStyle={Style.goToVaccineDetails}
              onPress={this.goToDetails}
              text={translate('VACCINE_SCREEN.GO_TO_VACCINE_DETAILS')}
              textStyle={Style.btnTxt}
            />
          </View>
        </View>
      </Modal>
    );
  }
}
export default VaccineReminder;
