import {StyleSheet} from 'react-native';
import {Layout} from '../../../../utilities';

const {HEX_COLOR_CODES, LAYOUT_CONSTRAINTS, FONTS} = Layout;

const Style = StyleSheet.create({
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
  subTitle: {
    marginTop: 16,
    fontSize: 16,
    color: HEX_COLOR_CODES.DARKGRAY,
    fontFamily: FONTS.FUTURA,
    marginLeft: 14,
  },
  imageStyle: {
    alignSelf: 'center',
    marginTop: 84,
    width: 162,
    height: 162,
  },
  findAbout: {
    marginTop: 100,
    fontSize: 16,
    color: HEX_COLOR_CODES.DARKGRAY,
    fontFamily: FONTS.FUTURA,
    marginLeft: 14,
  },
});

export default Style;
