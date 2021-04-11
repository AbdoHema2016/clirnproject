import React from 'react';
import COtpBox from '../components/otpInputText';
import {Constants} from '../../../../utilities';
import {logAnalyticsEvent} from '../../../../utilities/Firebase';

const {screenSource, signUpSteps, analyticsIds} = Constants;

class OTPHelperFunctions {
  constructor() {
    this.props = null;
    this.instance = null;
    this.state = null;
  }

  set setProps(props) {
    this.props = props;
  }

  set setState(state) {
    this.state = state;
  }

  set setInstance(instance) {
    this.instance = instance;
  }

  otpFeilds = (error) => {
    const {otp} = this.instance.state;
    return (
      <COtpBox
        error={error}
        onChangeText={this.editOtp}
        value={otp}
        sendOTP={this.sendAutoFillOtp}
      />
    );
  };

  sendAutoFillOtp = (otp) => {
    const {source} = this.instance.state;
    const {access_token, token, sendOtp} = this.props;
    sendOtp(
      otp,
      this.returnOtpParam(source, token, access_token),
      this.returnOtpParam(source, signUpSteps.Profile, signUpSteps.OTP),
    );
  };

  editOtp = (otp) => this.instance.setState({otp});

  checkIfAnyOTPFieldIsEmpty = () => {
    const {otp} = this.instance.state;
    if (otp.length === 6) {
      return false;
    }
    return true;
  };

  returnOtpParam = (source, firstVal, secondVal) => {
    if (source === screenSource.EDIT_DETAILS) {
      return firstVal;
    }
    return secondVal;
  };

  sendOtp = (access_token, token, source) => {
    const {sendOtp, emptyOtp} = this.props;
    if (this.checkIfAnyOTPFieldIsEmpty()) {
      return emptyOtp('error');
    }
    const {otp} = this.instance.state;
    sendOtp(
      otp,
      this.returnOtpParam(source, token, access_token),
      this.returnOtpParam(source, signUpSteps.Profile, signUpSteps.OTP),
    );
  };

  resendOtp = () => {
    const {access_token, resendOtp, resetOtp, token} = this.props;
    logAnalyticsEvent(analyticsIds.otp_resend);
    resendOtp(
      this.instance.state === screenSource.EDIT_DETAILS ? token : access_token,
    );
    resetOtp();
    this.instance.setState(this.instance.initialState);
    this.disableResendButton();
  };

  disableResendButton = () => {
    setTimeout(() => {
      this.instance.setState({disableResendButton: false});
    }, 5000);
  };
}

const otpHelperFunctions = new OTPHelperFunctions();

export default otpHelperFunctions;
