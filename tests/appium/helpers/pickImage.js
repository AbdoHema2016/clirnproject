export default async (driver, PlatformOS) => {
  if (PlatformOS === 'ios') {
    await driver.waitForElementByXPath(
      "//XCUIElementTypeButton[@name='Choose from Library...']",
      10000,
    );
    const chooseFromLibrary = await driver.elementByXPath(
      "//XCUIElementTypeButton[@name='Choose from Library...']",
    );
    chooseFromLibrary.click();
    await driver.waitForElementByXPath(
      "//XCUIElementTypeImage[@name='Photo, October 09, 2009, 11:09 PM']",
      20000,
    );
    const pickedImage = await driver.elementByXPath(
      "//XCUIElementTypeImage[@name='Photo, October 09, 2009, 11:09 PM']",
    );
    pickedImage.click();

    return;
  }
  await driver.waitForElementByXPath(
    "//android.widget.Button[@content-desc='Take Photo...']",
    10000,
  );
  const takePhoto = await driver.elementByXPath(
    "//android.widget.Button[@content-desc='Take Photo...']",
  );
  takePhoto.click();

  try {
    const allowCamera = await driver.waitForElementByXPath(
      "//android.widget.Button[@text='Allow']",
      5000,
    );
    await allowCamera.click();
  } catch {}
  await driver.waitForElementByXPath(
    "//android.widget.ImageButton[@content-desc='Shutter']",
    10000,
  );
  const Shutter = await driver.elementByXPath(
    "//android.widget.ImageButton[@content-desc='Shutter']",
  );
  Shutter.click();
  Shutter.click();
  await driver.waitForElementByXPath(
    "//android.widget.ImageButton[@content-desc='Done']",
    10000,
  );
  const Done = await driver.elementByXPath(
    "//android.widget.ImageButton[@content-desc='Done']",
  );
  Done.click();
};
