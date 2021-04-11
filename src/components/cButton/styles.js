import {StyleSheet} from 'react-native';
import {Layout} from '../../utilities';

const {HEX_COLOR_CODES, LAYOUT_CONSTRAINTS, FONTS} = Layout;

const style = StyleSheet.create({
  buttonStyle: {
    borderRadius: 4,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 32,
  },
  buttonTextStyle: {
    fontSize: 17,
    textAlign: 'center',
    fontFamily: FONTS.SOFIA_REGULAR,
  },
  buttonContainerStyle: {
    shadowColor: HEX_COLOR_CODES.SHADOW,
    shadowOpacity: 0.75,
    shadowRadius: 4,
    shadowOffset: {height: 8, width: 0},
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: 4,
  },
  disabled: {
    opacity: 0.4,
  },
});
export default style;
