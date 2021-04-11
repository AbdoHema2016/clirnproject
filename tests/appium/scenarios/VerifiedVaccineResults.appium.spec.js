import {testIds} from '../../../src/Constants';
import getElement from '../helpers/getElement';
import scrollDown from '../helpers/scrollDown';
export default (driver) => {
  test('Verified vaccine results', async () => {
    const settingsTabBtn = await getElement(driver, testIds.settingsTab);

    await settingsTabBtn.click();
    await driver.waitForElementByAccessibilityId(
      testIds.vaccinationResults,
      3000,
    );
    const vaccinationResults = await getElement(
      driver,
      testIds.vaccinationResults,
    );
    await vaccinationResults.click();

    const VerifiedVaccine = await getElement(
      driver,
      testIds.verifiedTxtSettings,
      10000,
    );

    await VerifiedVaccine.click();
    await getElement(driver, testIds.verify);
    await scrollDown(driver);
    expect(
      await driver.hasElementByAccessibilityId(testIds.deleteVaccine),
    ).toBe(false);
  });
};
