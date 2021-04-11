import {testIds} from '../../../src/Constants';
import getElement from '../helpers/getElement';
import scrollDown from '../helpers/scrollDown';
export default (driver, platform) => {
  test('setting new password', async () => {
    const settingsTabBtn = await getElement(driver, testIds.settingsTab);
    await settingsTabBtn.click();

    await getElement(driver, testIds.healthTestsResults);
    await scrollDown(driver);

    const passwordSettingsBtn = await getElement(
      driver,
      testIds.passwordSettings,
    );
    await passwordSettingsBtn.click();

    const oldPassword = await getElement(driver, testIds.oldPassword);
    await oldPassword.sendKeys('Asdfgh1@');

    const newPassword = await getElement(driver, testIds.newPassword);
    await newPassword.sendKeys('Asdfgh1@2');

    const confirmPassword = await getElement(driver, testIds.confirmPassword);
    await confirmPassword.sendKeys('Asdfgh1@2');

    const updatePasswordBtn = await getElement(
      driver,
      testIds.updatePasswordBtn,
      7000,
    );
    await updatePasswordBtn.click();
    const notificationTabBtn = await getElement(
      driver,
      testIds.notificationTab,
      8000,
    );
    await notificationTabBtn.click();

    const settingsTabBtn2 = await getElement(driver, testIds.settingsTab);
    await settingsTabBtn2.click();
    const passwordSettingsBtn2 = await getElement(
      driver,
      testIds.passwordSettings,
      9000,
    );
    await passwordSettingsBtn2.click();

    await getElement(driver, testIds.oldPassword);

    const oldPassword2 = await getElement(driver, testIds.oldPassword);
    await oldPassword2.sendKeys('Asdfgh1@2');

    const newPassword2 = await getElement(driver, testIds.newPassword);
    await newPassword2.sendKeys('Asdfgh1@');

    const confirmPassword2 = await getElement(driver, testIds.confirmPassword);
    await confirmPassword2.sendKeys('Asdfgh1@');

    const updatePasswordBtn2 = await getElement(
      driver,
      testIds.updatePasswordBtn,
    );
    await updatePasswordBtn2.click();

    await getElement(driver, testIds.passwordSettings, 9000);
  });
};
