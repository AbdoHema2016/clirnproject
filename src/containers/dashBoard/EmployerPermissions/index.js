import React from 'react';
import {View, Text, Linking} from 'react-native';
import Style from './style';
import CButtonWithImage from '../../../components/cButtonWithImage';
import CButton from '../../../components/cButton';
import {Constants} from '../../../utilities';
import {translate} from '../../../Localization';

import CImage from '../../../components/cImage';
import CLabel from '../../../components/cLabel';
import {HealthtestMethodsObj} from '../../../containers/dashBoard/Home/Methods';
import ModalsQueue from '../../../services/ModalsQueue';
import NavigationService from '../../../Navigation/NavigationService';
const {LOCAL_PATH, profileModals, URLS} = Constants;
class PermmissionUpdate extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  closemodal = () => {
    ModalsQueue.hideModal({
      modalId: profileModals.permissionUpdate,

      hideModalFunction: () =>
        HealthtestMethodsObj.showModal(profileModals.closeModal),
    });
  };
  showPermissions = () => {
    const {permissionRemoved, permissionAdded} = this.props;
    if (permissionAdded && permissionRemoved) {
      return (
        <>
          <View style={Style.permissionsContainer}>
            <CLabel
              style={Style.subBody}
              text={translate('EMPLOYER_PERMISSIONS.YOU_CAN')}
            />
            <CLabel style={Style.addedPermission} text={permissionAdded} />
          </View>
          <View style={Style.permissionsContainer}>
            <CLabel
              style={Style.subBody}
              text={translate('EMPLOYER_PERMISSIONS.YOU_CAN_NOT')}
            />
            <CLabel style={Style.removedPermission} text={permissionRemoved} />
          </View>
        </>
      );
    }
    if (permissionAdded && !permissionRemoved) {
      return (
        <View style={Style.permissionsContainer}>
          <CLabel
            style={Style.subBody}
            text={translate('EMPLOYER_PERMISSIONS.YOU_CAN')}
          />
          <CLabel style={Style.addedPermission} text={permissionAdded} />
        </View>
      );
    }
    if (permissionRemoved && !permissionAdded) {
      return (
        <View style={Style.permissionsContainer}>
          <CLabel
            style={Style.subBody}
            text={translate('EMPLOYER_PERMISSIONS.YOU_CAN_NOT')}
          />
          <CLabel style={Style.removedPermission} text={permissionRemoved} />
        </View>
      );
    }
    return null;
  };
  openUrl = () => {
    this.closemodal();
    NavigationService.navigation.navigate('Profile');
    Linking.openURL(URLS.TESTED_ME_SUPPORT);
  };
  render() {
    const {permissionRemoved, permissionAdded} = this.props;
    const removedAll = permissionRemoved && !permissionAdded;

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
            imagePath={
              removedAll
                ? LOCAL_PATH.permissionsRemoved
                : LOCAL_PATH.permissionUpdate
            }
            imageStyle={Style.popupIcon}
          />
          <CLabel
            style={Style.popupTitle}
            text={translate('EMPLOYER_PERMISSIONS.TITLE')}
          />
          {removedAll ? (
            <Text style={Style.RemoveContainer}>
              <Text style={Style.popupBody}>
                {translate('EMPLOYER_PERMISSIONS.REMOVE_PERMISSION_BODY_BEGIN')}
              </Text>
              <Text style={Style.link} onPress={this.openUrl}>
                {translate('EMPLOYER_PERMISSIONS.CONTACTUS')}
              </Text>
              <Text style={Style.popupBody}>
                {translate('EMPLOYER_PERMISSIONS.REMOVE_PERMISSION_BODY_END')}
              </Text>
            </Text>
          ) : (
            <CLabel
              style={Style.popupBody}
              text={translate('EMPLOYER_PERMISSIONS.UPDATE_PERMISSION_BODY')}
            />
          )}
          {!removedAll && this.showPermissions()}

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
export default PermmissionUpdate;
