import {testIds} from '../../../src/Constants';
import getElement from '../helpers/getElement';
export default (driver) => {
  test('Share history Navigation', async () => {
    const settingsTabBtn = await getElement(driver, testIds.settingsTab);
    await settingsTabBtn.click();
    const shareHistory = await getElement(driver, testIds.shareHistory);
    await shareHistory.click();
  });
};
