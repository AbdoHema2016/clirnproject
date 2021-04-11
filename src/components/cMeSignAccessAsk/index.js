import React, {Component} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import CButton from '../../components/cButton';
import Style from './style';
import {Constants, Layout} from '../../utilities';

import {translate} from '../../Localization';

import ModalsQueue from '../../services/ModalsQueue';

const {modalIds} = Constants;
const {HEX_COLOR_CODES} = Layout;

class MeSignAccessAsk extends Component {
  hide = () => {
    const {hide} = this.props;

    ModalsQueue.hideModal({
      modalId: modalIds.meAccessAsk,
      hideModalFunction: () => hide(),
    });
  };

  onAccept = () => {
    const {accessGrantId} = this.props;

    this.hide();
  };

  onDeny = () => {
    const {accessGrantId} = this.props;

    this.hide();
  };

  getTitle = () => {
    const {name} = this.props;

    return (
      <Text style={Style.text}>
        <Text style={Style.askingUserName}>{name}</Text>
        {translate('meAccessAsk.title')}
      </Text>
    );
  };

  getDescription = () => {
    const {name} = this.props;

    return (
      <Text style={Style.text}>
        {translate('meAccessAsk.bodyBeforeName')}
        <Text style={Style.askingUserName}>{name}</Text>
        {translate('meAccessAsk.bodyAfterName')}
      </Text>
    );
  };

  render() {
    const {show, name} = this.props;

    if (!show) {
      return null;
    }

    return (
      <View style={Style.container}>
        <View style={Style.modalView}>
          {name ? (
            <>
              {this.getTitle()}
              <Text style={Style.description}>{this.getDescription()}</Text>
              <View style={Style.buttonContainer}>
                <CButton
                  text={translate('STRINGS.REJECT')}
                  onPress={this.onDeny}
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
            </>
          ) : (
            <View style={Style.loaderContainer}>
              <ActivityIndicator
                style={Style.loader}
                size={'large'}
                color={HEX_COLOR_CODES.GREEN_2}
              />
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default MeSignAccessAsk;
