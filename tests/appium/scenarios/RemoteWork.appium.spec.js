import {testIds} from '../../../src/Constants';
import getElement from '../helpers/getElement';
import scrollDown from '../helpers/scrollDown';
import pickMenuItem from '../helpers/pickMenuItem';
import pressBtn from '../helpers/pressBtn';
export default (driver, platform) => {
  test('Remote work results', async () => {
    const settingsTabBtn = await getElement(driver, testIds.settingsTab);
    await settingsTabBtn.click();

    await getElement(driver, testIds.healthTestsResults);
    await scrollDown(driver);

    const workingRemotely = await getElement(driver, testIds.myCompany);
    await workingRemotely.click();

    const RemoteWorkToggle = await getElement(
      driver,
      testIds.remoteWorkToggle,
      8000,
    );
    await RemoteWorkToggle.click();
    await pressBtn(driver, platform, 'Agreed with employer');
    await pickMenuItem(driver, platform);
    const RemoteWorkToggle2 = await getElement(
      driver,
      testIds.remoteWorkToggle,
    );
    await RemoteWorkToggle2.click();
  });
};
