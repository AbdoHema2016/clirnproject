import {testIds} from '../../../src/Constants';
import getElement from '../helpers/getElement';
import scrollDown from '../helpers/scrollDown';
export default (driver) => {
  test('Temperature Toggle Share renders', async () => {
    await scrollDown(driver);
    const addNewBtn = await getElement(driver, testIds.addTemperatureButton);
    addNewBtn.click();
    const skipFeeling = await getElement(driver, testIds.skipFeeling);
    skipFeeling.click();
    const continueTemperatureAdd = await getElement(
      driver,
      testIds.continueTemperatureAdd,
    );
    continueTemperatureAdd.click();
    const temperatureSwitch = await getElement(
      driver,
      testIds.temperatureSwitch,
    );
    temperatureSwitch.click();
  });
};
