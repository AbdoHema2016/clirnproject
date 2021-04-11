import React, {Component} from 'react';
import {View, Text, Linking} from 'react-native';
import CButton from '../../components/cButton';
import CButtonWithImage from '../../components/cButtonWithImage';
import Style from './style';
import {Constants} from '../../utilities';
import {translate} from '../../Localization';

import ModalsQueue from '../../services/ModalsQueue';

const {modalIds, LOCAL_PATH, URLS} = Constants;

class ContactDataSharingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      companyName: '',
      qrToken: null,
      companyId: null,
      hasEntered: false,
      associatedCompany: '',
    };
  }

  show = ({
    companyName,
    qrToken,
    companyId,
    hasEntered,
    associatedCompany,
    companyLocation,
  }) =>
    this.setState({
      modalVisible: true,
      companyName,
      qrToken,
      companyId,
      hasEntered,
      associatedCompany,
      companyLocation,
    });

  hide = () => {
    ModalsQueue.hideModal({
      modalId: modalIds.vanueScan,
      hideModalFunction: () =>
        this.setState({
          modalVisible: false,
          companyName: '',
          qrToken: null,
          companyId: null,
          companyLocation: null,
        }),
    });
  };

  onAccept = () => {
    const {qrToken, companyId, hasEntered} = this.state;
    this.hide();
    this.props.onAccept({qrToken, companyId, hasEntered});
  };

  getTitle = () => {
    const {companyName, hasEntered, companyLocation} = this.state;
    if (hasEntered) {
      return (
        <Text style={Style.text}>
          {translate('sharingData.leaving.titleType')}
          <Text style={Style.companyName}>
            {companyLocation || companyName}
          </Text>
          ?
        </Text>
      );
    }
    return (
      <Text style={Style.text}>
        {translate('sharingData.entering.enteringAssociatedCompanyTitle')}
        <Text style={Style.companyName}>{companyLocation || companyName}</Text>.
      </Text>
    );
  };

  getDescription = () => {
    const {
      companyName,
      hasEntered,
      associatedCompany,
      companyLocation,
    } = this.state;
    if (hasEntered) {
      return `${companyName} ${translate('sharingData.leaving.body')}`;
    }
    if (associatedCompany === companyName) {
      return translate('sharingData.entering.enteringAssociatedCompanyBody');
    }
    return (
      <Text style={Style.confirmMsg}>
        {translate('sharingData.entering.textBeforeCompanyName')}
        <Text style={Style.companyNameInBody}>
          {companyLocation || companyName}
        </Text>
        <Text style={Style.body}>
          {translate('sharingData.entering.textAfterCompanyName')}
        </Text>
      </Text>
    );
  };

  render() {
    const {
      modalVisible,
      associatedCompany,
      hasEntered,
      companyName,
    } = this.state;

    if (!modalVisible) {
      return null;
    }
    return (
      <View style={Style.container}>
        <View style={Style.modalView}>
          <CButtonWithImage
            imagePath={LOCAL_PATH.CROSS_ICON}
            customeImageStyle={Style.closeImage}
            buttonContainerStyle={Style.closeBtnContainer}
            buttonCustomStyle={Style.closeBtn}
            onPress={this.hide}
          />
          {this.getTitle()}
          <Text style={Style.description}>{this.getDescription()}</Text>
          {!hasEntered && associatedCompany !== companyName && (
            <Text
              style={Style.privacyLink}
              onPress={() => Linking.openURL(URLS.PRIVACY_POLICY_URL)}>
              {translate('SETTINGS.PRIVACY_POLICY')}
            </Text>
          )}
          <View style={Style.buttonContainer}>
            <CButton
              text={translate('STRINGS.REJECT')}
              onPress={this.hide}
              textStyle={Style.buttonText}
              buttonContainerStyle={Style.rejectButton}
              buttonCustomStyle={Style.buttonCustomStyle}
            />

            <CButton
              text={translate('STRINGS.ACCEPT')}
              textStyle={Style.buttonText}
              onPress={this.onAccept}
              buttonContainerStyle={Style.acceptButton}
              buttonCustomStyle={Style.buttonCustomStyle}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default ContactDataSharingModal;
