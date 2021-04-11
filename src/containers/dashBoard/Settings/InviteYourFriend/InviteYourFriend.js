import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Share,
  Platform,
  Linking,
} from 'react-native';
import {Style} from './style';
import CLabel from '../../../../components/cLabel';
import {HelperFunctions, Constants, testIds} from '../../../../utilities';
import {logAnalyticsEvent} from '../../../../utilities/Firebase';
import {translate} from '../../../../Localization';

const {LOCAL_PATH, appStoreLink, playStoreLink, analyticsIds} = Constants;
const {showErrorMessage} = HelperFunctions;

export default function InviteYourFriend() {
  const inviteOptions = [
    {
      id: 1,
      title: translate('inviteYourFriend.inviteViaSms'),
      icon: LOCAL_PATH.SMS,
      inviteMedium: '',
    },
    {
      id: 2,
      title: translate('inviteYourFriend.inviteViaOtherOption'),
      icon: LOCAL_PATH.SHARE,
      inviteMedium: '',
    },
  ];

  const inviteViaSms = async (appLink) => {
    try {
      const separator = Platform.OS === 'ios' ? '&' : '?';
      const url = `sms:${separator}body=${translate(
        'inviteYourFriend.shareYourProfileOn',
      )}\n\n${appLink}`;
      await Linking.openURL(url);
      logAnalyticsEvent(analyticsIds.share_app_sms);
    } catch (error) {
      showErrorMessage(translate('STRINGS.SOMETHING_WENT_WRONG'));
    }
  };
  const inviteViaOtherOptions = async (appLink) => {
    try {
      logAnalyticsEvent(analyticsIds.share_app_social);
      let message = translate('inviteYourFriend.shareYourProfileOn');

      if (Platform.OS === 'android') {
        message += `\n\n${appLink}`;
      }

      await Share.share({
        message,
        title: translate('inviteYourFriend.inviteAFriend'),
        url: appLink,
      });
    } catch (error) {
      showErrorMessage(translate('STRINGS.SOMETHING_WENT_WRONG'));
    }
  };

  const invite = async (optionId) => {
    const appLink = Platform.select({
      ios: appStoreLink,
      android: playStoreLink,
    });
    switch (optionId) {
      case 1:
        return inviteViaSms(appLink);
      case 2:
        return inviteViaOtherOptions(appLink);
      default:
        break;
    }
  };

  const renderInvitationOption = (option, index) => {
    const onPress = () => invite(option.id);
    return (
      <TouchableOpacity
        accessible={true}
        accessibilityLabel={testIds.inviteVia + index}
        testID={testIds.inviteVia + index}
        key={option.id}
        onPress={onPress}
        activeOpacity={0.7}
        style={Style.optionContainer}>
        <Image source={option.icon} />
        <Text style={Style.optionTitle}>{option.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={Style.container}>
      <CLabel
        style={Style.appTitle}
        text={translate('SETTINGS.INVITE_YOUR_FRIENDS')}
      />
      {inviteOptions.map(renderInvitationOption)}
    </View>
  );
}
