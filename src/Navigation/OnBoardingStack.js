import React from 'react';

import SignIn from '../containers/onBoarding/SignIn/SignIn';
import Benefits from '../containers/onBoarding/Benefits/Benefits';
import PersonalDetails from '../containers/onBoarding/personalDetails/PersonalDetails';
import OTP from '../containers/onBoarding/otp/OTP';
import Feeling from '../containers/health/feeling/Feeling';
import Temperature from '../containers/health/temperature/Temperature';
import HealthTest from '../containers/health/healthTest/HealthTest';
import ForgotPassword from '../containers/onBoarding/forgotPassword/ForgotPassword';
import VerifyDocuments from '../containers/onBoarding/verifyDocuments/VerifyDocuments';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import ContactStack from './ContactDetailsStack';
import TouchID from '../containers/Biomitric/TouchID';
import FaceID from '../containers/Biomitric/FaceID';
const OnBoardingStack = createStackNavigator();

class OnBoardingNavigationStack extends React.Component {
  routeName = (step) => {
    switch (step) {
      case '3':
        return 'OTP';
      case '4':
        return 'VerifyDocuments';
      case '5':
        return 'Feeling';
      case '6':
        return 'Temperature';
      case '7':
        return 'HealthTest';
      default:
        return 'SignIn';
    }
  };

  render() {
    const {step} = this.props;
    return (
      <OnBoardingStack.Navigator initialRouteName={this.routeName(step)}>
        <OnBoardingStack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            headerShown: false,
          }}
        />

        <OnBoardingStack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            gestureEnabled: false,
          }}
        />

        <OnBoardingStack.Screen
          name="Benefits"
          component={Benefits}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />

        <OnBoardingStack.Screen
          name="PersonalDetails"
          component={PersonalDetails}
          options={{
            gestureEnabled: false,
          }}
        />

        <OnBoardingStack.Screen
          name="ContactStack"
          component={ContactStack}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />

        <OnBoardingStack.Screen
          name="OTP"
          component={OTP}
          options={{
            gestureEnabled: false,
          }}
        />

        <OnBoardingStack.Screen
          name={'VerifyDocuments'}
          component={VerifyDocuments}
          options={{
            gestureEnabled: false,
          }}
        />
        <OnBoardingStack.Screen
          name="TouchID"
          component={TouchID}
          options={{
            gestureEnabled: false,
          }}
        />
        <OnBoardingStack.Screen
          name="FaceID"
          component={FaceID}
          options={{
            gestureEnabled: false,
          }}
        />

        <OnBoardingStack.Screen
          name="Feeling"
          component={Feeling}
          options={{
            gestureEnabled: false,
          }}
        />

        <OnBoardingStack.Screen
          name="Temperature"
          component={Temperature}
          options={{
            gestureEnabled: false,
          }}
        />

        <OnBoardingStack.Screen
          name="HealthTest"
          component={HealthTest}
          options={{
            gestureEnabled: false,
          }}
        />
      </OnBoardingStack.Navigator>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    step: state.personalDetails.step,
  };
};

export default connect(mapStateToProps, {})(OnBoardingNavigationStack);
