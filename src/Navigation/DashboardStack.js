import React from 'react';
import Tabs from './TabNavigator';
import ValidateIdBeforeSharing from '../containers/dashBoard/Home/ValidateId';
import {createStackNavigator} from '@react-navigation/stack';
import OtherUserProfile from '../containers/dashBoard/OtherUserProfile/OtherUserProfile';
import PendingVerification from '../containers/dashBoard/PendingVerification/PendingVerification';
import ContactDataShared from '../containers/dashBoard/ContactDataShared/ContactDataShared';
import EditPersonalAndContactDetails from '../containers/dashBoard/Settings/editPersonalAndContactDetails/EditPersonalAndContactDetails';
import PasswordSettings from '../containers/dashBoard/Settings/passwordSettings/PasswordSettings';
import MyCompany from '../containers/dashBoard/Company/myCompany';
import ForgotPassword from '../containers/onBoarding/forgotPassword/ForgotPassword';
import ShareHistory from '../containers/dashBoard/Settings/shareHistory/ShareHistory';
import OTP from '../containers/onBoarding/otp/OTP';
import TemperatureHistory from '../containers/dashBoard/Settings/temperatureResults/TemperatureResults';
import InviteYourFriend from '../containers/dashBoard/Settings/InviteYourFriend/InviteYourFriend';
import CNavigationBackButton from '../components/cNavigationBackButton';
import {Style} from '../containers/dashBoard/style';
import {translate} from '../Localization';
import HealthTestsResults from '../containers/dashBoard/HealthTests/Results';
import AboutVersion from '../containers/dashBoard/AboutVersion';
import VaccinesResults from '../containers/dashBoard/vaccinesResults';
import VaccineForm from '../containers/dashBoard/vaccinesResults/vaccineDetails/VaccineForm';
import VaccineDetails from '../containers/dashBoard/vaccinesResults/vaccineDetails/index';
import CheckedIn from '../containers/dashBoard/CheckedIn';
import HealthDetails from '../containers/dashBoard/HealthTests/Details';
import OtherUserHealthTestData from '../containers/dashBoard/OtherUserProfile/components/healhTest/healthTestData';
import MedicalApprover from '../containers/dashBoard/MedicalApprover';
const HomeStack = createStackNavigator();

