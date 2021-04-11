import React from 'react';
import {View, Text} from 'react-native';
import Style from './style';
import CButtonWithImage from '../../components/cButtonWithImage';
import CButton from '../../components/cButton';
import {Constants} from '../../utilities';
import {
  HealthtestMethodsObj,
  SharingMethodsObj,
} from '../dashBoard/Home/Methods';
import ModalsQueue from '../../services/ModalsQueue';
import CImage from '../../components/cImage';
import CLabel from '../../components/cLabel';
import UserQR from '../dashBoard/Home/userQR/UserQR';
import {translate} from '../../Localization';

const {LOCAL_PATH, profileModals, shareOption} = Constants;
class JumioSuccessPopup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showUserQR: false,
    };
  }
  closemodal = () => {
    ModalsQueue.hideModal({
      modalId: profileModals.JumioSuccess,
      hideModalFunction: () =>
        HealthtestMethodsObj.showModal(profileModals.closeModal),
    });
  };

  showHideTglMeCode = () => {
    this.closemodal();
    SharingMethodsObj.onShareProfile(shareOption.MEQR);
  };

  render() {
    const {} = this.props;
    return (
      <View style={Style.container}>
        <CButtonWithImage
          imagePath={LOCAL_PATH.CROSS_ICON}
          customeImageStyle={Style.closeImage}
          buttonContainerStyle={Style.closeBtnContainer}
          buttonCustomStyle={Style.closeBtn}
          onPress={this.closemodal}
        />
        <CImage
          resizeMode={'contain'}
          imagePath={LOCAL_PATH.JUMIO_SUCCESS}
          imageStyle={Style.popupIcon}
        />
        <CLabel
          style={Style.popupTitle}
          text={translate('JUMIO_POPUP.SUCCESS_TITLE')}
        />
        <Text style={Style.popupBody}>
          {translate('JUMIO_POPUP.SUCCESS_BODY')}
          <Text style={Style.meTxt}>{translate('JUMIO_POPUP.ME')}</Text>
          {translate('JUMIO_POPUP.SYMBOL')}
        </Text>
        <CButton
          buttonContainerStyle={Style.cButtonContainerStyle}
          onPress={this.showHideTglMeCode}
          text={translate('JUMIO_POPUP.SUCCESS_BTN_TXT')}
          textStyle={Style.btnTxt}
        />
        {this.state.showUserQR && <UserQR onPress={this.showHideTglMeCode} />}
      </View>
    );
  }
}
export default JumioSuccessPopup;
