import React, {PureComponent} from 'react';
import {View} from 'react-native';
import Style from './style';
import OTPInputView from 'react-native-otp-autodetect';

class COtpBox extends PureComponent {
  checkOTPStyle = (error) => {
    if (error) {
      return Style.errorStyle;
    }
    return Style.noErrorStyle;
  };
  render() {
    const {onChangeText, value, error, sendOTP} = this.props;
    return (
      <View style={[Style.container]}>
        <OTPInputView
          code={value}
          codeInputHighlightStyle={[Style.input, this.checkOTPStyle(error)]}
          codeInputFieldStyle={[Style.input]}
          onCodeChanged={onChangeText}
          autoFocusOnLoad
          onCodeFilled={sendOTP}
        />
      </View>
    );
  }
}

export default COtpBox;
