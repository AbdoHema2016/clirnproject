import {testIds} from '../../../src/Constants';
import pickMenuItem from '../helpers/pickMenuItem';
import pickImage from '../helpers/pickImage';
import pickDate from '../helpers/pickDate';
import pressBtn from '../helpers/pressBtn';
export default (driver, platform) => {
  test('Add health test profile screen', async () => {
    await driver.hasElementByAccessibilityId(testIds.addTestBtn);
    const addTestBtn = await driver.elementByAccessibilityId(
      testIds.addTestBtn,
    );
    addTestBtn.click();

    await driver.waitForElementByAccessibilityId(testIds.how, 8000);
    const how = await driver.elementByAccessibilityId(testIds.how);
    await how.click();
    await pickMenuItem(driver);
    await driver.waitForElementByAccessibilityId(testIds.centre, 3000);
    const centre = await driver.elementByAccessibilityId(testIds.centre);
    await centre.sendKeys('Kalka');
    await driver.hasElementByAccessibilityId(testIds.type, 3000);
    const type = await driver.elementByAccessibilityId(testIds.type);
    await type.click();
    await pickMenuItem(driver);
    await driver.waitForElementByAccessibilityId(testIds.testResult, 8000);
    const result = await driver.elementByAccessibilityId(testIds.testResult);
    await result.click();
    await pickMenuItem(driver);

    await driver.waitForElementByAccessibilityId(testIds.testDate);
    const date = await driver.elementByAccessibilityId(testIds.testDate);
    await date.click();

    await pickDate(driver);

    await driver.waitForElementByAccessibilityId(testIds.imagePicker, 2000);
    await driver.hasElementByAccessibilityId(testIds.imagePicker);

    const upload = await driver.elementByAccessibilityId(testIds.imagePicker);
    upload.click();
    await pickImage(driver);
    await pressBtn(driver, platform, 'Save');
  });
};
