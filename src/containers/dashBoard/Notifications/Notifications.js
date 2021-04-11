import React, {PureComponent} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {Style} from './style';
import CLabel from '../../../components/cLabel';
import {connect} from 'react-redux';
import CButtonWithImage from '../../../components/cButtonWithImage';
import {HelperFunctions, Constants} from '../../../utilities';
import {translate} from '../../../Localization';

import {
  getNotificationsAction,
  deleteNotificationsAction,
} from './redux/actions';
import Loader from '../../../components/cLoader';
import {SharingMethodsObj} from '../Home/Methods';
import NavigationService from '../../../Navigation/NavigationService';
const {
  LOCAL_PATH,
  appState,
  companyInvitationStatus,
  notificationType,
} = Constants;
const {keyExtractor, formatNotificationDate} = HelperFunctions;
class Notifications extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      stateNotificationList: [],
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.getNotification();
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }

  getNotification = async () => {
    const {getNotifications} = this.props;
    getNotifications();
  };
  updateNotifications = (prevNotification) => {
    const {notificationsList} = this.props;
    const {stateNotificationList} = this.state;
    if (
      notificationsList !== prevNotification &&
      notificationsList !== stateNotificationList
    ) {
      this.setState({stateNotificationList: notificationsList});
    }
  };
  componentDidUpdate(prevProps) {
    this.updateNotifications(prevProps.notificationsList);
  }

  checkNotificationType = (item) => {
    if (item.category === notificationType.temparatureUpdateModal) {
      return translate('NOTIFICATION_SCREEN.TEMPERATURE');
    }
    if (item.category === notificationType.companyUpdateModal && item.company) {
      return `${item.location_name || item.company} ${translate(
        'NOTIFICATION_SCREEN.COMPANY_NOTIFICATION',
      )}`;
    }
    if (item.category === notificationType.HealthUpdateModal) {
      let cameraName =
        item.user_stat?.device_name || translate('NOTIFICATION_SCREEN.HIK');
      return (
        translate('NOTIFICATION_SCREEN.TEMP_UPDATED_BY') +
        cameraName +
        translate('NOTIFICATION_SCREEN.CAMERA')
      );
    }
    if (item.category === notificationType.notCheckedInForWork) {
      return translate('NOTIFICATION_SCREEN.NOT_CHECK_WORK');
    }
    if (item.category === notificationType.jumioVerified) {
      return translate('NOTIFICATION_SCREEN.JUMIO_VERIFIED_BODY');
    }
    if (item.category === notificationType.jumioFailure) {
      return translate('NOTIFICATION_SCREEN.JUMIO_FAILURE_BODY');
    }
    if (item.category === notificationType.permissionUpdate) {
      return translate('NOTIFICATION_SCREEN.PERMISSION_UPDATE');
    }
    if (item.category === notificationType.employeeRemoved) {
      return translate('NOTIFICATION_SCREEN.EMPLOYEE_REMOVED');
    }
    if (item.category === notificationType.healthTestApproved) {
      return translate('NOTIFICATION_SCREEN.HEALTH_TEST_APPROVED');
    }
    if (item.category === notificationType.healthTestRejected) {
      return translate('NOTIFICATION_SCREEN.HEALTH_TEST_REJECTED');
    }
    if (item.category === notificationType.addMedicalProfessional) {
      return translate('NOTIFICATION_SCREEN.VERIFY_PERMISSION_UPDATE');
    }
    if (item.category === notificationType.removeMedicalProfessional) {
      return translate('NOTIFICATION_SCREEN.VERIFY_PERMISSION_UPDATE');
    }
    if (item.category === notificationType.vaccineVerifyApproved) {
      return translate('NOTIFICATION_SCREEN.VACCINE_APPROVED');
    }
    if (item.category === notificationType.vaccineVerifyRejected) {
      return translate('NOTIFICATION_SCREEN.VACCINE_REJECTED');
    }
    return translate('NOTIFICATION_SCREEN.HEALTH_TEST');
  };
  getAdditionalData = (item) => {
    if (item.category === notificationType.companyUpdateModal) {
      return item.location_name || item.company;
    }

    return item.permissions;
  };
  notificationPressed = (item) => {
    let data = {
      category: item.category.toString(),
      additional: this.getAdditionalData(item),
      id: item.invitation_id,
    };
    if (item.category === notificationType.temparatureUpdateModal) {
      SharingMethodsObj.notificationReceived(appState.foreground, data);
      return;
    }

    if (item.category === notificationType.feelingUpdateModal) {
      SharingMethodsObj.notificationReceived(appState.foreground, data);
      return;
    }

    if (item.category === notificationType.companyUpdateModal) {
      SharingMethodsObj.notificationReceived(appState.foreground, data);
      return;
    }
    if (item.category === notificationType.jumioVerified) {
      NavigationService.navigation.navigate('Profile');
      SharingMethodsObj.notificationReceived(appState.foreground, data);
      return;
    }
    if (item.category === notificationType.jumioFailure) {
      SharingMethodsObj.notificationReceived(appState.foreground, data);
      return;
    }
    if (item.category === notificationType.permissionUpdate) {
      SharingMethodsObj.notificationReceived(appState.foreground, data);
      return;
    }
    if (item.category === notificationType.healthTestApproved) {
      this.props.navigation.navigate('HealthDetails', {id: item.health_id});
      return;
    }
    if (item.category === notificationType.healthTestRejected) {
      this.props.navigation.navigate('HealthDetails', {id: item.health_id});
      return;
    }
    if (item.category === notificationType.addMedicalProfessional) {
      data = {
        ...data,
        additional: JSON.stringify({
          company: item.location_name || item.company,
        }),
      };
      SharingMethodsObj.notificationReceived(appState.foreground, data);
    }
    if (item.category === notificationType.vaccineVerifyApproved) {
      this.props.navigation.navigate('VaccineDetails', {id: item.vaccine_id});
      return;
    }
    if (item.category === notificationType.vaccineVerifyRejected) {
      this.props.navigation.navigate('VaccineDetails', {id: item.vaccine_id});
      return;
    }
  };
  notificationRenderItem = ({item, index}) => {
    if (item.category > 16) {
      return;
    }
    return (
      <TouchableOpacity
        accessible={true}
        accessibilityLabel={this.checkNotificationType(item)}
        style={Style.notificationCard}
        onPress={() => this.notificationPressed(item)}>
        <View style={Style.notiUpperContainer}>
          <CLabel
            style={Style.notiCardTitle}
            text={this.checkNotificationType(item)}
            subText={item?.category === 10 && item?.company}
            subTextStyle={Style.subTextStyle}
          />
          <CButtonWithImage
            buttonContainerStyle={Style.crossButtonContainer}
            buttonCustomStyle={Style.crsossButton}
            customeImageStyle={Style.remove}
            imagePath={LOCAL_PATH.CROSS_DARK_ICON}
            onPress={() => this.deleteNotificationCell(item.id)}
          />
        </View>
        <CLabel
          style={Style.notiCardDate}
          text={formatNotificationDate(item.created_at)}
        />
        <View style={Style.underLine} />
      </TouchableOpacity>
    );
  };

  checkIfThereIsAnyNotifcation = () => {
    const {stateNotificationList} = this.state;

    const unrespondedCompanyInvitations = [];
    const generalNotifications = [];

    stateNotificationList.forEach((notification) => {
      if (
        notification.category === notificationType.companyUpdateModal &&
        notification.invitation_status === companyInvitationStatus.notResponded
      ) {
        return unrespondedCompanyInvitations.push(notification);
      }

      return generalNotifications.push(notification);
    });

    const notifications = [
      ...unrespondedCompanyInvitations,
      ...generalNotifications,
    ];

    if (notifications.length > 0) {
      return (
        <View style={Style.flatList}>
          <FlatList
            data={notifications}
            renderItem={this.notificationRenderItem}
            contentContainerStyle={Style.listContainer}
            keyExtractor={keyExtractor}
          />
        </View>
      );
    }
    return (
      <CLabel
        style={Style.noNotification}
        text={translate('NOTIFICATION_SCREEN.NO_NOTIFICATION')}
      />
    );
  };

  deleteNotificationCell = (id) => {
    const {access_token, deleteNotifications} = this.props;
    const {stateNotificationList} = this.state;
    let data = {id: id, access_token};
    let filteredNotification = stateNotificationList.filter(
      (cell) => cell.id !== id,
    );
    this.setState({stateNotificationList: filteredNotification});
    deleteNotifications(data);
  };

  render() {
    const {loading} = this.props;
    return (
      <View style={Style.container}>
        <View style={[Style.header]}>
          <CLabel
            style={Style.title}
            text={translate('NOTIFICATION_SCREEN.NOTIFICATIONS_TITLE')}
          />
        </View>
        {this.checkIfThereIsAnyNotifcation()}

        <Loader loading={loading} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    signIn: {token},
    notificationsReducer: {
      notificationIdToBeDeleted,
      notificationsList,
      loading,
    },
  } = state;
  return {
    access_token: token,
    id: notificationIdToBeDeleted,
    notificationsList,
    loading,
  };
};

const mapDispatchToProps = {
  getNotifications: getNotificationsAction,
  deleteNotifications: deleteNotificationsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
