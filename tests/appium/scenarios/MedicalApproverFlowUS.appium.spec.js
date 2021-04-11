import {testIds} from '../../../src/Constants';
import GetElement from '../helpers/getElement';
import pickMenuItem from '../helpers/pickMenuItem';
export default (driver, platform) => {
  test('Medical Approver US Flow', async () => {
    const settingsTabBtn = await GetElement(driver, testIds.settingsTab);
    await settingsTabBtn.click();
    const medicalApproverBtn = await GetElement(
      driver,
      testIds.medicalApproverSettings,
    );
    medicalApproverBtn.click();
    const triggerMedicalApproverFlow = await GetElement(
      driver,
      testIds.triggerMedicalApproverFlow,
    );
    triggerMedicalApproverFlow.click();
    const btnUS = await GetElement(
      driver,
      testIds.btnMedicalApproverUSLocation,
    );
    btnUS.click();

    const btnConfirmLocation = await GetElement(
      driver,
      testIds.btnConfirmMedicalApproverLocation,
    );
    btnConfirmLocation.click();

    const txtFieldTitle = await GetElement(
      driver,
      testIds.txtFieldMedicalApproverTitle,
    );
    txtFieldTitle.sendKeys('Dr.Who');

    const txtFieldLicense = await GetElement(
      driver,
      testIds.txtFieldMedicalApproverLicense,
    );
    txtFieldLicense.sendKeys('1234567');

    const pickerApproverState = await GetElement(
      driver,
      testIds.pickerMedicalApproverState,
    );
    pickerApproverState.click();
    await pickMenuItem(driver, platform);
    const checkBoxTerms = await GetElement(
      driver,
      testIds.medicalApproverCheckBox,
    );
    checkBoxTerms.click();

    await GetElement(driver, testIds.btnConfirmMedicalApprover);
  });
};
