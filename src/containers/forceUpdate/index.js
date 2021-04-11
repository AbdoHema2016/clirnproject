import React from 'react';
import {View, Platform, Linking} from 'react-native';
import CButton from '../../components/cButton';
import CLabel from '../../components/cLabel';
import CImage from '../../components/cImage';
import {Constants} from '../../utilities';
import {translate} from '../../Localization';

import Style from './style/style';

const {LOCAL_PATH, appStoreLink, playStoreLink} = Constants;
const ForceUpdate = () => {
  return (
    <View style={Style.container}>
      <CImage
        imagePath={LOCAL_PATH.TESTED_ME_LOGO}
        imageStyle={Style.testedLogo}
      />
      <View style={Style.info}>
        <CLabel
          text={translate('FORCE_UPDATE.PLEASE_UPDATE_TITLE')}
          style={Style.updateTitle}
        />
        <CLabel
          text={translate('FORCE_UPDATE.UPDATE_DESC')}
          style={Style.updateDesc}
        />
      </View>
      <CButton
        text={translate('FORCE_UPDATE.UPDATE_BTN_TXT')}
        buttonContainerStyle={Style.updateButton}
        textStyle={Style.UPDATE_BTN_TEXT}
        onPress={goToStore}
      />
    </View>
  );
};
const goToStore = () => {
  Linking.openURL(Platform.OS === 'ios' ? appStoreLink : playStoreLink);
};

export default ForceUpdate;
