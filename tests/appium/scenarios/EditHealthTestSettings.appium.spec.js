import {testIds} from '../../../src/Constants';
import getElement from '../helpers/getElement';
import pickMenuItem from '../helpers/pickMenuItem';
import pickDate from '../helpers/pickDate';
import scrollDown from '../helpers/scrollDown';
export default (driver, platform) => {
  test('Edit Health Test', async () => {
    const settingsTabBtn = await getElement(driver, testIds.settingsTab);

    await settingsTabBtn.click();
    await driver.waitForElementByAccessibilityId(
      testIds.healthTestsResults,
      3000,
    );
    const healthTestsResults = await getElement(
      driver,
      testIds.healthTestsResults,
    );
    await healthTestsResults.click();
    const addNew = await getElement(
      driver,
      testIds.healthTestResult + 0,
      10000,
    );
    await addNew.click();
    await scrollDown(driver);
    await scrollDown(driver);

    if (
      !expect(await driver.hasElementByAccessibilityId(testIds.verify)).toBe(
        false,
      )
    ) {
      const editTest = await getElement(driver, testIds.edit, 9000);
      await editTest.click();

      const centre = await getElement(driver, testIds.centre, 20000);
      let randomString = Math.random().toString(36).substring(7);
      await centre.sendKeys(`${randomString}`);

      const type = await getElement(driver, testIds.type);
      await type.click();

      await pickMenuItem(driver, platform);

      const result = await getElement(driver, testIds.testResult);
      await result.click();

      await pickMenuItem(driver, platform);

      const how = await getElement(driver, testIds.how);
      await how.click();

      await pickMenuItem(driver, platform);

      const date = await getElement(driver, testIds.testDate);
      await date.click();

      await pickDate(driver, platform);

      const Save = await getElement(driver, testIds.saveHealthTest);
      Save.click();
    }
  });
};
