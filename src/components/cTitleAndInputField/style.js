import {StyleSheet} from 'react-native';
import {HEX_COLOR_CODES, FONTS} from '../../utilities';
const Style = StyleSheet.create({
  container: {
    height: 'auto',
    width: 'auto',
  },
  errorMessageLabel: {
    marginTop: 4,
    color: HEX_COLOR_CODES.RED,
    fontFamily: FONTS.SOFIA_REGULAR,
    fontSize: 12,
  },
});

export default Style;
