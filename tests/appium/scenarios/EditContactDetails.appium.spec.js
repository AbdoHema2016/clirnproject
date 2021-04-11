import {testIds} from '../../../src/Constants';
import wd from 'wd';
import getElement from '../helpers/getElement';
import scrollDown from '../helpers/scrollDown';
export default (driver) => {
  const action = new wd.TouchAction(driver);
  test('Edit Contact details', async () => {
    const settingsTabBtn = await getElement(driver, testIds.settingsTab);
    await settingsTabBtn.click();

    const personalAndContactDetails = await getElement(
      driver,
      testIds.personalAndContactDetails,
    );
    await personalAndContactDetails.click();

    const editContactDetails = await getElement(driver, testIds.edit);
    await editContactDetails.click();
    const email = await getElement(driver, testIds.emailSignIn);

    email.clear();
    await email.sendKeys('Gaurav67@test.com');
    await scrollDown(driver);
    await driver.waitForElementByAccessibilityId(testIds.phone, 3000);
    const phone = await getElement(driver, testIds.phone);
    await phone.clear();
    await phone.sendKeys('7476560016');
    await scrollDown(driver);
    await action.perform();
    await driver.waitForElementByAccessibilityId(
      testIds.updateContactDetails,
      3000,
    );
    const updateContactDetails = await getElement(
      driver,
      testIds.updateContactDetails,
    );
    await updateContactDetails.click();
  });
};
