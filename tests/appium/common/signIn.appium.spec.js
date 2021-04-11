import {testIds} from '../../../src/Constants';
import triggerKeyboard from '../helpers/triggerKeyboard';
export default async (driver, platform) => {
  expect(await driver.hasElementByAccessibilityId(testIds.emailSignIn)).toBe(
    true,
  );
  const emailElement = await driver.elementByAccessibilityId(
    testIds.emailSignIn,
  );

  await triggerKeyboard(driver, platform, emailElement);

  await emailElement.sendKeys('asd222@yopmail.com');
  const passwordElement = await driver.elementByAccessibilityId(
    testIds.passwordSignIn,
  );

  await triggerKeyboard(driver, platform, passwordElement);

  await passwordElement.sendKeys('Asdfgh1@');
  if (platform === 'ios') {
    await driver.waitForElementByXPath(
      '//XCUIElementTypeButton[@name="Done"]',
      3000,
    );

    const doneBtn = await driver.elementByXPath(
      '//XCUIElementTypeButton[@name="Done"]',
    );
    doneBtn.click();
  }
  await driver.waitForElementByAccessibilityId(testIds.signIn, 15000);

  const continueBtn = await driver.elementByAccessibilityId(testIds.signIn);
  await continueBtn.click();

  await driver.waitForElementByAccessibilityId(testIds.skipTutID, 15000);
  const walkthroughskipBtn = await driver.elementByAccessibilityId(
    testIds.skipTutID,
  );
  await walkthroughskipBtn.click();
  await driver.waitForElementByAccessibilityId(testIds.settingsTab, 7000);
};
