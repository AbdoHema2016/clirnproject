import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';
import CImage from '../../../../components/cImage';
import CLabel from '../../../../components/cLabel';
import CButtonWithImage from '../../../../components/cButtonWithImage';
import CButton from '../../../../components/cButton';
import CZoomImage from '../../../../components/cZoomImage';
import Style from './style';
import {Constants, Layout} from '../../../../utilities';
import {translate} from '../../../../Localization';
const {
  LOCAL_PATH,
  testIds,
  DATEFORMATS,
  screenSource,
  RejectionTypes,
} = Constants;
const {HEX_COLOR_CODES, LAYOUT_CONSTRAINTS} = Layout;
import dayjs from 'dayjs';
class HealthTestDetailsComponent extends Component {
  createHealthDetailFields() {
    const {
      healthTestDetails: {
        test_center,
        test_date,
        test_performed,
        test_type,
        test_result,
      },
    } = this.props;
    let healthDetails = [
      {
        id: '0',
        title: translate('healthTest.healthTestCentreName'),
        value: test_center,
      },
      {
        id: '1',
        title: translate('healthTest.type'),
        value: test_type,
      },
      {
        id: '2',
        title: translate('healthTest.date'),
        value:
          test_date &&
          dayjs(test_date, DATEFORMATS.TEMPERATURE_DATA).format(
            DATEFORMATS.PROFILE_HEALTH_TEST,
          ),
      },
      {
        id: '3',
        title: translate('healthTest.results'),
        value: test_result,
      },
      {
        id: '4',
        title: translate('healthTest.how'),
        value: test_performed,
      },
    ];
    return healthDetails.map(({title, id, value}) => (
      <View key={id}>
        <CLabel style={Style.inputLabel} text={title} />
        <CLabel
          style={this.checkPositiveStatus(id, value)}
          text={value}
          accessibilityLabel={title}
          testID={title}
          numberOfLines={1}
          ellipsizeMode={'middle'}
        />
      </View>
    ));
  }

  checkPositiveStatus = (id, status) => {
    if (id !== '3') {
      return Style.healthTestDetailText;
    }
    if (status?.search('Positive') && status?.search('positive') === -1) {
      return [Style.healthTestDetailText, Style.nagtiveHealhTestResultColor];
    }
    return [Style.healthTestDetailText, Style.positiveHealhTestResultColor];
  };
  checkRejectionType = () => {
    const {
      healthTestDetails: {deny_reason},
    } = this.props;
    if (deny_reason === RejectionTypes.illegibleDocument) {
      return translate('healthTest.uploadNewDocument');
    }
    return translate('healthTest.editData');
  };
  showVerifyLbl = (isVerified) => {
    if (isVerified) {
      return (
        <CLabel
          accessibilityLabel={testIds.verify}
          testID={testIds.verify}
          style={Style.verified}
          text={translate('healthTest.verified')}
        />
      );
    }
    if (isVerified === false) {
      return (
        <CLabel
          accessibilityLabel={testIds.verify}
          testID={testIds.verify}
          style={Style.notVerified}
          text={translate('healthTest.notVerified')}
        />
      );
    }
    return null;
  };
  showVerificationBtns = (isVerified) => {
    const {editTest, removeHealthTest, source} = this.props;
    if (source !== screenSource.OTHER_USER_PROFILE && !isVerified) {
      return (
        <View>
          <CButtonWithImage
            accessibilityLabel={testIds.edit}
            buttonContainerStyle={Style.editButton}
            text={translate('VACCINE_SCREEN.EDIT')}
            textStyle={Style.editButtonText}
            imagePath={LOCAL_PATH.editGrey}
            customeImageStyle={Style.editImageStyle}
            onPress={editTest}
          />

          <CButtonWithImage
            accessibilityLabel={testIds.deleteTest}
            buttonContainerStyle={Style.deleteButton}
            text={translate('VACCINE_SCREEN.DELETE')}
            textStyle={Style.deleteBtnTxt}
            imagePath={LOCAL_PATH.trashRed}
            customeImageStyle={Style.deleteImageStyle}
            onPress={removeHealthTest}
          />
        </View>
      );
    }
    if (source === screenSource.OTHER_USER_PROFILE) {
      return (
        <View>
          <CButton
            accessibilityLabel={testIds.approveTest}
            buttonContainerStyle={Style.approveBtn}
            text={translate('STRINGS.VERIFY')}
            textStyle={Style.approveBtnTxt}
            onPress={editTest}
          />

          <CButton
            accessibilityLabel={testIds.rejectTest}
            buttonContainerStyle={Style.deleteButton}
            text={translate('healthTest.deny')}
            textStyle={Style.denyBtnTxt}
            onPress={removeHealthTest}
          />
        </View>
      );
    }
    return null;
  };
  showDenyReasonBlock = () => {
    const {
      editTest,
      healthTestDetails: {deny_reason},
    } = this.props;
    let reason = '';
    if (deny_reason === RejectionTypes.illegibleDocument) {
      reason = translate('healthTest.illegibleDocument');
    }
    if (deny_reason === RejectionTypes.incorrectData) {
      reason = translate('healthTest.incorrectDataForTest');
    }
    if (deny_reason === RejectionTypes.other) {
      reason = translate('healthTest.otherReason');
    }

    if (deny_reason) {
      return (
        <View style={Style.rejectedData}>
          <CLabel text={reason} style={Style.rejectedDataInfo} />
          {deny_reason !== RejectionTypes.other && (
            <CButton
              buttonContainerStyle={Style.uploadNewDocument}
              text={this.checkRejectionType()}
              textStyle={Style.uploadButtonTextStyle}
              onPress={editTest}
            />
          )}

          <CLabel
            text={translate('healthTest.contact')}
            style={Style.contact}
            link={translate('healthTest.customerSupport')}
          />
        </View>
      );
    }
  };
  render() {
    const {
      document_url,
      loading,
      zoom,
      handleModal,
      setImageLoader,
      healthTestDetails: {is_verified},
    } = this.props;

    return (
      <View>
        <View style={Style.innerContainer}>
          <View style={Style.title}>
            <CLabel
              style={Style.appTitle}
              text={translate('healthTest.title')}
            />

            {this.showVerifyLbl(is_verified)}
          </View>
          {this.showDenyReasonBlock()}

          <View style={Style.inputContainer}>
            {this.createHealthDetailFields()}
            <CLabel
              style={Style.inputLabel}
              text={translate('VACCINE_SCREEN.TEST_DOCUMENT')}
            />
            <View style={Style.testImageView}>
              <CImage
                imagePath={{uri: document_url}}
                imageStyle={Style.testImage}
                onLoadStart={() => setImageLoader(true)}
                onLoadEnd={() => setImageLoader(false)}
                resizeMode={'contain'}
              />
              <CButtonWithImage
                onPress={handleModal}
                imagePath={LOCAL_PATH.zoom}
                buttonContainerStyle={Style.zoom}
                customeImageStyle={Style.zoomImage}
                buttonCustomStyle={Style.zoomButton}
              />
              {zoom && (
                <CZoomImage
                  image={[
                    {
                      url: document_url,
                      width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 26,
                      height: LAYOUT_CONSTRAINTS.SCREEN_WIDTH + 26,
                    },
                  ]}
                  closeModal={handleModal}
                />
              )}
              <ActivityIndicator
                style={Style.activityIndicator}
                animating={loading}
                size={'large'}
                color={HEX_COLOR_CODES.GREEN_2}
              />
            </View>
          </View>
          {this.showVerificationBtns(is_verified)}
        </View>
      </View>
    );
  }
}

export default HealthTestDetailsComponent;
