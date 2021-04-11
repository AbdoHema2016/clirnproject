import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {connect} from 'react-redux';
import {
  StoreToken,
  StoreDeviceToken,
  storeUserIdAction,
} from './containers/onBoarding/SignIn/redux/actions';
import {
  storeAccessTokenAction,
  signUpStepAction,
  storeUserIdInPersonalDetailsAction,
} from './containers/onBoarding/personalDetails/redux/actions';
import {storeStatIdAction} from './containers/health/feeling/redux/actions';
import {profileVisitedBeforeAction} from './containers/dashBoard/Home/redux/actions';
import OnBoardingStack from './Navigation/OnBoardingStack';
import DashBoardStack from './Navigation/DashboardStack';
import AsyncStorage from './utilities/AsyncStorage';
import {Firebase, Constants} from './utilities';
import SplashScreen from 'react-native-splash-screen';
import {navigationRef} from './Navigation/NavigationService';
import ModalsQueue from './services/ModalsQueue';
import {logAnalyticsScreenView} from './utilities/Firebase';
import {RouterMethodsObj} from './RouterMethods';
import {logoutAction} from './containers/dashBoard/Settings/redux/actions';
import {getVaccineTypesAction} from './containers/dashBoard/vaccinesResults/redux/actions';
const {modalIds} = Constants;

class Router extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.retrieveData();
    RouterMethodsObj.setProps(this.props);
    RouterMethodsObj.setInstance(this);
  }

  componentDidMount() {
    Firebase.saveTokenFCM((deviceToken) => {
      if (deviceToken != null) {
        this.props.storeDeviceToken(deviceToken);
      }
    });
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }

  routeNameRef = React.createRef();

  retrieveData = async () => {
    try {
      const token = await AsyncStorage.getItemFromStorage('TOKEN');
      const id = await AsyncStorage.getItemFromStorage('USERID');
      const deviceToken = await AsyncStorage.getItemFromStorage('DEVICE_TOKEN');
      const statId = await AsyncStorage.getItemFromStorage('STATID');
      const accessToken = await AsyncStorage.getItemFromStorage(
        'PERSONALDETAILSACCESSTOKEN',
      );
      const step = await AsyncStorage.getItemFromStorage('STEP');
      const profileVisitedBefore = await AsyncStorage.getItemFromStorage(
        'PROFILEVISITED',
      );
      this.props.storeSignUpStep(step !== null ? step : '0');

      if (profileVisitedBefore === '1') {
        ModalsQueue.hideModal({
          modalId: modalIds.walkThrough,
          hideModalFunction: () => this.props.profileVisitedBefore(true),
        });
      }

      if (profileVisitedBefore !== '1') {
        ModalsQueue.showModal({
          modalId: modalIds.walkThrough,
          showModalFunction: () => this.props.profileVisitedBefore(false),
        });
      }

      if (deviceToken) {
        this.props.storeDeviceToken(deviceToken);
      }
      if (token && id !== null) {
        this.props.storeToken(token, id);
      }
      if (accessToken) {
        this.props.storePersonalDetailsToken(accessToken);
      }
      if (statId !== null) {
        this.props.storeStatId(statId);
      }
      if (id !== null) {
        this.props.storeUserId(id);
        this.props.storeUserIdAction(id);
      }
    } catch (error) {}
  };

  renderNavigator = () => {
    const {token, step} = this.props;
    if (!token && !step) {
      return null;
    }
    if (token) {
      return <DashBoardStack />;
    }
    return <OnBoardingStack />;
  };

  onNavigationStateChange = async (state) => {
    if (!navigationRef?.current?.getCurrentRoute()) {
      return;
    }
    const previousRouteName = this.routeNameRef.current;
    const currentRouteName = navigationRef.current.getCurrentRoute().name;

    if (previousRouteName !== currentRouteName) {
      await logAnalyticsScreenView({currentRouteName});
    }

    // Save the current route name for later comparision
    this.routeNameRef.current = currentRouteName;
  };
  onNavigationStateReady = () => {
    if (!navigationRef?.current?.getCurrentRoute()) {
      return;
    }
    return (this.routeNameRef.current = navigationRef.current.getCurrentRoute().name);
  };

  render() {
    return (
      <NavigationContainer
        ref={navigationRef}
        onReady={this.onNavigationStateReady}
        onStateChange={this.onNavigationStateChange}>
        {this.renderNavigator()}
      </NavigationContainer>
    );
  }
}

const mapStateToProps = ({signIn: {token}, personalDetails: {step}}) => ({
  token,
  step,
});

const mapDispatchToPtops = {
  storeToken: StoreToken,
  profileVisitedBefore: profileVisitedBeforeAction,
  storeDeviceToken: StoreDeviceToken,
  storePersonalDetailsToken: storeAccessTokenAction,
  storeSignUpStep: signUpStepAction,
  storeStatId: storeStatIdAction,
  storeUserId: storeUserIdAction,
  storeUserIdAction: storeUserIdInPersonalDetailsAction,
  logout: logoutAction,
  getVaccineTypes: getVaccineTypesAction,
};

export default connect(mapStateToProps, mapDispatchToPtops)(Router);
