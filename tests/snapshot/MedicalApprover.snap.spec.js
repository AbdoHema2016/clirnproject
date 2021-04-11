import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import store from '../../src/store';
import MedicalApproverContent from '../../src/containers/dashBoard/MedicalApprover/MedicalContentComponent';
import {MedicalApproverObj} from '../../src/containers/dashBoard/MedicalApprover/Methods';
import {Constants} from '../../src/utilities';
const {medicalApproverSteps} = Constants;
describe('Medical Approver screen', () => {
  const instance = {
    state: {
      termsChecked: true,
      medicalProfessionalTitle: 'Dr.who',
      GMCNumber: '1234567',
      licenseNum: '1234567',
    },
  };
  const props = {
    navigation: {
      setOptions: jest.fn(),
    },
  };
  MedicalApproverObj.setInstance(instance);

  it('Snapshot wait for Identity verification success', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MedicalApproverContent
            {...props}
            step={medicalApproverSteps.waitForJumioValidation}
          />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Snapshot trigger medical approver request flow', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MedicalApproverContent
            {...props}
            step={medicalApproverSteps.triggerMedicalApprovalRequest}
          />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Snapshot choose Location', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MedicalApproverContent
            {...props}
            step={medicalApproverSteps.chooseLocation}
          />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Snapshot UK Location', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MedicalApproverContent
            {...props}
            locationConfirmed={true}
            unitedKingdom={true}
            step={medicalApproverSteps.addMedicalApproverMedicalIdData}
          />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Snapshot US Location', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MedicalApproverContent
            {...props}
            locationConfirmed={true}
            unitedStates={true}
            step={medicalApproverSteps.addMedicalApproverMedicalIdData}
          />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Snapshot Other Location', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <MedicalApproverContent
            {...props}
            locationConfirmed={true}
            other={true}
            step={medicalApproverSteps.addMedicalApproverMedicalIdData}
          />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('Snapshot GMC no. not valid', () => {
    MedicalApproverObj.setInstance({
      state: {
        medicalProfessionalTitle: 'DR.',
        GMCNumber: '1234567',
        termsChecked: true,
        locationConfirmed: true,
        unitedKingdom: true,
        step: medicalApproverSteps.addMedicalApproverMedicalIdData,
        GMCError: true,
      },
    });
    const tree = renderer
      .create(
        <Provider store={store}>
          <MedicalApproverContent
            {...props}
            locationConfirmed={true}
            unitedKingdom={true}
            step={medicalApproverSteps.addMedicalApproverMedicalIdData}
            GMCError={true}
          />
        </Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
