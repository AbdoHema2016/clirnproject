export default async (driver, platform, closebtnText) => {
  if (platform === 'ios') {
    await driver.waitForElementByXPath(
      `//XCUIElementTypeButton[@name="${closebtnText}"]`,
      3000,
    );

    const doneBtn = await driver.elementByXPath(
      `//XCUIElementTypeButton[@name="${closebtnText}"]`,
    );
    doneBtn.click();
  }
};
