import {testIds} from '../../../src/Constants';

import getElement from '../helpers/getElement';
export default (driver) => {
  test('Invite friends', async () => {
    const settingsTabBtn = await getElement(driver, testIds.settingsTab);
    await settingsTabBtn.click();

    const invite = await getElement(driver, testIds.invite);
    await invite.click();

    const inviteVia = await getElement(driver, testIds.inviteVia + 1);
    await inviteVia.click();
  });
};
