import {StyleSheet} from 'react-native';
import {Layout} from '../../../../utilities';

const {HEX_COLOR_CODES, FONTS} = Layout;

const Style = StyleSheet.create({
  keyboardAvoidingView: {flex: 1},
  container: {
    flex: 1,
    backgroundColor: HEX_COLOR_CODES.LIGHT_GRAY,
    paddingHorizontal: 13,
  },
  innerContainer: {
    flex: 1,
  },
  info: {
    flex: 2,
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'center',
    marginTop: 10,
  },

  pageTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: HEX_COLOR_CODES.BLACK,
    fontFamily: FONTS.FUTURA,
    textAlign: 'center',
  },
  pageSubTitle: {
    fontSize: 18,
    fontFamily: FONTS.FUTURA,
    color: HEX_COLOR_CODES.GRAY,
    marginTop: 10,
    textAlign: 'center',
  },

  whiteText: {color: HEX_COLOR_CODES.WHITE},
  blackButton: {backgroundColor: HEX_COLOR_CODES.BLACK_BUTTON},
  skipForNow: {
    textAlign: 'center',
    paddingVertical: 20,
    fontSize: 16,
    fontFamily: FONTS.SOFIA_REGULAR,
    color: HEX_COLOR_CODES.BLACK,
  },
  footerContainer: {flex: 0.5},
});

export default Style;
