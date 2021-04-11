import {LOCAL_PATH} from '../../Constants/Paths/LocalPath';
import {profileStatCodes} from '../../Constants/appConstants';
export const getTempStatusIndicator = (stats, isVerified) => {
  const {temperature} = stats;
  if (!stats) {
    return LOCAL_PATH.ADD_IMAGE_ICON;
  }
  if (isVerified && temperature === profileStatCodes.GREEN) {
    return LOCAL_PATH.CONFIRMED_ICON;
  }
  if (!isVerified && temperature === profileStatCodes.GREEN) {
    return LOCAL_PATH.processTick;
  }
  if (isVerified && temperature === profileStatCodes.RED) {
    return LOCAL_PATH.subInfectedIcon;
  }
  if (!isVerified && temperature === profileStatCodes.RED) {
    return LOCAL_PATH.outlinedClose;
  }
  if (isVerified && temperature === profileStatCodes.AMBER) {
    return LOCAL_PATH.amberStatFilled;
  }
  if (!isVerified && temperature === profileStatCodes.AMBER) {
    return LOCAL_PATH.amberStatOutlined;
  }
  if (temperature === profileStatCodes.WHITE) {
    return LOCAL_PATH.ADD_IMAGE_ICON;
  }

  return LOCAL_PATH.NO_DATA_ICON;
};
