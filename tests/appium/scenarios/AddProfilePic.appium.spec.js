import {testIds} from '../../../src/Constants';
import pickImage from '../helpers/pickImage';
import getElement from '../helpers/getElement';
export default (driver, platform) => {
  test('Add profile pic', async () => {
    const uploadProfilePic = await getElement(driver, testIds.profilePicBtn);
    uploadProfilePic.click();

    await pickImage(driver, platform);
    await getElement(driver, testIds.profilePicBtn);
  });
};
