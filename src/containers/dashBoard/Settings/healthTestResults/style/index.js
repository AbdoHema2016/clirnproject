import {StyleSheet} from 'react-native';
import {Layout} from '../../../../../utilities';

const {LAYOUT_CONSTRAINTS, FONTS, HEX_COLOR_CODES} = Layout;

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HEX_COLOR_CODES.WHITE,
  },
  tintColor: {
    tintColor: HEX_COLOR_CODES.WHITE,
  },
  title: {
    marginLeft: 13,
    fontFamily: FONTS.SOFIA_MEDIUM,
    fontSize: 24,
    marginTop: LAYOUT_CONSTRAINTS.WINDOW_HEIGHT * 0.14,
    textAlign: 'left',
  },
});

export default Style;
