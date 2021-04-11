import {testIds} from '../../../src/Constants';
import getElement from '../helpers/getElement';
import scrollDown from '../helpers/scrollDown';
export default (driver) => {
  test('Delete Health Test', async () => {
    const settingsTabBtn = await getElement(driver, testIds.settingsTab);
    await settingsTabBtn.click();

    const healthTestsResults = await getElement(
      driver,
      testIds.healthTestsResults,
    );
    await healthTestsResults.click();

    const addNew = await getElement(driver, testIds.healthTestResult + 0, 9000);
    await addNew.click();
    await getElement(driver, testIds.testCentreTitle, 9000);
    await scrollDown(driver);
    await scrollDown(driver);

    const deleteTest = await getElement(driver, testIds.deleteTest, 8000);
    await deleteTest.click();
    const confirmDeleteHealthTest = await getElement(
      driver,
      testIds.confirmDeleteHealthTest,
    );
    confirmDeleteHealthTest.click();
  });
};
