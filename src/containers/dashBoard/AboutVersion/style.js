import {StyleSheet} from 'react-native';
import {Layout} from '../../../utilities';

const {LAYOUT_CONSTRAINTS, HEX_COLOR_CODES, FONTS} = Layout;

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HEX_COLOR_CODES.WHITE,
  },
  appTitle: {
    marginTop: LAYOUT_CONSTRAINTS.WINDOW_HEIGHT * 0.13,
    fontSize: 24,
    fontWeight: '600',
    color: HEX_COLOR_CODES.BLACK,
    fontFamily: FONTS.SOFIA_MEDIUM,
    marginLeft: 14,
  },
  info: {
    marginTop: LAYOUT_CONSTRAINTS.WINDOW_HEIGHT * 0.04,
    fontSize: 18,
    fontWeight: '500',
    color: HEX_COLOR_CODES.GRAY,
    fontFamily: FONTS.FUTURA,
    marginLeft: 14,
  },
});
