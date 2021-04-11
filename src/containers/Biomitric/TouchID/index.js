import React, {PureComponent} from 'react';
import {Text, View, Image} from 'react-native';
import {connect} from 'react-redux';
import Style from './style/style';
import CLabel from '../../../components/cLabel';
import {Constants, HelperFunctions} from '../../../utilities';
import {translate} from '../../../Localization';

import CButton from '../../../components/cButton';
import {ifKeyAlreadyExists, createBiometricId, deleteKeys} from '../Biometrics';
import {sendPublicKeyAction} from '../redux/actions';
import AsyncStorage, {AsyncConstants} from '../../../utilities/AsyncStorage';
import {StoreToken} from '../../onBoarding/SignIn/redux/actions';
import {profileVisitedBeforeAction} from '../../dashBoard/Home/redux/actions';
import ModalsQueue from '../../../services/ModalsQueue';
import {logAnalyticsEvent} from '../../../utilities/Firebase';
const {LOCAL_PATH, modalIds, analyticsIds} = Constants;
const {showErrorMessage} = HelperFunctions;

class TouchID extends PureComponent {
  componentDidMount() {
    if (this.props.access_token) {
    }
    this.navigationOptions();
  }

  navigationOptions = () => {
    this.props.navigation.setOptions({
      title: '',
      headerTransparent: true,
      headerLeft: null,
    });
  };

  onSkipPress = () => {
    this.props.storeToken(this.props.access_token, this.props.id, null, true);
    AsyncStorage.removeItemFromStorage('PROFILEVISITED');
    ModalsQueue.showModal({
      modalId: modalIds.walkThrough,
      showModalFunction: () => this.props.profileVisitedBeforeAction(false),
    });
    logAnalyticsEvent(analyticsIds.onboard_touchId_skipped);
  };
  onSignTouch = async () => {
    const {access_token, sendPublicKey, id, email} = this.props;
    try {
      let publicKeyExist = await ifKeyAlreadyExists();
      if (publicKeyExist) {
        await deleteKeys();
      }
      let publicKey = await createBiometricId();
      if (publicKey) {
        let formatPublicKey = `-----BEGIN PUBLIC KEY-----\n${publicKey}\n-----END PUBLIC KEY-----`;
        await AsyncStorage.setItemInStorage(
          AsyncConstants.USER_EMAIL,
          email.toLowerCase(),
        );
        await AsyncStorage.setItemInStorage(
          AsyncConstants.BIOMETRIC_ENABLED,
          true,
        );
        await AsyncStorage.setItemInStorage(
          AsyncConstants.PUBLIC_KEY,
          formatPublicKey,
        );
        const firstVisit = true;
        sendPublicKey({
          token: access_token,
          publicKey: formatPublicKey,
          userID: id,
          firstVisit,
        });
      }
      logAnalyticsEvent(analyticsIds.onboard_touchId_added);
    } catch (error) {
      showErrorMessage(translate('STRINGS.SOMETHING_WENT_WRONG'));
    }
  };
  render() {
    return (
      <View style={Style.container}>
        <View style={Style.innerContainer}>
          <View style={Style.info}>
            <CLabel
              style={Style.pageTitle}
              text={translate('biomitrics.touchID')}
            />
            <CLabel
              style={Style.pageSubTitle}
              text={translate('biomitrics.useTouchMsg')}
            />
            <Image source={LOCAL_PATH.TOUCH_ID} style={Style.image} />
          </View>

          <View style={Style.footerContainer}>
            <CButton
              text={translate('biomitrics.useTouch')}
              textStyle={Style.whiteText}
              onPress={this.onSignTouch}
              buttonContainerStyle={Style.blackButton}
            />
            <Text style={Style.skipForNow} onPress={this.onSkipPress}>
              {translate('biomitrics.skip')}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({
  personalDetails: {access_token, id, details},
  biometric: {pubKeySuccess},
  updateContactDetailsReducer: {email},
  signIn,
  contactDetails,
  userProfile,
}) => {
  return {
    access_token,
    id,
    pubKeySuccess,
    details,
    signIn,
    contactDetails,
    userProfile,
    email,
  };
};
const mapDispatchToProps = {
  sendPublicKey: sendPublicKeyAction,
  storeToken: StoreToken,
  profileVisitedBeforeAction: profileVisitedBeforeAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(TouchID);
