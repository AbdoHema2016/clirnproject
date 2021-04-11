import {testIds} from '../../../src/Constants';
import wd from 'wd';
import getElement from '../helpers/getElement';
import pickImage from '../helpers/pickImage';
import pickDate from '../helpers/pickDate';
import pickMenuItem from '../helpers/pickMenuItem';
export default (driver, platform) => {
  const action = new wd.TouchAction(driver);
  const action2 = new wd.TouchAction(driver);

  test('Vaccine Addition', async () => {
    const settingsTabBtn = await getElement(driver, testIds.settingsTab);
    await settingsTabBtn.click();

    const vaccinationResults = await getElement(
      driver,
      testIds.vaccinationResults,
    );
    await vaccinationResults.click();
    const addVaccine = await getElement(driver, testIds.addNewVaccine);
    await addVaccine.click();

    const name = await getElement(driver, testIds.vaccineName, 10000);
    await name.click();
    await pickMenuItem(driver, platform);

    const centre = await getElement(driver, testIds.vaccineCentre);
    await centre.sendKeys('PGI');

    const date = await getElement(driver, testIds.vaccineDate);
    await date.click();
    pickDate(driver, platform);

    const expiryDate = await getElement(driver, testIds.vaccineExpirationDate);
    await expiryDate.click();
    await action2.perform();
    pickDate(driver, platform);
    const upload = await getElement(driver, testIds.imagePicker);
    await action
      .press({x: 50, y: 567})
      .wait(100)
      .moveTo({x: 50, y: 10})
      .release();
    await action.perform();

    upload.click();

    await pickImage(driver, platform);
    const saveBtn = await getElement(driver, testIds.continue);
    saveBtn.click();
  });
};
