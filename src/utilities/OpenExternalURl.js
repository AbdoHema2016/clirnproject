import {Linking} from 'react-native';
import {showErrorMessage} from './HelperFunctions';
import {translate} from '../Localization';

export async function openUrl(url) {
  try {
    const isUrlSupported = await Linking.canOpenURL(url);
    if (isUrlSupported) {
      await Linking.openURL(url);
    }
  } catch (error) {
    showErrorMessage(translate('STRINGS.SOMETHING_WENT_WRONG'));
  }
}
