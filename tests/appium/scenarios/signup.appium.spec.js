import {testIds} from '../../../src/Constants';
import wd from 'wd';
import pickMenuItem from '../helpers/pickMenuItem';
import pickDate from '../helpers/pickDate';
import getElement from '../helpers/getElement';
import pickImage from '../helpers/pickImage';
export default (driver, platform) => {
  const action = new wd.TouchAction(driver);
  test('signup test', async () => {
    const ContinueToBenefits = await getElement(
      driver,
      testIds.continueToBenefits,
    );
    await ContinueToBenefits.click();

    const ContinueToNextBenefit = await getElement(
      driver,
      testIds.continueToNextBenefit,
    );
    await ContinueToNextBenefit.click();
    const continueToSecondBenefits = await getElement(
      driver,
      testIds.continueToNextBenefit,
    );
    await continueToSecondBenefits.click();
    await continueToSecondBenefits.click();

    const title = await getElement(driver, testIds.title);
    await title.click();
    await pickMenuItem(driver, platform);

    const firstName = await getElement(driver, testIds.firstName);
    await firstName.sendKeys('Gaurav');

    const lastName = await getElement(driver, testIds.lastName);
    await lastName.sendKeys('Tester');

    const ContinueToContactDetails = await getElement(
      driver,
      testIds.continueToContactDetails,
    );
    await ContinueToContactDetails.click();

    const email = await getElement(driver, testIds.addEmail, 30000);
    let randomString = Math.random().toString(36).substring(7);
    await email.sendKeys(`${randomString}@yopmail.com`);

    const phone = await getElement(driver, testIds.phone);
    await phone.sendKeys('7476560016');

    const pwd = await getElement(driver, testIds.addPassword);
    await pwd.sendKeys('Tester123');
    const CheckBox = await getElement(driver, testIds.checkBox);
    await CheckBox.click();
    const gotToOTP = await getElement(driver, testIds.continue);
    await gotToOTP.click();
    const otp = await getElement(driver, testIds.otpTextInput, 25000);
    await otp.sendKeys('135246');
    const goToVerification = await getElement(driver, testIds.continue);
    await goToVerification.click();
    const gotToFeelings = await getElement(driver, testIds.skip, 25000);
    await gotToFeelings.click();
    const feelingOne = await getElement(driver, testIds.feelingOne, 6000);
    await feelingOne.click();

    const feelingTwo = await getElement(driver, testIds.feelingThree);
    await feelingTwo.click();
    const goToTemp = await getElement(driver, testIds.continue);
    await goToTemp.click();
    const temp = await getElement(driver, testIds.selectFeh, 25000);
    await temp.click();
    await pickMenuItem(driver, platform);
    const centre = await getElement(driver, testIds.centre, 25000);
    await centre.sendKeys('Kalka');
    const type = await getElement(driver, testIds.type);
    await type.click();
    await pickMenuItem(driver, platform);

    const result = await getElement(driver, testIds.testResult);
    await result.click();
    await pickMenuItem(driver, platform);

    await driver.waitForElementByAccessibilityId(testIds.centre, 3000);
    action.press({x: 50, y: 1000}).wait(100).moveTo({x: 50, y: 50}).release();
    await action.perform();
    const how = await getElement(driver, testIds.how);
    await how.click();
    await pickMenuItem(driver, platform);

    const date = await getElement(driver, testIds.testDate);
    await date.click();
    await pickDate(driver, platform);
    const imagePicker = await getElement(driver, testIds.imagePicker);
    await imagePicker.click();
    await pickImage(driver, platform);
    const continueToProfile = await getElement(driver, testIds.continue, 20000);
    await continueToProfile.click();
    await driver.waitForElementByAccessibilityId(testIds.firstTut, 30000);
  });
};
