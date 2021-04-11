import React from 'react';
import {View, Text} from 'react-native';
import Style from './style';
import CButtonWithImage from '../../../components/cButtonWithImage';
import CButton from '../../../components/cButton';
import {Constants} from '../../../utilities';
import {translate} from '../../../Localization';

import CImage from '../../../components/cImage';
import CLabel from '../../../components/cLabel';
import {HealthtestMethodsObj} from '../../../containers/dashBoard/Home/Methods';
import ModalsQueue from '../../../services/ModalsQueue';
const {LOCAL_PATH, profileModals} = Constants;
class VerificationPermissionUpdate extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  closemodal = () => {
    const {instance} = this.props;
    ModalsQueue.hideModal({
      modalId: profileModals.verificationPermissionUpdate,

      hideModalFunction: () => {
        HealthtestMethodsObj.showModal(profileModals.closeModal);
        instance.setState({showModal: false});
      },
    });
  };
  render() {
    const {permissionProvidingCompany} = this.props;

    return (
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
            imagePath={LOCAL_PATH.permissionUpdate}
            imageStyle={Style.popupIcon}
          />
          <CLabel
            style={Style.popupTitle}
            text={translate('EMPLOYER_PERMISSIONS.VERIFICATION_POPUP_TITLE')}
          />

          <Text style={Style.msgContainer}>
            <Text style={Style.popupBody}>
              {translate('EMPLOYER_PERMISSIONS.YOUR_ADMINISTRATOR')}
            </Text>
            <Text style={Style.companyName}>{permissionProvidingCompany}</Text>
            <Text style={Style.popupBody}>
              {translate('EMPLOYER_PERMISSIONS.MODIFIED_PERMISSIONS')}
            </Text>
          </Text>

          <View style={Style.permissionsContainer}>
            <CLabel
              style={Style.subBody}
              text={translate('EMPLOYER_PERMISSIONS.YOU_CAN')}
            />
            <CLabel
              style={Style.addedPermission}
              text={translate('EMPLOYER_PERMISSIONS.APPROVE_MEDICAL_DATA')}
            />
          </View>

          <CButton
            buttonContainerStyle={Style.goToVaccineDetails}
            onPress={this.closemodal}
            text={translate('EMPLOYER_PERMISSIONS.OK_MSG')}
            textStyle={Style.btnTxt}
          />
        </View>
      </View>
    );
  }
}
export default VerificationPermissionUpdate;
