import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Platform, TouchableOpacity, Text, Image} from 'react-native';
import {Style} from '../../style';
import CLabel from '../../../../../components/cLabel';
import CImage from '../../../../../components/cImage';
import {ProfleMethodsObj} from '../../Methods';
import {Constants, Layout, testIds} from '../../../../../utilities';
import {translate} from '../../../../../Localization';

const {LAYOUT_CONSTRAINTS} = Layout;
const {LOCAL_PATH} = Constants;

class CUserImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoAlertVisible: false,
    };
  }

  renderProfilePicture = () => {
    const {userImage} = this.props;
    if (userImage) {
      return (
        <CImage imageStyle={Style.userImage} imagePath={{uri: userImage}} />
      );
    }
    return (
      <View style={Style.placeholderImageContainer}>
        <Image source={LOCAL_PATH.PROFILE_PICTURE} />
      </View>
    );
  };

  setScanMeasurement = () => {
    this.scan.measure((x, y, width, height, posX, posY) => {
      this.props.instance.setState({
        scanMePosition: {
          height: height,
          top: this.setMarginTopScanForWalkthoughIcon(y, posY),
          x: posX,
          width: width,
        },
      });
    });
  };

  setMarginTopScanForWalkthoughIcon = (y, posY) => {
    if (Platform.OS === 'ios') {
      return LAYOUT_CONSTRAINTS.SCREEN_HEIGHT > 800 ? posY : posY - 24;
    }
    return y - 24;
  };

  setScanPosition = () => {
    if (this.scan) {
      this.setScanMeasurement();
    }
  };

  setUploadImageMeasurements = () => {
    this.uploadImageRef.measure((x, y, width, height, posX, posY) => {
      this.props.instance.setState({
        uploadImagePosition: {
          height: height,
          top: this.setMarginTopForWalkthoughIcon(y, posY),
          x: posX + 16,
          width: width,
        },
      });
    });
  };

  setMarginTopForWalkthoughIcon = (y, posY) => {
    if (Platform.OS === 'ios') {
      return LAYOUT_CONSTRAINTS.SCREEN_HEIGHT > 800 ? y : y - 24;
    }
    return posY + 14;
  };

  setUploadImagePosition = () => {
    if (this.uploadImageRef) {
      this.setUploadImageMeasurements();
    }
  };

  navigateToCheckedInList = () => {
    const {instance} = this.props;
    instance.props.navigation.navigate('CheckedIn');
  };
  render() {
    const {
      username,
      userLocation,
      associatedCompany,
      checked_in,
      associatedCompanyLocation,
    } = this.props;
    return (
      <View
        style={[
          Style.userProfileView,
          associatedCompany && Style.adjustedHeight,
          checked_in && Style.userProfileViewHeightWhenCheckedIn,
        ]}>
        <View
          style={Style.scanMe}
          ref={(ref) => {
            this.scan = ref;
          }}
          onLayout={this.setScanPosition}>
          <TouchableOpacity
            accessibilityLabel={testIds.scanMe}
            accessible={true}
            style={Style.scanMeButton}
            onPress={ProfleMethodsObj.showMeSignScanner}>
            <CImage
              resizeMode={'cover'}
              imageStyle={Style.scanMeIcon}
              imagePath={LOCAL_PATH.SCAN_ICON}
            />
            <Text style={Style.scanMeText}>Scan Me</Text>
          </TouchableOpacity>
        </View>
        <View
          style={Style.userImageContainer}
          ref={(ref) => {
            this.uploadImageRef = ref;
          }}
          onLayout={this.setUploadImagePosition}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={Style.profileImageButton}
            accessibilityLabel={testIds.profilePicBtn}
            testID={testIds.profilePicBtn}
            onPress={ProfleMethodsObj.uploadProfileImage}>
            {this.renderProfilePicture()}
          </TouchableOpacity>
          <CImage
            imageStyle={Style.profileImageBottomIcon}
            imagePath={ProfleMethodsObj.getProfileImageBottomIcon()}
          />
        </View>

        <CLabel
          text={username}
          style={Style.userName}
          ellipsizeMode="middle"
          numberOfLines={1}
        />
        <CLabel text={userLocation} style={Style.location} />
        {associatedCompany && (
          <CLabel
            text={associatedCompanyLocation || associatedCompany}
            style={Style.company}
          />
        )}
        {checked_in && (
          <View
            onTouchEnd={this.navigateToCheckedInList}
            style={Style.checkedInView}>
            <CImage
              imageStyle={Style.checkedInImage}
              imagePath={LOCAL_PATH.CHECKED_IN}
            />
            <CLabel
              text={translate('CHECK_OUT_POPUP.CHECKED_IN')}
              style={Style.checkedIn}
            />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    userProfile: {
      associatedCompanyLocation,
      userInfo: {
        userImage,
        username,
        userLocation,
        healthReport: {testTaken, testType, testResult, temperature},
      },
      associatedCompany,
      checked_in,
    },
  } = state;

  return {
    checked_in,
    userImage,
    username,
    userLocation,
    associatedCompany,
    associatedCompanyLocation,
    testTaken,
    testType,
    testResult,
    temperature,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CUserImage);
