import {StyleSheet} from 'react-native';
import {Layout} from '../../../../utilities';

const {HEX_COLOR_CODES, FONTS} = Layout;

const style = StyleSheet.create({
  superContainer: {
    height: 'auto',
    width: '100%',
  },
  container: {
    marginTop: 4,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '100%',
  },
  input: {
    height: 48,
    fontSize: 24,
    width: 48,
    color: HEX_COLOR_CODES.BLACK,
    textAlign: 'center',
    marginLeft: 8,
    borderRadius: 4,
    backgroundColor: HEX_COLOR_CODES.WHITE,
    fontFamily: FONTS.SOFIA_REGULAR,
  },
  errorStyle: {
    borderWidth: 1.0,
    borderColor: HEX_COLOR_CODES.RED,
  },
  noErrorStyle: {
    borderWidth: 1.0,
    borderColor: HEX_COLOR_CODES.GREEN_BLUE,
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
