import React from 'react';

import MedicalApprover from '../../../../src/containers/dashBoard/MedicalApprover';
import CButton from '../../../../src/components/cButton';
import {MedicalApproverObj} from '../../../../src/containers/dashBoard/MedicalApprover/Methods';
import {Constants} from '../../../../src/utilities';
import {translate} from '../../../../src/Localization';

const {MedicalApproverLocationIds} = Constants;
jest.mock('../../../../src/containers/dashBoard/MedicalApprover', () =>
  jest.fn(),
);

MedicalApprover.mockImplementation((state) => {
  const MedicalApproverInstance = Object.create(MedicalApprover.prototype);
  MedicalApproverInstance.state = state;
  MedicalApproverInstance.setState = (newState) => {
    MedicalApproverInstance.state = newState;
  };
  return MedicalApproverInstance;
});

describe('Medical Approver trigger', () => {
  const medicalApprover = new MedicalApprover();
  it('should change step state to 1', () => {
    let ButtonComponent = (
      <CButton onPress={(state) => medicalApprover.setState(state)} />
    );
    ButtonComponent.props.onPress({step: 1});
    expect(medicalApprover.state).toEqual({step: 1});
  });

  it('should choose UK Location', () => {
    MedicalApproverObj.setInstance(medicalApprover);
    MedicalApproverObj.chooseLocation(MedicalApproverLocationIds.unitedKingdom);
    const UKCountryChosen = {
      other: false,
      unitedKingdom: true,
      unitedStates: false,
      chosenLocation:
        '[missing "en.MEDICAL_APPROVER.UNITED_KINGDOM" translation]',
    };
    expect(medicalApprover.state).toEqual(UKCountryChosen);
  });
  it('should choose US Location', () => {
    MedicalApproverObj.setInstance(medicalApprover);
    MedicalApproverObj.chooseLocation(MedicalApproverLocationIds.unitedStates);
    const USCountryChosen = {
      other: false,
      unitedKingdom: false,
      unitedStates: true,
      chosenLocation:
        '[missing "en.MEDICAL_APPROVER.UNITED_STATES" translation]',
    };
    expect(medicalApprover.state).toEqual(USCountryChosen);
  });

  it('should choose Other Location', () => {
    MedicalApproverObj.setInstance(medicalApprover);
    MedicalApproverObj.chooseLocation(MedicalApproverLocationIds.other);
    const otherLocationChosen = {
      other: true,
      unitedKingdom: false,
      unitedStates: false,
      chosenLocation:
        '[missing "en.MEDICAL_APPROVER.OTHER_LOCATION" translation]',
    };
    expect(medicalApprover.state).toEqual(otherLocationChosen);
  });

  it('should enable confirm location button', () => {
    medicalApprover.setState({
      other: true,
      unitedKingdom: false,
      unitedStates: false,
    });
    MedicalApproverObj.setInstance(medicalApprover);
    const enabled = MedicalApproverObj.isLocationConfirmed();
    expect(enabled).toEqual(true);
  });
  it('should disable confirm location button', () => {
    medicalApprover.setState({
      other: false,
      unitedKingdom: false,
      unitedStates: false,
    });
    MedicalApproverObj.setInstance(medicalApprover);
    const enabled = MedicalApproverObj.isLocationConfirmed();
    expect(enabled).toEqual(false);
  });

  it('should toggle terms and conditions Acceptance', () => {
    const checkedCheckBox = {
      termsChecked: true,
    };
    const unCheckedCheckBox = {
      termsChecked: false,
    };
    MedicalApproverObj.setInstance(medicalApprover);
    MedicalApproverObj.toggleTermsAcceptance();
    expect(medicalApprover.state).toEqual(checkedCheckBox);
    MedicalApproverObj.toggleTermsAcceptance();
    expect(medicalApprover.state).toEqual(unCheckedCheckBox);
  });

  it('should enable confirm & submit Vaccine approver UK data (title,GMC no. and terms)', () => {
    const medicalProfessionalData = {
      medicalProfessionalTitle: 'Dr.who',
      GMCNumber: '1234567',
      termsChecked: true,
    };
    medicalApprover.setState(medicalProfessionalData);
    MedicalApproverObj.setInstance(medicalApprover);
    const enabled = MedicalApproverObj.isUKApproverDataComplete();
    expect(enabled).toEqual(true);
  });
  it('should disable confirm & submit Vaccine approver UK data (title:empty,GMC no. and terms)', () => {
    const medicalProfessionalData = {
      medicalProfessionalTitle: ' ',
      GMCNumber: '1234567',
      termsChecked: true,
    };
    medicalApprover.setState(medicalProfessionalData);
    MedicalApproverObj.setInstance(medicalApprover);
    const enabled = MedicalApproverObj.isUKApproverDataComplete();
    expect(enabled).toEqual('');
  });
  it('should disable confirm & submit Vaccine approver UK data (title,GMC no.:empty and terms)', () => {
    const medicalProfessionalData = {
      medicalProfessionalTitle: 'Dr.who',
      GMCNumber: ' ',
      termsChecked: true,
    };
    medicalApprover.setState(medicalProfessionalData);
    MedicalApproverObj.setInstance(medicalApprover);
    const enabled = MedicalApproverObj.isUKApproverDataComplete();
    expect(enabled).toEqual('');
  });
  it('should disable confirm & submit Vaccine approver UK data (title,GMC no. and terms:false)', () => {
    const medicalProfessionalData = {
      medicalProfessionalTitle: 'Dr.who',
      GMCNumber: '1234567',
      termsChecked: false,
    };
    medicalApprover.setState(medicalProfessionalData);
    MedicalApproverObj.setInstance(medicalApprover);
    const enabled = MedicalApproverObj.isUKApproverDataComplete();
    expect(enabled).toEqual(false);
  });
  it('should validate UK Vaccine approver GMC data', () => {
    medicalApprover.setState({
      GMCNumber: '123456',
    });
    MedicalApproverObj.setInstance(medicalApprover);
    MedicalApproverObj.confirmSubmitUK();
    expect(medicalApprover.state).toEqual({
      GMCError: true,
    });
  });
  it('should enable confirm & submit Vaccine approver USA data (title,License no. and State, terms)', () => {
    const medicalProfessionalData = {
      medicalProfessionalTitle: 'Dr.who',
      licenseNum: '1234567',
      USState: translate('MEDICAL_APPROVER.FIRST_STATE'),
      termsChecked: true,
    };
    medicalApprover.setState(medicalProfessionalData);
    MedicalApproverObj.setInstance(medicalApprover);
    const enabled = MedicalApproverObj.isUSApproverDataComplete();
    expect(enabled).toEqual(true);
  });
  it('should disable confirm & submit Vaccine approver USA data (title,License no. and State,terms:false)', () => {
    const medicalProfessionalData = {
      medicalProfessionalTitle: 'Dr.who',
      licenseNum: '1234567',
      USState: translate('MEDICAL_APPROVER.FIRST_STATE'),
      termsChecked: false,
    };
    medicalApprover.setState(medicalProfessionalData);
    MedicalApproverObj.setInstance(medicalApprover);
    const enabled = MedicalApproverObj.isUSApproverDataComplete();
    expect(enabled).toEqual(false);
  });
  it('should disable confirm & submit Vaccine approver USA data (title:empty,License no. and State,terms)', () => {
    const medicalProfessionalData = {
      medicalProfessionalTitle: ' ',
      licenseNum: '1234567',
      USState: translate('MEDICAL_APPROVER.FIRST_STATE'),
      termsChecked: true,
    };
    medicalApprover.setState(medicalProfessionalData);
    MedicalApproverObj.setInstance(medicalApprover);
    const enabled = MedicalApproverObj.isUSApproverDataComplete();
    expect(enabled).toEqual('');
  });
  it('should disable confirm & submit Vaccine approver USA data (title,License no.:empty and State,terms)', () => {
    const medicalProfessionalData = {
      medicalProfessionalTitle: 'Dr.who',
      licenseNum: ' ',
      USState: translate('MEDICAL_APPROVER.FIRST_STATE'),
      termsChecked: true,
    };
    medicalApprover.setState(medicalProfessionalData);
    MedicalApproverObj.setInstance(medicalApprover);
    const enabled = MedicalApproverObj.isUSApproverDataComplete();
    expect(enabled).toEqual('');
  });
  it('should disable confirm & submit Vaccine approver USA data (title,License no. and State:empty,terms)', () => {
    const medicalProfessionalData = {
      medicalProfessionalTitle: 'Dr.who',
      licenseNum: '1234567',
      USState: translate('MEDICAL_APPROVER.STATE_PLACEHOLDER'),
      termsChecked: true,
    };
    medicalApprover.setState(medicalProfessionalData);
    MedicalApproverObj.setInstance(medicalApprover);
    const enabled = MedicalApproverObj.isUSApproverDataComplete();
    expect(enabled).toEqual(false);
  });
});