export default class HomeNavigationStack extends React.Component {
  render() {
    return (
      <HomeStack.Navigator initialRouteName={'Tabs'}>
        <HomeStack.Screen
          name="Tabs"
          component={Tabs}
          options={{
            headerShown: false,
          }}
        />
        <HomeStack.Screen
          name="ValidateIdBeforeSharing"
          component={ValidateIdBeforeSharing}
        />
        <HomeStack.Screen
          name="HealthTests"
          component={HealthTestsResults}
          options={({navigation}) => ({
            headerTransparent: true,
            title: '',
            headerLeft: () => (
              <CNavigationBackButton
                title={translate('BACK.BACK_BUTTON_TITLE')}
                titleStyle={Style.headerTitleGrey}
                backButtonAction={() => navigation.goBack()}
                grey
              />
            ),
          })}
        />
        <HomeStack.Screen
          name="EditPersonalAndContactDetails"
          component={EditPersonalAndContactDetails}
        />
        <HomeStack.Screen
          name="TemperatureHistory"
          component={TemperatureHistory}
        />
        <HomeStack.Screen
          name="PasswordSettings"
          component={PasswordSettings}
        />
        <HomeStack.Screen
          name="MyCompany"
          component={MyCompany}
          options={({navigation}) => ({
            headerTransparent: true,
            title: '',
            headerLeft: () => (
              <CNavigationBackButton
                grey={true}
                title={translate('BACK.BACK_BUTTON_TITLE')}
                titleStyle={Style.backButtonStyle}
                backButtonAction={() => navigation.goBack()}
              />
            ),
          })}
        />
        <HomeStack.Screen name="ForgotPassword" component={ForgotPassword} />
        <HomeStack.Screen
          name="ShareHistory"
          component={ShareHistory}
          options={({navigation}) => ({
            headerTransparent: true,
            title: '',
            headerLeft: () => (
              <CNavigationBackButton
                grey={true}
                title={translate('BACK.BACK_BUTTON_TITLE')}
                titleStyle={Style.backButtonStyle}
                backButtonAction={() => navigation.goBack()}
              />
            ),
          })}
        />
        <HomeStack.Screen name="ROTP" component={OTP} />
        <HomeStack.Screen
          name="OtherUserProfile"
          component={OtherUserProfile}
        />
        <HomeStack.Screen
          name="OtherUserHealthTestData"
          component={OtherUserHealthTestData}
          options={({navigation}) => ({
            headerTransparent: true,
            title: '',
            headerLeft: () => (
              <CNavigationBackButton
                grey={true}
                title={translate('BACK.BACK_BUTTON_TITLE')}
                titleStyle={Style.backButtonStyle}
                backButtonAction={() => navigation.goBack()}
              />
            ),
          })}
        />
        <HomeStack.Screen
          name="PendingVerification"
          component={PendingVerification}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="ContactDataShared"
          component={ContactDataShared}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="InviteYourFriend"
          component={InviteYourFriend}
          options={({navigation}) => ({
            headerTransparent: true,
            title: null,
            headerLeft: () => (
              <CNavigationBackButton
                title={'Back'}
                titleStyle={Style.headerTitleGrey}
                backButtonAction={() => navigation.goBack()}
                grey
              />
            ),
          })}
        />
        <HomeStack.Screen
          name="AboutVersion"
          component={AboutVersion}
          options={({navigation}) => ({
            headerTransparent: true,
            title: '',
            headerLeft: () => (
              <CNavigationBackButton
                title={translate('BACK.BACK_BUTTON_TITLE')}
                titleStyle={Style.headerTitleGrey}
                backButtonAction={() => navigation.goBack()}
                grey
              />
            ),
          })}
        />
        <HomeStack.Screen
          name="VaccineResults"
          component={VaccinesResults}
          options={({navigation}) => ({
            headerTransparent: true,
            title: '',
            headerLeft: () => (
              <CNavigationBackButton
                title={translate('BACK.BACK_BUTTON_TITLE')}
                titleStyle={Style.headerTitleGrey}
                backButtonAction={() => navigation.goBack()}
                grey
              />
            ),
          })}
        />
        <HomeStack.Screen name="VaccineForm" component={VaccineForm} />
        <HomeStack.Screen
          name="CheckedIn"
          component={CheckedIn}
          options={({navigation}) => ({
            headerTransparent: true,
            title: '',
            headerLeft: () => (
              <CNavigationBackButton
                title={translate('BACK.BACK_BUTTON_TITLE')}
                titleStyle={Style.headerTitleGrey}
                backButtonAction={() => navigation.goBack()}
                grey
              />
            ),
          })}
        />
        <HomeStack.Screen
          name="VaccineDetails"
          component={VaccineDetails}
          options={({navigation}) => ({
            headerTransparent: true,
            title: '',
            headerLeft: () => (
              <CNavigationBackButton
                title={translate('BACK.BACK_BUTTON_TITLE')}
                titleStyle={Style.headerTitleGrey}
                backButtonAction={() => navigation.goBack()}
                grey
              />
            ),
          })}
        />
        <HomeStack.Screen
          name="HealthDetails"
          component={HealthDetails}
          options={({navigation}) => ({
            headerTransparent: true,
            title: '',
            headerLeft: () => (
              <CNavigationBackButton
                title={translate('BACK.BACK_BUTTON_TITLE')}
                titleStyle={Style.headerTitleGrey}
                backButtonAction={() => navigation.goBack()}
                grey
              />
            ),
          })}
        />
        <HomeStack.Screen
          name="MedicalApprover"
          component={MedicalApprover}
          options={({navigation}) => ({
            headerTransparent: true,
            title: '',
            headerLeft: () => (
              <CNavigationBackButton
                title={translate('BACK.BACK_BUTTON_TITLE')}
                titleStyle={Style.headerTitleGrey}
                backButtonAction={() => navigation.goBack()}
                grey
              />
            ),
          })}
        />
      </HomeStack.Navigator>
    );
  }
}
