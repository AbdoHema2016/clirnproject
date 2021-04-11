import React, {PureComponent} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  ActivityIndicator,
  Text,
} from 'react-native';
import {connect} from 'react-redux';

import Styles from './style/style';
import CNavigationBackButton from '../../../components/cNavigationBackButton';
import CImage from '../../../components/cImage';
import CLabel from '../../../components/cLabel';
import ProfileData from './components/profileData';

import {Constants, HelperFunctions} from '../../../utilities';
import {translate} from '../../../Localization';

import CButton from '../../../components/cButton';
import {request} from '../../../network/request';
import ModalsQueue from '../../../services/ModalsQueue';
import dayjs from 'dayjs';
const {
  LOCAL_PATH,
  URLS,
  sharingTypes,
  temperatureUnits,
  modalIds,
  temperatureType,
  temperatureSource,
  screenSource,
  analyticsIds,
  DATEFORMATS,
} = Constants;

const {
  isHealthTestPositive,
  getTempStatusIndicator,
  checkVaccinationStatus,
  formatDate,
} = HelperFunctions;

class OtherUserProfile extends PureComponent {
  state = {
    loading: true,
    errored: false,
    error: null,
    profileData: {},
  };
  componentDidMount() {
    this.navigationOptions();
    this.getOtherUserProfile();
    this.willFocusSubscription = this.props.navigation.addListener(
      'focus',
      () => {
        this.getOtherUserProfile();
      },
    );
  }
  componentWillUnmount() {
    ModalsQueue.hideModal({
      modalId: modalIds.openOtherUserProfile,
      hideModalFunction: () => {},
    });
    if (this.willFocusSubscriptio) {
      this.willFocusSubscription.remove();
    }
  }

