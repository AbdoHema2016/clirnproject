import {testIds} from '../../../src/Constants';
import {version} from '../../../package.json';
import getElement from '../helpers/getElement';
import scrollDown from '../helpers/scrollDown';
export default (driver) => {
  test('App Version', async () => {
    const settingsTabBtn = await getElement(driver, testIds.settingsTab);
    await settingsTabBtn.click();

    await driver.waitForElementByAccessibilityId(
      testIds.healthTestsResults,
      3000,
    );
    await scrollDown(driver);
    const appVersion = await getElement(driver, testIds.appVersion);
    await appVersion.click();
    let appBuildVersionString = version.split('-')[0];
    const appBuild = await getElement(driver, testIds.appBuild, 7000);
    const appBuildTxt = await appBuild.text();
    expect(appBuildTxt).toEqual(`Version ${appBuildVersionString}`);
  });
};
