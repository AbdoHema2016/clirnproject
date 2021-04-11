import {StyleSheet} from 'react-native';
import {Layout} from '../../utilities';

const {HEX_COLOR_CODES, LAYOUT_CONSTRAINTS, FONTS} = Layout;

const style = StyleSheet.create({
  superContainer: {
    height: 'auto',
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 26,
  },
  container: {
    backgroundColor: HEX_COLOR_CODES.WHITE,
    marginTop: 4,
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderRadius: 4,
    width: '100%',
  },
  input: {
    paddingLeft: 19,
    color: HEX_COLOR_CODES.BLACK,
    paddingRight: 19,
    lineHeight: 20,
    fontSize: 18,
    width: '100%',
    fontWeight: '500',
  },
  errorStyle: {
    borderWidth: 1.0,
    borderColor: HEX_COLOR_CODES.RED,
  },
  active: {
    borderWidth: 1.0,
    borderColor: HEX_COLOR_CODES.GRAY,
  },
  focused: {
    borderWidth: 1.0,
    borderColor: HEX_COLOR_CODES.GREEN,
  },
  errorText: {
    color: HEX_COLOR_CODES.RED,
  },
  errorMessageLabel: {
    marginTop: 4,
    color: HEX_COLOR_CODES.RED,
    fontFamily: FONTS.SOFIA_REGULAR,
    fontSize: 12,
  },
});

export default style;
