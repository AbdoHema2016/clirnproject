import React, {Component} from 'react';
import {View, Text} from 'react-native';
import CButton from '../../components/cButton';
import CButtonWithImage from '../../components/cButtonWithImage';
import CImage from '../../components/cImage';
import CLabel from '../../components/cLabel';
import Style from './style';
import {Constants} from '../../utilities';
import {translate} from '../../Localization';

import ModalsQueue from '../../services/ModalsQueue';
import {HealthtestMethodsObj} from '../../containers/dashBoard/Home/Methods/';

const {LOCAL_PATH, profileModals} = Constants;

class TestRejected extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  closemodal = () => {
    const {instance, props} = this.props;
    ModalsQueue.hideModal({
      modalId: props.modalIndex,
      hideModalFunction: () => {
        HealthtestMethodsObj.showModal(profileModals.closeModal);
        instance.setState({showModal: false});
      },
    });
  };
  goToDetails = () => {
    const {props} = this.props;
    this.closemodal();
    if (props.modalIndex === profileModals.vaccineRejected) {
      this.props.goToVaccineDetails();
      return;
    }
    this.props.goToHealthTestDetails();
  };

  getDescription = () => {
    const {props} = this.props;
    if (props.modalIndex === profileModals.vaccineRejected) {
      return (
        <Text style={Style.confirmMsg}>
          {translate('healthTest.incorrectDataForVaccine')}
        </Text>
      );
    }
    return (
      <Text style={Style.confirmMsg}>
        {translate('healthTest.incorrectDataForTest')}
      </Text>
    );
  };

  render() {
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
          <CImage
            imagePath={LOCAL_PATH.dataDenied}
            imageStyle={Style.denyImage}
          />
          <CLabel text={translate('STRINGS.DATA_DENIED')} style={Style.title} />
          <Text style={Style.description}>{this.getDescription()}</Text>
          <View style={Style.buttonContainer}>
            <CButton
              text={translate('STRINGS.SEE_DETAILS')}
              textStyle={Style.buttonText}
              onPress={this.goToDetails}
              buttonContainerStyle={Style.acceptButton}
              buttonCustomStyle={Style.buttonCustomStyle}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default TestRejected;
