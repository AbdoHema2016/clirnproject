import React from 'react';
import {View, Text, ScrollView, Platform} from 'react-native';
import CButton from '../../../components/cButton';
import CImage from '../../../components/cImage';
import CChecBox from '../../../components/cCheckBox';
import CLabel from '../../../components/cLabel';
import {Constants, getTestIdentifiers} from '../../../utilities';
import {translate} from '../../../Localization';

import {Style} from './style';
import {MedicalApproverObj} from './Methods';
import {JumioFlowMethodsObj} from '../../Jumio/verificationFlowMethods';
import CTextField from '../../../components/cTextField';
import CButtonWithImage from '../../../components/cButtonWithImage';
import CPicker from '../../../components/cPicker';

import {USStates} from './USStates';

const {
  testIds,
  LOCAL_PATH,
  MedicalApproverLocationIds,
  URLS,
  medicalApproverSteps,
} = Constants;

const MedicalApproverContent = ({
  step,
  termsChecked,
  unitedKingdom,
  unitedStates,
  other,
  approved,
  idValidated,
  locationConfirmed,
  GMCError,
  USState,
  setPickerVisible,
  setUSState,
}) => {
  if (approved) {
    return (
      <>
        <CLabel
          style={Style.txtCongrats}
          text={translate('MEDICAL_APPROVER.CONGRATULATIONS')}
          link={translate('MEDICAL_APPROVER.KNOWLEDGE_BASE')}
          url={URLS.TESTED_ME_SUPPORT}
        />

        <CImage
          testID={testIds.imgCongratsMedicalApprover}
          imagePath={LOCAL_PATH.permissionUpdate}
          imageStyle={Style.imgCongrats}
        />
      </>
    );
  }
  if (!idValidated && step === medicalApproverSteps.jumioValidationNeeded) {
    return (
      <>
        <CLabel
          style={Style.txtVerifyIdentity}
          text={translate('MEDICAL_APPROVER.MSG_VERIFY_IDENTITY')}
        />

        <CImage
          testID={testIds.imgCongratsMedicalApprover}
          imagePath={LOCAL_PATH.shareId}
          imageStyle={Style.imgCongrats}
        />
        <CButton
          buttonContainerStyle={Style.btnVerifyIdentity}
          text={translate('MEDICAL_APPROVER.BTN_VERIFY_IDENTITY')}
          textStyle={Style.txtBtnVerifyIdentity}
          onPress={JumioFlowMethodsObj.startJumio}
        />
      </>
    );
  }
  if (step === medicalApproverSteps.waitForJumioValidation) {
    return (
      <>
        <CLabel
          style={Style.txtVerifyIdentity}
          text={translate('MEDICAL_APPROVER.PLEASE_WAIT_VERIFY')}
        />

        <CImage
          testID={testIds.imgCongratsMedicalApprover}
          imagePath={LOCAL_PATH.scanIdFail}
          imageStyle={Style.imgCongrats}
        />
      </>
    );
  }
  if (step === medicalApproverSteps.triggerMedicalApprovalRequest) {
    return (
      <>
        <CLabel
          style={Style.txtTriggerMedicalApproval}
          text={translate('MEDICAL_APPROVER.TRIGGER_VACCINE_APPROVAL')}
        />
        <CButton
          testID={testIds.triggerMedicalApproverFlow}
          accessibilityLabel={testIds.triggerMedicalApproverFlow}
          buttonContainerStyle={Style.btnBecomeVerifier}
          text={translate('MEDICAL_APPROVER.BECOME_VERIFIER_BTN')}
          textStyle={Style.txtBtnBecomeVerifier}
          onPress={() => MedicalApproverObj.triggerMedicalApproverFlow()}
        />
      </>
    );
  }
  if (step === medicalApproverSteps.chooseLocation) {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={Style.txtContainerRole}>
          <Text style={Style.txtRole}>
            {translate('MEDICAL_APPROVER.WISH_TO_BECOME')}
          </Text>
          <Text style={Style.txtTestedMe}>
            {translate('MEDICAL_APPROVER.TESTED_ME')}
          </Text>
          <Text style={Style.txtRole}>
            {translate('MEDICAL_APPROVER.MEDICAL_APPROVER')}
          </Text>
        </Text>
        <Text style={Style.txtChooseRole}>
          {translate('MEDICAL_APPROVER.CHOOSE_LOCATION')}
        </Text>
        <CButton
          {...getTestIdentifiers(testIds.btnMedicalApproverUKLocation)}
          buttonContainerStyle={
            unitedKingdom ? Style.btnLocationChosen : Style.btnLocation
          }
          text={translate('MEDICAL_APPROVER.UNITED_KINGDOM')}
          textStyle={Style.txtBtnLocation}
          onPress={() =>
            MedicalApproverObj.chooseLocation(
              MedicalApproverLocationIds.unitedKingdom,
            )
          }
        />
        <CButton
          {...getTestIdentifiers(testIds.btnMedicalApproverUSLocation)}
          buttonContainerStyle={
            unitedStates ? Style.btnLocationChosen : Style.btnLocation
          }
          text={translate('MEDICAL_APPROVER.UNITED_STATES')}
          textStyle={Style.txtBtnLocation}
          onPress={() =>
            MedicalApproverObj.chooseLocation(
              MedicalApproverLocationIds.unitedStates,
            )
          }
        />
        <CButton
          buttonContainerStyle={
            other ? Style.btnLocationChosen : Style.btnLocation
          }
          text={translate('MEDICAL_APPROVER.OTHER_LOCATION')}
          textStyle={Style.txtBtnLocation}
          onPress={() =>
            MedicalApproverObj.chooseLocation(MedicalApproverLocationIds.other)
          }
        />
        <CButton
          {...getTestIdentifiers(testIds.btnConfirmMedicalApproverLocation)}
          disabled={!MedicalApproverObj.isLocationConfirmed()}
          buttonContainerStyle={
            MedicalApproverObj.isLocationConfirmed()
              ? Style.btnConfirmEnabled
              : Style.btnConfirmDisabled
          }
          text={translate('MEDICAL_APPROVER.CONFIRM_SUBMIT')}
          textStyle={Style.txtBtnConfirm}
          onPress={MedicalApproverObj.confirmLocation}
        />
      </ScrollView>
    );
  }
  if (
    locationConfirmed &&
    unitedKingdom &&
    step === medicalApproverSteps.addMedicalApproverMedicalIdData
  ) {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <CLabel
          style={Style.txtVerifyIdentity}
          text={translate('MEDICAL_APPROVER.ENTER_VALID_GMC')}
        />
        <CLabel
          style={Style.medicalProfessionalTitle}
          text={translate('MEDICAL_APPROVER.MEDICAL_PROFESSIONAL_TITLE')}
        />
        <CTextField
          {...getTestIdentifiers(testIds.txtFieldMedicalApproverTitle)}
          returnKeyType={'next'}
          placeHolderText={translate(
            'MEDICAL_APPROVER.MEDICAL_PROFESSIONAL_TITLE_PLACEHOLDER',
          )}
          containerStyle={Style.inputTextsupreContainerStyle}
          onChangeText={MedicalApproverObj.setTitle}
        />

        <CLabel
          style={Style.medicalProfessionalTitle}
          text={translate('MEDICAL_APPROVER.GMC_NUMBER')}
        />
        <CTextField
          {...getTestIdentifiers(testIds.txtFieldUKMedicalApproverGMC)}
          maxLength={7}
          placeHolderText={translate('MEDICAL_APPROVER.GMC_NUMBER_PLACEHOLDER')}
          containerStyle={Style.inputTextsupreContainerStyle}
          onChangeText={MedicalApproverObj.setGMC_number}
          error={GMCError}
          errorMessage={translate('MEDICAL_APPROVER.GMC_NUMBER_ERROR')}
          errorImage={LOCAL_PATH.xCircle}
          errorImageStyle={Style.errorImageStyle}
          errorMsgContainer={Style.errorMsgContainer}
        />
        <View style={Style.containerTermsContainer}>
          <CChecBox
            {...getTestIdentifiers(testIds.medicalApproverCheckBox)}
            state={termsChecked}
            onPress={MedicalApproverObj.toggleTermsAcceptance}
            imagePath={
              termsChecked
                ? LOCAL_PATH.PRIVACY_POLICY_CHECKED_ICON
                : LOCAL_PATH.BLANK_CHECK_BOX_ICON
            }
          />
          <Text style={Style.containerTxtAgree}>
            <CLabel
              style={Style.txtAgree}
              text={translate('MEDICAL_APPROVER.AGREE_WITH')}
            />

            <CLabel
              style={Style.txtTermsConditions}
              text={translate('MEDICAL_APPROVER.TERMS_CONDITIONS')}
              onPress={MedicalApproverObj.openTermsLink}
            />
          </Text>
        </View>
        <CButton
          {...getTestIdentifiers(testIds.btnConfirmMedicalApprover)}
          disabled={!MedicalApproverObj.isUKApproverDataComplete()}
          buttonContainerStyle={
            MedicalApproverObj.isUKApproverDataComplete()
              ? Style.btnConfirmEnabled
              : Style.btnConfirmDisabled
          }
          text={translate('MEDICAL_APPROVER.CONFIRM_SUBMIT')}
          textStyle={Style.txtBtnConfirm}
          onPress={MedicalApproverObj.confirmSubmitUK}
        />
      </ScrollView>
    );
  }
  if (
    locationConfirmed &&
    unitedStates &&
    step === medicalApproverSteps.addMedicalApproverMedicalIdData
  ) {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <CLabel
          style={Style.txtVerifyIdentity}
          text={translate('MEDICAL_APPROVER.ENTER_VALID_LICENSE')}
        />
        <CLabel
          style={Style.medicalProfessionalTitle}
          text={translate('MEDICAL_APPROVER.MEDICAL_PROFESSIONAL_TITLE')}
        />
        <CTextField
          {...getTestIdentifiers(testIds.txtFieldMedicalApproverTitle)}
          returnKeyType={'next'}
          placeHolderText={translate(
            'MEDICAL_APPROVER.MEDICAL_PROFESSIONAL_TITLE_PLACEHOLDER',
          )}
          containerStyle={Style.inputTextsupreContainerStyle}
          onChangeText={MedicalApproverObj.setTitle}
        />

        <CLabel
          style={Style.medicalProfessionalTitle}
          text={translate('MEDICAL_APPROVER.LICENSE_NUMBER')}
        />
        <CTextField
          {...getTestIdentifiers(testIds.txtFieldMedicalApproverLicense)}
          placeHolderText={translate(
            'MEDICAL_APPROVER.LICENSE_NUMBER_PLACEHOLDER',
          )}
          containerStyle={Style.inputTextsupreContainerStyle}
          onChangeText={MedicalApproverObj.setLicenseNum}
        />
        <CLabel
          style={Style.medicalProfessionalTitle}
          text={translate('MEDICAL_APPROVER.STATE')}
        />
        {Platform.OS === 'ios' ? (
          <CButtonWithImage
            {...getTestIdentifiers(testIds.pickerMedicalApproverState)}
            text={USState}
            textStyle={
              USState === translate('MEDICAL_APPROVER.STATE_PLACEHOLDER')
                ? Style.dropDownTextStyle
                : Style.dropDownSelectedTextStyle
            }
            imagePath={LOCAL_PATH.DROP_DOWN_ICON}
            buttonContainerStyle={Style.selectReason}
            buttonCustomStyle={Style.binButton}
            customeImageStyle={Style.dropDown}
            onPress={() => {
              setPickerVisible(true);
            }}
          />
        ) : (
          <CPicker
            {...getTestIdentifiers(testIds.pickerMedicalApproverState)}
            androidPickerContainer={Style.selectReason}
            androidPicker={Style.androidDropDown}
            selectedValue={USState}
            setTitle={(USStateValue) => setUSState(USStateValue)}
            showDatePicker={setPickerVisible}
            pickerItems={USStates}
            imagePath={LOCAL_PATH.DROP_DOWN_ICON}
          />
        )}
        <View style={Style.containerTermsContainer}>
          <CChecBox
            {...getTestIdentifiers(testIds.medicalApproverCheckBox)}
            state={termsChecked}
            onPress={MedicalApproverObj.toggleTermsAcceptance}
            imagePath={
              termsChecked
                ? LOCAL_PATH.PRIVACY_POLICY_CHECKED_ICON
                : LOCAL_PATH.BLANK_CHECK_BOX_ICON
            }
          />
          <Text style={Style.containerTxtAgree}>
            <CLabel
              style={Style.txtAgree}
              text={translate('MEDICAL_APPROVER.AGREE_WITH')}
            />

            <CLabel
              style={Style.txtTermsConditions}
              text={translate('MEDICAL_APPROVER.TERMS_CONDITIONS')}
              onPress={MedicalApproverObj.openTermsLink}
            />
          </Text>
        </View>
        <CButton
          {...getTestIdentifiers(testIds.btnConfirmMedicalApprover)}
          disabled={!MedicalApproverObj.isUSApproverDataComplete()}
          buttonContainerStyle={
            MedicalApproverObj.isUSApproverDataComplete()
              ? Style.btnConfirmEnabled
              : Style.btnConfirmDisabled
          }
          text={translate('MEDICAL_APPROVER.CONFIRM_SUBMIT')}
          textStyle={Style.txtBtnConfirm}
          onPress={MedicalApproverObj.confirmSubmitUS}
        />
      </ScrollView>
    );
  }
  if (
    locationConfirmed &&
    other &&
    step === medicalApproverSteps.addMedicalApproverMedicalIdData
  ) {
    return (
      <>
        <CLabel
          style={Style.txtVerifyIdentity}
          text={translate('MEDICAL_APPROVER.FUNCTIONALITY_NOT_AVAILABLE')}
        />

        <CImage
          testID={testIds.imgCongratsMedicalApprover}
          imagePath={LOCAL_PATH.scanIdFail}
          imageStyle={Style.imgCongrats}
        />
      </>
    );
  }
  return (
    <>
      <CLabel
        style={Style.txtTriggerMedicalApproval}
        text={translate('MEDICAL_APPROVER.TRIGGER_VACCINE_APPROVAL')}
      />
      <CButton
        {...getTestIdentifiers(testIds.triggerMedicalApproverFlow)}
        buttonContainerStyle={Style.btnBecomeVerifier}
        text={translate('MEDICAL_APPROVER.BECOME_VERIFIER_BTN')}
        textStyle={Style.txtBtnBecomeVerifier}
        onPress={() => MedicalApproverObj.triggerMedicalApproverFlow()}
      />
    </>
  );
};
export default MedicalApproverContent;
