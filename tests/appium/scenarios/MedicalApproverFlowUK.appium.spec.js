import {testIds} from '../../../src/Constants';
import GetElement from '../helpers/getElement';
export default (driver) => {
  test('Medical Approver UK Flow', async () => {
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
    const btnUK = await GetElement(
      driver,
      testIds.btnMedicalApproverUKLocation,
    );
    btnUK.click();

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

    const txtFieldGMC = await GetElement(
      driver,
      testIds.txtFieldUKMedicalApproverGMC,
    );
    txtFieldGMC.sendKeys('1234567');

    const checkBoxTerms = await GetElement(
      driver,
      testIds.medicalApproverCheckBox,
    );
    checkBoxTerms.click();
    checkBoxTerms.click();

    await GetElement(driver, testIds.btnConfirmMedicalApprover);
  });
};
