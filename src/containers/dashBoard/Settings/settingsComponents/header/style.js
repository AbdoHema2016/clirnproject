import {StyleSheet} from 'react-native';
import {Layout} from '../../../../../utilities';

const {LAYOUT_CONSTRAINTS, HEX_COLOR_CODES, FONTS} = Layout;

const Style = StyleSheet.create({
  header: {
    height: LAYOUT_CONSTRAINTS.WINDOW_HEIGHT * 0.18,
    justifyContent: 'center',
  },
  title: {
    fontFamily: FONTS.SOFIA_MEDIUM,
    fontWeight: '600',
    fontSize: 24,
    textAlign: 'left',
    marginLeft: 14,
    color: HEX_COLOR_CODES.BLACK,
  },
});

export default Style;
