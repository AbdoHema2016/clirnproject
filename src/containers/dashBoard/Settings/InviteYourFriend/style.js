import {StyleSheet} from 'react-native';
import {Layout} from '../../../../utilities';

const {LAYOUT_CONSTRAINTS, HEX_COLOR_CODES, FONTS} = Layout;

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HEX_COLOR_CODES.WHITE,
    paddingHorizontal: 15,
  },
  appTitle: {
    marginTop: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT * 0.16,
    marginBottom: 30,
    fontSize: 24,
    fontWeight: '600',
    color: HEX_COLOR_CODES.BLACK,
    fontFamily: FONTS.SOFIA_MEDIUM,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: HEX_COLOR_CODES.LIGHT_WHITE,
    paddingVertical: 20,
  },
  optionTitle: {
    fontFamily: FONTS.FUTURA,
    fontSize: 18,
    marginLeft: 12,
    color: HEX_COLOR_CODES.BLACK_BUTTON,
    fontWeight: '500',
  },
});
