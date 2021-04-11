import {Platform, NativeModules} from 'react-native';
import {URLS} from '../../Constants';
import {HEX_COLOR_CODES} from '../../Layout';

const {JumioMobileSDKNetverify} = NativeModules;

export const initiateJumioSDK = ({apiToken, apiSecret, dataCenter, userId}) => {
  const configuration = {
    enableVerification: true,
    enableIdentityVerification: true,
    userReference: String(userId),
    preselectedCountry: 'IN',
    cameraPosition: 'BACK',
    documentTypes: ['DRIVER_LICENSE', 'PASSPORT', 'IDENTITY_CARD', 'VISA'],
    enableWatchlistScreening: 'ENABLED',
    watchlistSearchProfile: 'YOURPROFILENAME',
    callbackUrl: URLS.JUMIO_CALLBACK_URL,
  };

  if (Platform.OS === 'ios') {
    JumioMobileSDKNetverify.initNetverifyWithCustomization(
      apiToken,
      apiSecret,
      dataCenter,
      configuration,
      {
        backgroundColor: HEX_COLOR_CODES.GREEN,
        foregroundColor: HEX_COLOR_CODES.WHITE,
        positiveButtonTitleColor: HEX_COLOR_CODES.GREEN,
        positiveButtonBackgroundColor: HEX_COLOR_CODES.WHITE,
      },
    );
    return JumioMobileSDKNetverify.startNetverify();
  }

  JumioMobileSDKNetverify.initNetverify(
    apiToken,
    apiSecret,
    dataCenter,
    configuration,
  );
  JumioMobileSDKNetverify.startNetverify();
};
