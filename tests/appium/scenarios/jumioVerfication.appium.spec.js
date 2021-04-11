import {Platform} from 'react-native';
import {testIds} from '../../../src/Constants';
import wd from 'wd';

export default (driver) => {
  const action = new wd.TouchAction(driver);
  test('jumio verfication failure ', async () => {
    await driver.waitForElementByAccessibilityId(testIds.notificationTab, 4000);
    const notificationTabBtn = await driver.elementByAccessibilityId(
      testIds.notificationTab,
    );
    await notificationTabBtn.click();
    await driver.waitForElementByXPath(
      "//android.widget.TextView[@text='How are you feeling today? Update tested.me']",
      3000,
    );
    await action
      .press({x: 10, y: 1200})
      .wait(100)
      .moveTo({x: 10, y: 10})
      .release();
    await action.perform();
    if (Platform.OS === 'ios') {
      await driver.waitForElementByXPath(
        '[@name="We were not able to succesfully verify your ID. Please try again. If the problem reoccurs, contact our customer support. 2020-10-21"]',
        2000,
      );
      const JumioFailed = await driver.elementByXPath(
        '//XCUIElementTypeOther[@name="We were not able to succesfully verify your ID. Please try again. If the problem reoccurs, contact our customer support. 2020-10-21"]',
      );
      JumioFailed.click();
    } else {
      await driver.waitForElementByXPath(
        '//android.widget.TextView[@name="We were not able to succesfully verify your ID. Please try again. If the problem reoccurs, contact our customer support. 2020-10-21"]',
        2000,
      );
      const JumioFailed = await driver.elementByXPath(
        '//android.widget.TextView[@name="We were not able to succesfully verify your ID. Please try again. If the problem reoccurs, contact our customer support. 2020-10-21"]',
      );
      JumioFailed.click();
    }
    await driver.waitForElementByAccessibilityId(
      testIds.btnJumioFailedTryAgain,
      3000,
    );
    const btnJumioFailedTryAgain = await driver.elementByAccessibilityId(
      testIds.btnJumioFailedTryAgain,
    );
    await btnJumioFailedTryAgain.click();
    await driver.waitForElementByXPath(
      '//XCUIElementTypeButton[@name="Passport"]',
      3000,
    );
  });
};
