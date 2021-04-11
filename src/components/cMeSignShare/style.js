import {StyleSheet} from 'react-native';
import {FONTS, Layout} from '../../utilities';

const {HEX_COLOR_CODES} = Layout;

export const Style = StyleSheet.create({
  txtRefreshQR: {
    color: HEX_COLOR_CODES.WHITE,
    fontFamily: FONTS.FUTURA,
    fontSize: 18,
  },
});
