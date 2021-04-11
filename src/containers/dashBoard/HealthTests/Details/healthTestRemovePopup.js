import React from 'react';
import {View, Text, Modal} from 'react-native';
import Style from './style';
import CButton from '../../../../components/cButton';
import {Constants, testIds} from '../../../../utilities';
import {translate} from '../../../../Localization';

import ModalsQueue from '../../../../services/ModalsQueue';
import CLabel from '../../../../components/cLabel';
import methods from './detailsMethod';

const {profileModals} = Constants;
class HealthTestRemovePopup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  closemodal = () => {
    ModalsQueue.hideModal({
      modalId: profileModals.removeHealthTest,
      hideModalFunction: () => {},
    });
  };

  removeVaccine = () => {
    const {id, healthTestDelete, toggleRemoveModal} = this.props;

    healthTestDelete(id);
    toggleRemoveModal();
    methods.goBack();
  };
  render() {
    const {toggleRemoveModal} = this.props;
    return (
      <Modal
        visible={true}
        style={Style.modal}
        animationType="fade"
        transparent={true}>
        <View style={Style.modalContainer}>
          <View style={Style.popupContainer}>
            <CLabel
              style={Style.popupTitle}
              text={translate('healthTest.delete')}
            />

            <Text style={Style.popupBody}>
              {translate('healthTest.removeData')}
            </Text>
            <View style={Style.descision}>
              <CButton
                buttonContainerStyle={Style.cancelBtnContainer}
                buttonCustomStyle={Style.buttonStyle}
                onPress={toggleRemoveModal}
                text={translate('VACCINE_SCREEN.CANCEL')}
                textStyle={Style.btnTxt}
              />
              <CButton
                buttonContainerStyle={Style.removeBtnContainer}
                buttonCustomStyle={Style.buttonStyle}
                testID={testIds.confirmDeleteHealthTest}
                accessibilityLabel={testIds.confirmDeleteHealthTest}
                onPress={this.removeVaccine}
                text={translate('VACCINE_SCREEN.REMOVE')}
                textStyle={Style.removeBtnTxt}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
export default HealthTestRemovePopup;
