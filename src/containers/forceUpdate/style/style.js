import {StyleSheet} from 'react-native';
import {Layout} from '../../../utilities';
const {HEX_COLOR_CODES, LAYOUT_CONSTRAINTS, FONTS} = Layout;

const Style = StyleSheet.create({
  container: {
    backgroundColor: HEX_COLOR_CODES.LIGHT_WHITE,
    alignItems: 'center',
    flex: 1,
  },
  testedLogo: {
    width: 125,
    height: 50,
    marginTop: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT * 0.2,
  },
  info: {
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH * 0.9,
    marginTop: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT * 0.03,
  },
  updateTitle: {
    fontFamily: FONTS.SOFIA_REGULAR,
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH * 0.6,
    fontWeight: '600',
    fontSize: 24,
    textAlign: 'center',
    alignSelf: 'center',
  },
  updateDesc: {
    fontFamily: FONTS.FUTURA,
    fontWeight: '500',
    fontSize: 18,
    color: HEX_COLOR_CODES.GRAY,
    textAlign: 'center',
    marginTop: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT * 0.025,
  },
  updateButton: {
    position: 'absolute',
    bottom: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT * 0.1,
    backgroundColor: HEX_COLOR_CODES.DARKGRAY,
  },
  UPDATE_BTN_TEXT: {
    color: HEX_COLOR_CODES.WHITE,
    fontFamily: FONTS.FUTURA,
    fontWeight: '500',
    fontSize: 16,
    alignItems: 'center',
    height: null,
  },
});
export default Style;
