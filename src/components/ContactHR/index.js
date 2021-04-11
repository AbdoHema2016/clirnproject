import React from 'react';
import {View} from 'react-native';
import Style from './Style';
import {connect} from 'react-redux';
import CButtonWithImage from '../cButtonWithImage';
import CLabel from '../cLabel';
import CButton from '../cButton';
import {Constants, testIds} from '../../utilities';
import {HealthtestMethodsObj} from '../../containers/dashBoard/Home/Methods';
import ModalsQueue from '../../services/ModalsQueue';
import {updateTempHistoryModalIndexAction} from '../../containers/dashBoard/Settings/temperatureResults/redux/actions';
import {translate} from '../../Localization';

const {LOCAL_PATH, profileModals} = Constants;

class ContactHR extends React.PureComponent {
  closemodal = () => {
    const {updateTempHistoryModalIndex, hideModal, source} = this.props;
    if (source === 'History') {
      updateTempHistoryModalIndex(profileModals.feelingUpdateModal);
      hideModal();
      return;
    }

    ModalsQueue.hideModal({
      modalId: profileModals.companyUpdateModal,
      hideModalFunction: () =>
        HealthtestMethodsObj.showModal(profileModals.closeModal),
    });
  };

  render() {
    return (
      <View style={Style.container}>
        <CButtonWithImage
          imagePath={LOCAL_PATH.CROSS_ICON}
          customeImageStyle={Style.closeImage}
          buttonContainerStyle={Style.closeBtnContainer}
          buttonCustomStyle={Style.closeBtn}
          onPress={this.closemodal}
        />
        <View style={Style.info}>
          <CLabel
            text={translate('HEALTH_STATUS_FOLLOW_UP.TITLE')}
            style={Style.title}
          />

          <CLabel
            text={translate('HEALTH_STATUS_FOLLOW_UP.BODY')}
            style={Style.body}
          />
        </View>
        <CButton
          buttonContainerStyle={Style.closeContainer}
          buttonCustomStyle={Style.buttonStyle}
          textStyle={Style.closeTxt}
          text={translate('HEALTH_STATUS_FOLLOW_UP.BTN_TXT')}
          onPress={this.closemodal}
          testID={testIds.closeHRPopUp}
          accessibilityLabel={testIds.closeHRPopUp}
        />
      </View>
    );
  }
}

const mapDispatchToProps = {
  updateTempHistoryModalIndex: updateTempHistoryModalIndexAction,
};

export default connect(null, mapDispatchToProps)(ContactHR);
