import React, {Component} from 'react';
import {View, Text} from 'react-native';
import CButton from '../../components/cButton';
import CButtonWithImage from '../../components/cButtonWithImage';
import CLabel from '../../components/cLabel';
import Style from './style';
import {Constants} from '../../utilities';
import {translate} from '../../Localization';

import ModalsQueue from '../../services/ModalsQueue';

const {modalIds, LOCAL_PATH, vaccineVerifyType} = Constants;

class VerifyVaccine extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  closemodal = () => {
    const {instance} = this.props;
    ModalsQueue.hideModal({
      modalId: modalIds.vaccineAcceptRejectPopup,
      hideModalFunction: () => {
        instance.setState({showApproveRejectModal: false});
      },
    });
  };

  getDescription = () => {
    return (
      <Text style={Style.confirmMsg}>
        {translate('VACCINE_SCREEN.VERIFY_MESSAGE')}
      </Text>
    );
  };
  checkTitle = (type) => {
    if (type === vaccineVerifyType.accept) {
      return translate('VACCINE_SCREEN.VERIFY_VACCINE');
    }
    return translate('VACCINE_SCREEN.REJECT_DATA');
  };

  checkSubTitle = (type) => {
    if (type === vaccineVerifyType.accept) {
      return translate('VACCINE_SCREEN.VERIFY_MESSAGE');
    }
    return translate('VACCINE_SCREEN.REJECT_MESSAGE');
  };
  checkAcceptButton = (type) => {
    if (type === vaccineVerifyType.accept) {
      return translate('VACCINE_SCREEN.YES_VERIFY');
    }
    return translate('VACCINE_SCREEN.YES_REJECT');
  };
  checkRejectButton = (type) => {
    if (type === vaccineVerifyType.accept) {
      return translate('VACCINE_SCREEN.NOT_VERIFY');
    }
    return translate('VACCINE_SCREEN.NO');
  };
  approveVaccine = () => {
    const {reviewVaccine, vaccineId, goBack} = this.props;
    let data = {
      is_verified: true,
    };
    reviewVaccine({
      data,
      id: vaccineId,
      cb: (status) => {
        if (status) {
          goBack();
        }
      },
    });
    this.closemodal();
  };
  render() {
    const {type} = this.props;
    return (
      <View style={Style.container}>
        <View style={Style.modalView}>
          <CButtonWithImage
            imagePath={LOCAL_PATH.CROSS_ICON}
            customeImageStyle={Style.closeImage}
            buttonContainerStyle={Style.closeBtnContainer}
            buttonCustomStyle={Style.closeBtn}
            onPress={this.closemodal}
          />
          <CLabel text={this.checkTitle(type)} style={Style.title} />
          <Text style={Style.description}>{this.checkSubTitle(type)}</Text>
          <View style={Style.buttonContainer}>
            <CButton
              text={this.checkRejectButton(type)}
              textStyle={Style.buttonText}
              buttonContainerStyle={Style.notVerifyButton}
              buttonCustomStyle={Style.buttonCustomStyle}
              onPress={this.closemodal}
            />
            <CButton
              text={this.checkAcceptButton(type)}
              textStyle={Style.buttonText}
              buttonContainerStyle={Style.acceptButton}
              buttonCustomStyle={Style.buttonCustomStyle}
              onPress={this.approveVaccine}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default VerifyVaccine;