  navigationOptions = () => {
    this.props.navigation.setOptions({
      title: '',
      tabBarVisible: false,
      headerTransparent: true,
      headerLeft: () => (
        <CNavigationBackButton
          tintColor={Styles.tintColor}
          buttonBackgroundColor={Styles.tintColor}
          backButtonAction={this.goBack}
        />
      ),
    });
  };
  navigateToHealthData = () => {
    this.props.navigation.navigate('OtherUserHealthTestData', {
      latest_health_test_results: this.state.profileData
        .latest_health_test_results,
    });
  };
  navigateToVaccineData = () => {
    this.props.navigation.navigate('VaccineDetails', {
      id: this.state.profileData.last_added_vaccine.id,
      source: screenSource.OTHER_USER_PROFILE,
    });
  };
  getOtherUserProfile = async () => {
    try {
      this.setState({loading: true, errored: false, error: null});
      const {
        access_token,
        route: {params},
      } = this.props;

      let config = {
        url: `${
          URLS.API_BASE_URL + URLS.GET_OTHER_USER_DETAILS_VIA_DYNAMIC_LINK
        }/${params?.userId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      if (params?.sharingType === sharingTypes.me) {
        let meSignData = params.signed;
        config = {
          url: URLS.API_BASE_URL + URLS.GET_OTHER_USER_DETAILS_VIA_ME,
          method: 'Post',
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
          params: {data: meSignData},
        };
      }
      const {data} = await request(config);
      this.setState({loading: false, profileData: data.data});
    } catch (error) {
      this.setState({
        loading: false,
        errored: true,
        error: this.getError(error),
      });
    }
  };

  getError = (error) => {
    if (error?.response?.data?.data?.share_id[0]) {
      return error.response.data.data.share_id[0];
    }
    return translate('STRINGS.SOMETHING_WENT_WRONG');
  };

  getProfileStatusIndicator = () => {
    const {
      profileData: {stats},
    } = this.state;
    const {overall = ''} = stats;
    if (overall === Constants.profileStatCodes.GREEN) {
      return LOCAL_PATH.CONFIRMED_ICON;
    }
    if (overall === Constants.profileStatCodes.RED) {
      return LOCAL_PATH.subInfectedIcon;
    }
    if (overall === Constants.profileStatCodes.AMBER) {
      return LOCAL_PATH.amberStatFilled;
    }
    return LOCAL_PATH.ADD_IMAGE_ICON;
  };

  getVaccineStatIcon = () => {
    return LOCAL_PATH.ADD_IMAGE_ICON;
  };

  getHealthStatusIndicator = () => {
    const {
      profileData: {
        stats,
        latest_health_test_results: {is_verified},
      },
    } = this.state;
    const {test} = stats;
    return isHealthTestPositive(test, is_verified);
  };

  getTemperatureUnits = () => {
    const {
      profileData: {
        latest_temperature: {preferred_measurement},
      },
    } = this.state;

    if (preferred_measurement === temperatureUnits.celsius) {
      return ' °C';
    }
    return ' °F';
  };

  goBack = () => {
    this.props.navigation.pop();
  };

  checkTemperatureSource = (source, hikDeviceName) => {
    if (source === temperatureSource.User_Added) {
      return temperatureType.User_Added;
    }
    if (source === temperatureSource.HIK_Camera) {
      return hikDeviceName;
    }
    return temperatureType.Thermal_Scanner;
  };

  renderTemperatureCard = () => {
    const {
      profileData: {latest_temperature, stats},
    } = this.state;
    if (!latest_temperature) {
      return null;
    }
    const {
      temperature,
      source,
      device_name,
      date_of_reading,
    } = latest_temperature;
    return (
      <View style={Styles.dataContainer}>
        <ProfileData
          label={temperature + this.getTemperatureUnits()}
          subLabel={this.checkTemperatureSource(source, device_name)}
          date={dayjs(date_of_reading, DATEFORMATS.TEMPERATURE_DATE).format(
            DATEFORMATS.TESTDATE,
          )}
          statusIcon={getTempStatusIndicator(stats)}
          showInfoButton
          infoDescription={translate('profile.healthDeclaration')}
        />
      </View>
    );
  };

  renderVaccineCard = () => {
    const {
      profileData: {last_added_vaccine, can_verify, medical_approver},
    } = this.state;

    if (!last_added_vaccine) {
      return null;
    }
    const {name, test_date, status, is_verified} = last_added_vaccine;
    return (
      <View style={Styles.dataContainer}>
        <ProfileData
          label={translate('VACCINE_SCREEN.Flu')}
          subLabel={name}
          date={formatDate(test_date)}
          statusIcon={checkVaccinationStatus(status, is_verified)}
          type={screenSource.VACCINE}
          navigation={this.navigateToVaccineData}
          canVerify={medical_approver || can_verify}
          isVerified={is_verified}
          analyticsId={analyticsIds.process_vaccine}
        />
      </View>
    );
  };

  render() {
    const {
      loading,
      errored,
      error,
      profileData: {
        first_name,
        last_name,
        countries,
        latest_health_test_results,
        profile_image,
        can_verify,
        medical_approver,
      },
    } = this.state;
    const {associatedCompany, userLocation, route} = this.props;
    const screenName = route?.name;
    if (loading) {
      return (
        <View style={Styles.loaderContainer}>
          <ActivityIndicator size={'large'} />
        </View>
      );
    } else if (errored) {
      return (
        <SafeAreaView style={Styles.errorContainer}>
          <Text style={Styles.errorText}>{error}</Text>

          <CButton
            text={'Retry'}
            buttonCustomStyle={Styles.retryButton}
            textStyle={Styles.retry}
            onPress={this.getOtherUserProfile}
          />
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={Styles.wrapper}>
        <ScrollView
          bounces={false}
          style={Styles.scrollView}
          contentContainerStyle={Styles.contentContainerStyle}>
          <View style={Styles.profileImageContainer}>
            <View style={Styles.userImageContainer}>
              <CImage
                imageStyle={Styles.userImage}
                imagePath={
                  profile_image
                    ? {uri: profile_image}
                    : LOCAL_PATH.PLACEHOLDER_IMAGE
                }
              />
              <View style={Styles.profileStatusContainer}>
                <CImage
                  resizeMode={'contain'}
                  imageStyle={Styles.userImage}
                  imagePath={this.getProfileStatusIndicator()}
                />
              </View>
            </View>
            <CLabel
              text={first_name + ' ' + last_name}
              style={Styles.userName}
            />
            <CLabel text={countries.name} style={Styles.location} />
          </View>

          {latest_health_test_results && (
            <View style={Styles.dataContainer}>
              <ProfileData
                type={screenSource.HEALTH_RESULTS}
                navigation={this.navigateToHealthData}
                isVerified={latest_health_test_results.is_verified}
                label={latest_health_test_results.test_center}
                subLabel={latest_health_test_results.test_type}
                date={dayjs(latest_health_test_results.test_date).format(
                  DATEFORMATS.TESTDATE,
                )}
                statusIcon={this.getHealthStatusIndicator()}
                canVerify={can_verify || medical_approver}
                associatedCompany={associatedCompany}
                userLocation={userLocation}
                screenName={screenName}
                analyticsId={analyticsIds.process_test}
              />
            </View>
          )}

          {this.renderTemperatureCard()}
          {this.renderVaccineCard()}
        </ScrollView>
        <View style={Styles.logoContainer}>
          <Image source={LOCAL_PATH.TESTED_ME_LOGO} resizeMode={'contain'} />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({signIn, userProfile}) => {
  return {
    access_token: signIn.token,
    associatedCompany: userProfile.associatedCompany,
    userLocation: userProfile.userInfo?.userLocation,
  };
};

export default connect(mapStateToProps)(OtherUserProfile);
