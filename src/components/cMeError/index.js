import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, Image, Linking} from 'react-native';
import {Constants} from '../../utilities';
import {translate} from '../../Localization';

import Style from './style';

const {LOCAL_PATH, apiError, URLS} = Constants;
export default class ErrorView extends PureComponent {
  errorMsg = () => {
    const {error} = this.props;
    if (error?.status === apiError.forbidden) {
      return (
        <>
          <Text style={Style.oops}>
            {translate('STRINGS.ERROR_READING_QR_OOPS')}
          </Text>
          <Text style={Style.msgContainer}>
            <Text style={Style.errTxt}>
              {translate('STRINGS.QR_READ_REJECTION_BEGIN')}
            </Text>
            <Text style={Style.MeTxt}>{translate('STRINGS.ME')}</Text>
            <Text style={Style.errTxt}>
              {translate('STRINGS.QR_READ_REJECTION_END')}
            </Text>
          </Text>
        </>
      );
    }
    if (error?.status === apiError.serverIssue) {
      return (
        <>
          <Text style={Style.oops}>
            {translate('STRINGS.ERROR_READING_QR_OOPS')}
          </Text>
          <Text style={Style.msgContainer}>
            <Text style={Style.errTxt}>
              {translate('STRINGS.CONNECTION_ERROR_READING_QR')}
            </Text>
          </Text>
        </>
      );
    }
    return (
      <>
        <Text style={Style.oops}>
          {translate('STRINGS.ERROR_READING_QR_OOPS')}
        </Text>
        <Text style={Style.msgContainer}>
          <Text style={Style.errTxt}>
            {translate('STRINGS.ERROR_READING_QR_BEGIN')}
          </Text>
          <Text style={Style.MeTxt}>{translate('STRINGS.ME')}</Text>
          <Text style={Style.errTxt}>
            {translate('STRINGS.ERROR_READING_QR_END')}
          </Text>
          <Text
            onPress={() => Linking.openURL(URLS.TESTED_ME_SUPPORT)}
            style={Style.contactSupport}>
            {translate('STRINGS.CONTACT_SUPPORT')}
          </Text>
        </Text>
      </>
    );
  };
  render() {
    const {onClose, style, onTryAgain} = this.props;

    return (
      <View style={[style, Style.errContainer]}>
        <View style={Style.topErrContent}>
          <Image
            style={Style.errImg}
            resizeMode={'contain'}
            source={LOCAL_PATH.scanIdFail}
          />
          {this.errorMsg()}
        </View>
        <View style={Style.bottomErrContent}>
          <TouchableOpacity style={Style.tryAgainBtn} onPress={onTryAgain}>
            <Text style={Style.tryAgainTxt}>
              {translate('STRINGS.ERROR_TRY_AGAIN')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={Style.cancelBtn} onPress={onClose}>
            <Text style={Style.cancelTxt}>{translate('STRINGS.CANCEL')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
