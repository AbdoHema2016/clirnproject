import {testIds} from '../../../src/Constants';
import getElement from '../helpers/getElement';
import scrollDown from '../helpers/scrollDown';
import pickMenuItem from '../helpers/pickMenuItem';
export default (driver, platform) => {
  test('Temperature addition from notification', async () => {
    const notificationTabBtn = await getElement(
      driver,
      testIds.notificationTab,
    );
    await notificationTabBtn.click();
    const Feeling = await getElement(
      driver,
      testIds.notificationHealthTest,
      15000,
    );
    Feeling.click();

    const skipFeeling = await getElement(driver, testIds.skipFeeling);
    await skipFeeling.click();

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

    const profileTabBtn = await getElement(driver, testIds.profileTab);
    await profileTabBtn.click();

    await getElement(driver, testIds.addTestBtn);
    await scrollDown(driver);
    await getElement(driver, testIds.addTemperatureButton);
  });
};
