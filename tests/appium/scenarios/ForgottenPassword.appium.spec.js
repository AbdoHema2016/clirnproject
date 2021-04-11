import {testIds} from '../../../src/Constants';
import getElement from '../helpers/getElement';
export default (driver) => {
  test('Forgotten Password renders', async () => {
    const forgottenPassword = await getElement(
      driver,
      testIds.passwordForgotten,
    );
    await forgottenPassword.click();

    const email = await getElement(driver, testIds.forgottenPasswordEmailField);
    await email.sendKeys('ab44do@test.it');

    const cont = await getElement(
      driver,
      testIds.sendLinkToEmailToResetPassword,
    );
    await cont.click();
  });
};
