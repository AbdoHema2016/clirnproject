import {testIds} from '../../../src/Constants';

import getElement from '../helpers/getElement';
import scrollDown from '../helpers/scrollDown';
export default (driver) => {
  test('HR POP UP', async () => {
    await scrollDown(driver);
    const addNewBtn = await getElement(driver, testIds.addTemperatureButton);
    addNewBtn.click();

    const FeelingThree = await getElement(driver, testIds.feelingThree);
    FeelingThree.click();
    const Continue = await getElement(driver, testIds.continue);
    Continue.click();

    const continueTemperatureAdd = await getElement(
      driver,
      testIds.continueTemperatureAdd,
    );
    continueTemperatureAdd.click();

    const closeHRPopUp = await getElement(driver, testIds.closeHRPopUp);
    closeHRPopUp.click();
  });
};
