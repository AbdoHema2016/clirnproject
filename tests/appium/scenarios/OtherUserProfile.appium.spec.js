import {testIds} from '../../../src/Constants';
import wd from 'wd';

export default (driver) => {
  test.skip('Other user profile', async () => {
    const action = new wd.TouchAction(driver);
    await driver.waitForElementByAccessibilityId(testIds.scanMe, 2000);
    const scan = await driver.elementByAccessibilityId(testIds.scanMe);
    scan.click();
    if (
      expect(await driver.hasElementByAccessibilityId(testIds.process)).toBe(
        true,
      )
    ) {
      await driver.waitForElementByAccessibilityId(testIds.process, 2000);
      const process = await driver.elementByAccessibilityId(testIds.process);
      process.click();
      await action
        .press({x: 50, y: 567})
        .wait(100)
        .moveTo({x: 50, y: 10})
        .release();
      await action.perform();
      await driver.waitForElementByAccessibilityId(testIds.deleteTest, 2000);
      const reject = await driver.elementByAccessibilityId(testIds.deleteTest);
      reject.click();
      await driver.waitForElementByAccessibilityId(testIds.illegible, 2000);
      const illegible = await driver.elementByAccessibilityId(
        testIds.illegible,
      );
      illegible.click();
      await driver.waitForElementByAccessibilityId(
        testIds.confirmRejection,
        2000,
      );
      const confirmReject = await driver.elementByAccessibilityId(
        testIds.confirmRejection,
      );
      confirmReject.click();
    }
  });
};
