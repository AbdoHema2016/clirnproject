import {testIds} from '../../../src/Constants';
import getElement from '../helpers/getElement';
import pickMenuItem from '../helpers/pickMenuItem';
export default (driver, platform) => {
  test('Temperature results', async () => {
    const settingsTabBtn = await getElement(driver, testIds.settingsTab);
    await settingsTabBtn.click();
    await driver.waitForElementByAccessibilityId(
      testIds.temperatureResults,
      3000,
    );
    const temperatureResults = await getElement(
      driver,
      testIds.temperatureResults,
    );
    await temperatureResults.click();

    const addNew = await getElement(driver, testIds.addNew);
    await addNew.click();

    const feeling = await getElement(driver, testIds.feelingThree, 8000);
    await feeling.click();
    const continueToTemp = await getElement(driver, testIds.continue);
    await continueToTemp.click();

    const temperaturePickerInt = await getElement(
      driver,
      testIds.temperaturePickerInt,
    );
    await temperaturePickerInt.click();
    await pickMenuItem(driver, platform);

    const continueTemperatureAdd = await getElement(
      driver,
      testIds.continueTemperatureAdd,
    );
    await continueTemperatureAdd.click();

    const closeHRPopUp = await getElement(driver, testIds.closeHRPopUp, 15000);
    closeHRPopUp.click();
  });
};
