import React from 'react';
import {View, Text, Modal} from 'react-native';
import Style from './style';
import CButton from '../../../../components/cButton';
import {Constants, testIds} from '../../../../utilities';
import {translate} from '../../../../Localization';

import {HealthtestMethodsObj} from '../../Home/Methods';
import ModalsQueue from '../../../../services/ModalsQueue';
import CLabel from '../../../../components/cLabel';

const {profileModals} = Constants;
class VaccineRemovePopup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  closemodal = () => {
    ModalsQueue.hideModal({
      modalId: profileModals.removeVaccine,
      hideModalFunction: () =>
        HealthtestMethodsObj.toggleRemoveVaccine(profileModals.closeModal),
    });
  };

  removeVaccine = () => {
    const {vaccineId, deleteVaccine, toggleRemoveVaccine, goBack} = this.props;
    deleteVaccine({
      vaccineId,
      cb: () => {
        goBack();
      },
    });
    toggleRemoveVaccine();
  };
  render() {
    const {vaccineName, toggleRemoveVaccine} = this.props;
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
              text={translate('VACCINE_SCREEN.POPUP_TITLE')}
            />
            <Text style={Style.popupBody}>
              {translate('VACCINE_SCREEN.BODY')}
              <Text style={Style.vaccineTxt}>{vaccineName}</Text>
              {translate('VACCINE_SCREEN.RESULTS')}
            </Text>
            <View style={Style.descision}>
              <CButton
                buttonContainerStyle={Style.cancelBtnContainer}
                buttonCustomStyle={Style.buttonStyle}
                onPress={() => toggleRemoveVaccine(true)}
                text={translate('VACCINE_SCREEN.CANCEL')}
                textStyle={Style.btnTxt}
              />
              <CButton
                buttonContainerStyle={Style.removeBtnContainer}
                buttonCustomStyle={Style.buttonStyle}
                onPress={this.removeVaccine}
                text={translate('VACCINE_SCREEN.REMOVE')}
                textStyle={Style.removeBtnTxt}
                accessibilityLabel={testIds.confirmDeleteVaccine}
                testID={testIds.confirmDeleteVaccine}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
export default VaccineRemovePopup;
