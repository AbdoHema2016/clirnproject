import {testIds} from '../../../src/Constants';
import getElement from '../helpers/getElement';
export default (driver) => {
  test('ShareMeQR', async () => {
    const shareIDBtn = await getElement(driver, testIds.shareIDBtn);
    shareIDBtn.click();

    const shareMeBtn = await getElement(driver, testIds.shareMeBtn);
    shareMeBtn.click();

    await getElement(driver, testIds.QRCode, 8000);
  });
};
