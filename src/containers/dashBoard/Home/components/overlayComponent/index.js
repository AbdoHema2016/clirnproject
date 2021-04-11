import React, {PureComponent} from 'react';
import {View, SafeAreaView, Modal} from 'react-native';
import style from './style';
import CTemparatureUpdateModal from '../../../../health/temperature/addTemperatureModalComponent';
import CFeeling from '../../../../../components/cHowYouFeeling';
import ContactHR from '../../../../../components/ContactHR/';
import CHealthTestContainer from '../../../../health/healthTest/healthTestContainerForProfile';
import ErrorView from '../../../../../components/cMeError';
import CAddRemoveCompany from '../../../Company/addRemoveCompany';
import CLoader from '../../../../../components/cLoader';
import {Constants} from '../../../../../utilities';
import {translate} from '../../../../../Localization';

import {HealthtestMethodsObj, ProfleMethodsObj} from '../../Methods';
import JumioSuccessPopUp from '../../../../Jumio/successPopUp';
import JumioFailurePopUp from '../../../../Jumio/failurePopUp';
import PermmissionUpdate from '../../../EmployerPermissions';
import TestReviewPopup from '../testReviewPoppup';
import VerificationPermissionUpdate from '../../../EmployerPermissions/verificationPopup';
import TestRejected from '../../../../../components/cTestRejected';

const {profileModals} = Constants;

class COverlay extends PureComponent {
  returnPopUp = () => {
    const {
      instance,
      props: {modalIndex},
      instanceState,
      source,
      props,
      hideModal,
    } = this.props;
    if (modalIndex === profileModals.temparatureUpdateModal) {
      return (
        <CTemparatureUpdateModal
          instance={instance}
          props={props}
          source={source}
          showPicker={instanceState.showPicker}
        />
      );
    }
    if (modalIndex === profileModals.feelingUpdateModal) {
      return (
        <CFeeling
          instance={instance}
          props={props}
          hideModal={hideModal}
          source={source}
          showPicker={instanceState.showPicker}
        />
      );
    }
    if (modalIndex === profileModals.contactHR) {
      return (
        <ContactHR
          instance={instance}
          props={props}
          hideModal={hideModal}
          source={source}
        />
      );
    }
    if (modalIndex === profileModals.HealthUpdateModal) {
      return (
        <>
          <Modal visible={instanceState.error}>
            <ErrorView
              style={style.errorContainer}
              errorText={translate('STRINGS.ERROR_CAMERA_HEALTH_TEST')}
              onClose={ProfleMethodsObj.closeError}
            />
          </Modal>
          <CHealthTestContainer
            showPicker={instanceState.showPicker}
            instance={instance}
            pickerSelectedValue={HealthtestMethodsObj.pickerSelectedValue}
          />
        </>
      );
    }
    if (modalIndex === profileModals.JumioSuccess) {
      return <JumioSuccessPopUp />;
    }
    if (modalIndex === profileModals.jumioFailure) {
      return <JumioFailurePopUp />;
    }
    if (modalIndex === profileModals.permissionUpdate) {
      return (
        <PermmissionUpdate
          permissionRemoved={props.permissionsRemoved}
          permissionAdded={props.permissionAdded}
        />
      );
    }
    if (modalIndex === profileModals.companyUpdateModal) {
      return (
        <>
          <CAddRemoveCompany
            props={props}
            showPicker={instanceState.showPicker}
            instance={instance}
            addCompany={true}
            title={translate('notificationCompany.title')}
            reject={translate('STRINGS.REJECT')}
            accept={translate('STRINGS.ACCEPT')}
          />
        </>
      );
    }
    if (modalIndex === profileModals.companyRemoveModal) {
      return (
        <>
          <CAddRemoveCompany
            props={props}
            showPicker={instanceState.showPicker}
            instance={instance}
            addCompany={false}
            title={translate('REMOVE_COMPANY.title')}
            reject={translate('STRINGS.NO')}
            accept={translate('STRINGS.YES')}
          />
        </>
      );
    }
    if (
      modalIndex === profileModals.healthTestApproved ||
      modalIndex === profileModals.vaccineApproved
    ) {
      return <TestReviewPopup props={props} instance={instance} />;
    }
    if (modalIndex === profileModals.verificationPermissionUpdate) {
      return (
        <VerificationPermissionUpdate
          permissionProvidingCompany={props.permissionProvidingCompany}
          instance={instance}
          props={props}
        />
      );
    }
    if (modalIndex === profileModals.rejectTest) {
      return (
        <TestRejected
          props={props}
          instance={instance}
          goToHealthTestDetails={ProfleMethodsObj.gotoHealthTestDetails}
        />
      );
    }
    if (modalIndex === profileModals.vaccineRejected) {
      return (
        <TestRejected
          props={props}
          instance={instance}
          goToVaccineDetails={ProfleMethodsObj.goToVaccineDetails}
        />
      );
    }
  };
  render() {
    const {
      instanceState,
      props: {uploadingHealhtTestImage},
    } = this.props;
    return (
      <SafeAreaView>
        <View style={[style.modalContainer]}>
          <Modal
            style={style.modal}
            animationType="slide"
            transparent={true}
            visible={instanceState.showModal}>
            <View style={style.dataContainer}>
              {this.returnPopUp()}
              <CLoader loading={uploadingHealhtTestImage} />
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    );
  }
}
export default COverlay;
