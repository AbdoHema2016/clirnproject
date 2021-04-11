import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import {styles} from './styles';
import {Constants, Layout, testIds} from '../../../../../utilities';
import {translate} from '../../../../../Localization';

import {logAnalyticsEvent} from '../../../../../utilities/Firebase';
const {LOCAL_PATH, screenSource} = Constants;
const {HEX_COLOR_CODES} = Layout;
const {SlideInMenu} = renderers;
const ProfileData = ({
  statusIcon,
  label,
  subLabel,
  date,
  showInfoButton,
  infoDescription,
  navigation,
  isVerified,
  canVerify,
  type,
  associatedCompany,
  userLocation,
  screenName,
  analyticsId,
}) => {
  const [showAlert, setShowAlert] = useState(false);

  const onShowAlertPress = () => setShowAlert(true);
  const onHideAlertPress = () => setShowAlert(false);
  const showVerifiedHealthLabel = () => {
    if (isVerified) {
      return (
        <Text style={styles.verifiedLabel} accessibilityLabel={testIds.verify}>
          {translate('healthTest.verified')}
        </Text>
      );
    }
    return null;
  };
  const renderInfoButton = () => {
    if (
      !isVerified &&
      (type === screenSource.HEALTH_RESULTS || type === screenSource.VACCINE) &&
      canVerify
    ) {
      return (
        <View style={styles.processButtonView}>
          <TouchableOpacity
            accessibilityLabel={testIds.process}
            style={styles.processButton}
            onPress={() => {
              navigation();
              logAnalyticsEvent(analyticsId, {
                associatedCompany,
                userLocation,
                screenName,
              });
            }}>
            <Text style={styles.processText}>
              {translate('STRINGS.PROCESS')}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (!showInfoButton) {
      return null;
    }

    return (
      <Menu
        opened={showAlert}
        renderer={SlideInMenu}
        onBackdropPress={onHideAlertPress}
        rendererProps={{placement: 'bottom'}}>
        <MenuTrigger onPress={onShowAlertPress} style={styles.menuTrigger}>
          <View
            style={{
              ...styles.infoContainer,
              backgroundColor: HEX_COLOR_CODES.ORANGE,
            }}>
            <Image
              source={LOCAL_PATH.PROFILE_INFO_ICON}
              style={styles.infoIcon}
            />
          </View>
        </MenuTrigger>

        <MenuOptions optionsContainerStyle={styles.infoAlertContainer}>
          <Text style={styles.alertDescription}>{infoDescription}</Text>
        </MenuOptions>
      </Menu>
    );
  };
  return (
    <View style={styles.container}>
      <Image source={statusIcon} style={styles.verifiedIcon} />
      <View style={styles.testDetailsContainer}>
        <Text style={styles.testLabel}>{label}</Text>
        {showVerifiedHealthLabel(isVerified)}
        <Text style={styles.testDate}>{date}</Text>
      </View>
      {renderInfoButton()}
    </View>
  );
};

export default ProfileData;
