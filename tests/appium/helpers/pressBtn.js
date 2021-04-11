export default async (
  driver,
  PlatformOS,
  btnText,
  element,
  searchIdentifier = 'text',
) => {
  let btnElementType = element || 'XCUIElementTypeOther';
  if (PlatformOS === 'ios') {
    await driver.waitForElementByXPath(
      `//${element}[@name='${btnText}']`,
      3000,
    );
    const done = await driver.elementByXPath(
      `//${element}[@name='${btnText}']`,
    );
    done.click();
    return;
  }
  if (!element) {
    btnElementType = 'android.widget.TextView';
  }
  await driver.waitForElementByXPath(
    `//${btnElementType}[@${searchIdentifier}='${btnText}']`,
    20000,
  );
  const Save = await driver.elementByXPath(
    `//${btnElementType}[@${searchIdentifier}='${btnText}']`,
  );
  Save.click();
};
