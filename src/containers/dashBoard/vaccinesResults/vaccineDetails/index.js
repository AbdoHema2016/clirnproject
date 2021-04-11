import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import Style from './vaccineDetailsStyle';
import CLabel from '../../../../components/cLabel';
import CImage from '../../../../components/cImage';
import CButton from '../../../../components/cButton';
import CButtonWithImage from '../../../../components/cButtonWithImage';
import CZoomImage from '../../../../components/cZoomImage';
import RejectionPopUp from '../../../../components/cRejectionPopUp';
import VerifyVaccine from '../../../../components/cVaccineVerifyPopUp';
import {
  LOCAL_PATH,
  Layout,
  testIds,
  screenSource,
  Constants,
} from '../../../../utilities';
import {translate} from '../../../../Localization';

import VaccineRemovePopup from '../vaccinePopups/vaccineRemovePopup';
import resultsMethods from '../resultsMethods';
import {
  deleteVaccineAction,
  showVaccineModalAction,
  setVaccineFieldsToBeEditedAction,
  getVaccineDetailsAction,
  reviewVaccineAction,
} from '../redux/actions';
import ModalsQueue from '../../../../services/ModalsQueue';
const {HEX_COLOR_CODES, LAYOUT_CONSTRAINTS} = Layout;
const {modalIds, vaccineVerifyType, URLS, RejectionTypes} = Constants;

class VaccineDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPicker: false,
      zoom: false,
      removeVaccineVisible: false,
      showVaccineModal: false,
      showApproveRejectModal: false,
      image: [],
      loading: true,
      type: null,
      showModal: false,
    };
  }

  componentDidMount() {
    const {
      route: {
        params: {id, source},
      },
    } = this.props;
    this.props.getVaccineDetails({id, source});
  }
  handleModal = () => {
    this.setState({
      zoom: !this.state.zoom,
    });
  };
  createVaccineDetailFields() {
    const {
      vaccineDetails: {name, health_center, test_date, expiration_date},
    } = this.props;
    let personalDetails = [
      {
        id: '0',
        title: translate('VACCINE_SCREEN.NAME'),
        value: name,
      },
      {
        id: '1',
        title: translate('VACCINE_SCREEN.HEALTH_CENTRE'),
        value: health_center,
      },
      {
        id: '2',
        title: translate('VACCINE_SCREEN.DATE_TAKEN'),
        value: test_date,
      },
      {
        id: '3',
        title: translate('VACCINE_SCREEN.EXPIRATION_DATE'),
        value: expiration_date,
      },
    ];
    return personalDetails.map((detail) => (
      <View key={detail.id}>
        <CLabel style={Style.inputLabel} text={detail.title} />
        <CLabel
          style={Style.vaccineDetailText}
          numberOfLines={1}
          ellipsizeMode={'middle'}
          text={detail.value}
        />
      </View>
    ));
  }

  removeVaccine = () => {
    const {removeVaccineVisible} = this.state;
    this.setState({
      removeVaccineVisible: !removeVaccineVisible,
    });
  };
  popToPreviousScreen = () => {
    this.props.navigation.goBack();
  };
  editVaccineData = (index, item) => {
    const {vaccineDetails} = this.props;
    this.props.showVaccineModalOnVaccineList(true);
    this.props.setVaccineFieldsToBeEdited(vaccineDetails);
  };
  checkScreenSourceForEditButton = () => {
    const {
      route: {
        params: {source},
      },
    } = this.props;
    if (source === screenSource.OTHER_USER_PROFILE) {
      ModalsQueue.showModal({
        modalId: modalIds.vaccineAcceptRejectPopup,
        showModalFunction: () => {
          this.setState({
            type: vaccineVerifyType.accept,
            showApproveRejectModal: true,
          });
        },
      });
      return;
    }
    this.editVaccineData();
  };
  checkScreenSourceForDeleteButton = () => {
    const {
      route: {
        params: {source},
      },
    } = this.props;
    if (source === screenSource.OTHER_USER_PROFILE) {
      this.setState({
        showModal: true,
      });
      return;
    }
    this.removeVaccine();
  };
  checkRejectionType = () => {
    const {
      vaccineDetails: {denyReason},
    } = this.props;
    if (denyReason === RejectionTypes.illegibleDocument) {
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
    const {
      route: {
        params: {source},
      },
    } = this.props;
    if (source !== screenSource.OTHER_USER_PROFILE && !isVerified) {
      return (
        <>
          <CButtonWithImage
            accessibilityLabel={testIds.editVaccineDetails}
            testID={testIds.editVaccineDetails}
            buttonContainerStyle={Style.editButton}
            text={translate('VACCINE_SCREEN.EDIT')}
            textStyle={Style.editButtonText}
            imagePath={LOCAL_PATH.editGrey}
            customeImageStyle={Style.editImageStyle}
            onPress={this.checkScreenSourceForEditButton}
          />
          <CButtonWithImage
            accessibilityLabel={testIds.deleteVaccine}
            buttonContainerStyle={Style.deleteButton}
            text={translate('VACCINE_SCREEN.DELETE')}
            textStyle={Style.deleteBtnTxt}
            imagePath={LOCAL_PATH.trashRed}
            customeImageStyle={Style.deleteImageStyle}
            onPress={this.checkScreenSourceForDeleteButton}
          />
        </>
      );
    }
    if (source === screenSource.OTHER_USER_PROFILE) {
      return (
        <>
          <CButtonWithImage
            accessibilityLabel={testIds.editVaccineDetails}
            buttonContainerStyle={Style.approveButton}
            text={translate('STRINGS.VERIFY')}
            textStyle={Style.approveButtonText}
            onPress={this.checkScreenSourceForEditButton}
          />
          <CButtonWithImage
            accessibilityLabel={testIds.deleteVaccine}
            buttonContainerStyle={Style.deleteButton}
            text={translate('VACCINE_SCREEN.DENY')}
            textStyle={Style.denyBtnTxt}
            onPress={this.checkScreenSourceForDeleteButton}
          />
        </>
      );
    }
    return null;
  };
  showDenyReasonBlock = () => {
    const {
      vaccineDetails: {denyReason},
      route: {
        params: {source},
      },
    } = this.props;
    let reason = '';
    if (denyReason === RejectionTypes.illegibleDocument) {
      reason = translate('VACCINE_SCREEN.illegibleDocument');
    }
    if (denyReason === RejectionTypes.incorrectData) {
      reason = translate('VACCINE_SCREEN.incorrectDataForVaccine');
    }
    if (denyReason === RejectionTypes.other) {
      reason = translate('VACCINE_SCREEN.otherReason');
    }

    if (denyReason && source !== screenSource.OTHER_USER_PROFILE) {
      return (
        <View style={Style.rejectedData}>
          <CLabel text={reason} style={Style.rejectedDataInfo} />
          {denyReason !== RejectionTypes.other && (
            <CButton
              buttonContainerStyle={Style.uploadNewDocument}
              text={this.checkRejectionType()}
              textStyle={Style.uploadButtonTextStyle}
              onPress={this.checkScreenSourceForEditButton}
            />
          )}

          <CLabel
            text={translate('healthTest.contact')}
            style={Style.contact}
            link={translate('healthTest.customerSupport')}
            url={URLS.TESTED_ME_SUPPORT}
          />
        </View>
      );
    }
  };
  render() {
    const {
      vaccineDetails: {documentUrl, name, id, isVerified},
      deleteVaccine,
      vaccineDetails,
      showVaccineModal,
      reviewVaccine,
      route: {
        params: {id: vaccineId},
      },
    } = this.props;
    const {
      removeVaccineVisible,
      loading,
      showApproveRejectModal,
      type,
    } = this.state;
    return (
      <View style={Style.container}>
        <KeyboardAvoidingView
          style={Style.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Style.keyboardVerticalOffset.top}>
          <ScrollView
            bounces={false}
            alwaysBounceVertical={false}
            contentContainerStyle={Style.contentContainerStyle}
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}>
            <View style={Style.innerContainer}>
              <View style={Style.title}>
                <CLabel
                  style={Style.appTitle}
                  text={translate('VACCINE_SCREEN.VACCINE')}
                />

                {this.showVerifyLbl(isVerified)}
              </View>
              {this.showDenyReasonBlock()}
              <View style={Style.inputContainer}>
                {this.createVaccineDetailFields()}
                <CLabel
                  style={Style.inputLabel}
                  text={translate('VACCINE_SCREEN.TEST_DOCUMENT')}
                />
                <View style={Style.testImageView}>
                  <CImage
                    imagePath={{uri: documentUrl}}
                    imageStyle={Style.testImage}
                    onLoadEnd={() => {
                      this.setState({loading: false});
                    }}
                    resizeMode={'contain'}
                  />
                  <CButtonWithImage
                    onPress={this.handleModal}
                    imagePath={LOCAL_PATH.zoom}
                    buttonContainerStyle={Style.zoom}
                    customeImageStyle={Style.zoomImage}
                    buttonCustomStyle={Style.zoomButton}
                  />
                  {this.state.zoom && (
                    <CZoomImage
                      image={[
                        {
                          url: documentUrl,
                          width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 26,
                          height: LAYOUT_CONSTRAINTS.SCREEN_WIDTH + 26,
                        },
                      ]}
                      closeModal={this.handleModal}
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
              {this.showVerificationBtns(isVerified)}
            </View>
            {removeVaccineVisible && (
              <VaccineRemovePopup
                vaccineName={name}
                vaccineId={id}
                toggleRemoveVaccine={this.removeVaccine}
                deleteVaccine={deleteVaccine}
                goBack={this.popToPreviousScreen}
              />
            )}
            {showVaccineModal &&
              resultsMethods.returnEditableVaccineData(vaccineDetails)}
          </ScrollView>
        </KeyboardAvoidingView>
        {showApproveRejectModal && (
          <VerifyVaccine
            instance={this}
            reviewVaccine={reviewVaccine}
            vaccineId={vaccineId}
            goBack={this.popToPreviousScreen}
            type={type}
          />
        )}
        <RejectionPopUp
          instance={this}
          source={screenSource.VACCINE}
          instanceState={this.state}
          props={this.props}
          reviewVaccine={reviewVaccine}
          vaccineId={vaccineId}
          goBack={this.popToPreviousScreen}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    vaccinations: {
      vaccinationResults,
      loading,
      imageName,
      uploadingImageLoader,
      showVaccineModal,
      vaccineDetails,
    },
    signIn: {token, userID},
    vaccinations,
  } = state;
  return {
    vaccinationResults,
    loading,
    token,
    userID,
    imageName,
    vaccinations,
    uploadingImageLoader,
    showVaccineModal,
    vaccineDetails,
  };
};
const mapDispatchToProps = {
  deleteVaccine: deleteVaccineAction,
  showVaccineModalOnVaccineList: showVaccineModalAction,
  setVaccineFieldsToBeEdited: setVaccineFieldsToBeEditedAction,
  getVaccineDetails: getVaccineDetailsAction,
  reviewVaccine: reviewVaccineAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(VaccineDetails);
