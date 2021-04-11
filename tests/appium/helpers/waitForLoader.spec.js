import {testIds} from '../../../src/Constants';
export default async (driver) => {
  const startDate = Date.now();
  let finaleDate = Date.now();
  await driver.waitForElementByAccessibilityId(testIds.loader, 8000);
  try {
    while (
      expect(await driver.hasElementByAccessibilityId(testIds.loader)).toBe(
        true,
      ) ||
      finaleDate - startDate > 15000
    ) {
      finaleDate = Date.now();
      await driver.sleep(100);
    }
  } catch {}
};
