import React, {PureComponent} from 'react';
import {View, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {logoutAction, deleteAccountAction} from './redux/actions';
import {Style} from './style';
import CCell from './settingsComponents/cell/cellComponent';
import CHeader from './settingsComponents/header/HeaderComponent';
import {Constants, HelperFunctions, OpenExternalURl} from '../../../utilities';
import {translate} from '../../../Localization';

import CLoader from '../../../components/cLoader';
import {JumioFlowMethodsObj} from '../../Jumio/verificationFlowMethods';
const {URLS, alertModal, settingsCellIds} = Constants;
const {alert, keyExtractor} = HelperFunctions;
const {openUrl} = OpenExternalURl;
import {getJumioCredentials} from '../../onBoarding/verifyDocuments/redux/actions';

class Settings extends PureComponent {
  constructor(props) {
    super(props);
    JumioFlowMethodsObj.setProps(this.props);
    JumioFlowMethodsObj.setInstance(this);
    this.state = {
      source: 'settings',
    };
  }
  settingsOptions = [
    {
      id: settingsCellIds.healthResults,
      title: translate('SETTINGS.HEALTH_TEST_RESULT'),
    },
    {
      id: settingsCellIds.vaccinationResults,
      title: translate('SETTINGS.VACCINATION_RESULTS'),
    },
    {
      id: settingsCellIds.tempResults,
      title: translate('SETTINGS.TEMPERATURE_RESULTS'),
    },
    {
      id: settingsCellIds.shareHistory,
      title: translate('SETTINGS.SHARE_HISTORY'),
    },
    {
      id: settingsCellIds.personalContactDetails,
      title: translate('SETTINGS.PERSONAL_AND_CONTACT_DETAILS'),
    },
    {
      id: settingsCellIds.medicalApprover,
      title: translate('SETTINGS.MEDICAL_APPROVER'),
    },
    {
      id: settingsCellIds.jumioVerfication,
      title: translate('SETTINGS.RESTART_JUMIO_VERIFICATION'),
    },
    {
      id: settingsCellIds.passwordSettings,
      title: translate('SETTINGS.PASSWORD_SETTINGS'),
    },
    {
      id: settingsCellIds.inviteFriends,
      title: translate('SETTINGS.INVITE_YOUR_FRIENDS'),
    },
    {
      id: settingsCellIds.myCompany,
      title: translate('SETTINGS.MY_COMPANY'),
    },
    {
      id: settingsCellIds.aboutVersion,
      title: translate('SETTINGS.ABOUT_VERSION'),
    },
    {
      id: settingsCellIds.termsConditions,
      title: translate('SETTINGS.T_AND_C'),
    },
    {
      id: settingsCellIds.privacyPolicy,
      title: translate('SETTINGS.PRIVACY_POLICY'),
    },
    {
      id: settingsCellIds.logout,
      title: translate('SETTINGS.LOGOUT'),
    },
    {
      id: settingsCellIds.deleteUser,
      title: translate('SETTINGS.DELETE_USER'),
    },
  ];

  onButtonPress = (buttonId) => {
    const {logout, token, navigation, deleteAccount} = this.props;

    switch (buttonId) {
      case settingsCellIds.healthResults:
        return navigation.navigate('HealthTests');
      case settingsCellIds.tempResults:
        return navigation.navigate('TemperatureHistory');
      case settingsCellIds.shareHistory:
        return navigation.navigate('ShareHistory');
      case settingsCellIds.personalContactDetails:
        return navigation.navigate('EditPersonalAndContactDetails');
      case settingsCellIds.passwordSettings:
        return navigation.navigate('PasswordSettings');
      case settingsCellIds.inviteFriends:
        return navigation.navigate('InviteYourFriend');
      case settingsCellIds.myCompany:
        return navigation.navigate('MyCompany');
      case settingsCellIds.aboutVersion:
        return navigation.navigate('AboutVersion');
      case settingsCellIds.termsConditions:
        return openUrl(URLS.TC_URL);
      case settingsCellIds.privacyPolicy:
        return openUrl(URLS.PRIVACY_POLICY_URL);
      case settingsCellIds.logout:
        return alert('Alert', translate('SETTINGS.LOGOUT_PROMPT'), (result) => {
          if (result === alertModal.logout) {
            return logout(token);
          }
        });
      case settingsCellIds.deleteUser:
        return alert(
          'Alert',
          translate('SETTINGS.DELETE_ACCOUNT_PROPMT'),
          (result) => {
            if (result === alertModal.logout) {
              return deleteAccount();
            }
          },
        );
      case settingsCellIds.jumioVerfication:
        return JumioFlowMethodsObj.startJumio();
      case settingsCellIds.vaccinationResults:
        return navigation.navigate('VaccineResults');
      case settingsCellIds.medicalApprover:
        return navigation.navigate('MedicalApprover');
      default:
        return;
    }
  };

  componentDidMount() {
    const {idValidated} = this.props;
    if (!idValidated) {
      JumioFlowMethodsObj.getJumioData();
    }
  }
  renderSettingsButton = ({item, index}) => {
    const {idValidated, medicalApprover} = this.props;
    if (
      (item.id === settingsCellIds.jumioVerfication && idValidated) ||
      (item.id === settingsCellIds.medicalApprover && medicalApprover)
    ) {
      return;
    }
    return <CCell option={item} onPress={this.onButtonPress} />;
  };
  render() {
    const {loading} = this.props.settingsReducer;
    return (
      <View style={Style.container}>
        <CHeader />
        <FlatList
          data={this.settingsOptions}
          extraData={this.props}
          renderItem={this.renderSettingsButton}
          keyExtractor={keyExtractor}
          contentContainerStyle={Style.optionsList}
        />
        <CLoader loading={loading} />
      </View>
    );
  }
}

const mapStateToProps = ({
  signIn: {token, userID},
  userProfile: {idValidated, medicalApprover},
  settingsReducer,
  jumio: {apiSecret, apiToken, dataCenter, loading, error},
}) => ({
  token,
  userId: userID,
  idValidated,
  medicalApprover,
  settingsReducer,
  apiSecret,
  apiToken,
  dataCenter,
  loading,
  error,
});

const mapDispatchToProps = {
  logout: logoutAction,
  deleteAccount: deleteAccountAction,
  fetchJumioCredentials: getJumioCredentials,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
