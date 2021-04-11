import {testIds} from '../../../src/Constants';
import getElement from '../helpers/getElement';
import scrollDown from '../helpers/scrollDown';
export default (driver) => {
  test('Sign out', async () => {
    const settingsTabBtn = await getElement(driver, testIds.settingsTab);
    await settingsTabBtn.click();

    await getElement(driver, testIds.healthTestsResults);
    await scrollDown(driver);

    const logoutBtn = await getElement(driver, testIds.logout);
    await logoutBtn.click();
  });
};
