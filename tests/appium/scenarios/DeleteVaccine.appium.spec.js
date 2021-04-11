import {testIds} from '../../../src/Constants';
import getElement from '../helpers/getElement';
import scrollDown from '../helpers/scrollDown';
export default (driver) => {
  test('Delete Vaccine', async () => {
    const settingsTabBtn = await getElement(driver, testIds.settingsTab);
    await settingsTabBtn.click();

    const vaccinationResults = await getElement(
      driver,
      testIds.vaccinationResults,
    );
    await vaccinationResults.click();
    const goToVaccine = await getElement(driver, testIds.vaccine + 0);
    await goToVaccine.click();
    await scrollDown(driver);
    await scrollDown(driver);

    const deleteVaccine = await getElement(driver, testIds.deleteVaccine);
    await deleteVaccine.click();
    const confirmDeleteVaccine = await getElement(
      driver,
      testIds.confirmDeleteVaccine,
    );
    await confirmDeleteVaccine.click();
  });
};
