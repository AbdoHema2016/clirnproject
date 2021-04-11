import {testIds} from '../../../src/Constants';
import getElement from '../helpers/getElement';
import scrollDown from '../helpers/scrollDown';
import pickMenuItem from '../helpers/pickMenuItem';
export default (driver, platform) => {
  test('Edit Vaccine details', async () => {
    const settingsTabBtn = await getElement(driver, testIds.settingsTab);

    await settingsTabBtn.click();

    const vaccinationResults = await getElement(
      driver,
      testIds.vaccinationResults,
    );
    await vaccinationResults.click();
    const goToVaccine = await getElement(driver, testIds.vaccine + 0, 8000);
    await goToVaccine.click();
    scrollDown(driver);

    await driver.waitForElementByAccessibilityId(
      testIds.editVaccineDetails,
      8000,
    );
    scrollDown(driver);
    const editVaccine = await getElement(driver, testIds.editVaccineDetails);
    await editVaccine.click();

    const name = await getElement(driver, testIds.vaccineName);
    await name.click();
    await pickMenuItem(driver, platform);
    const saveBtn = await getElement(driver, testIds.continue);
    saveBtn.click();
  });
};
