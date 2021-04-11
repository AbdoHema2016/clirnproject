import {StyleSheet} from 'react-native';
import {FONTS, HEX_COLOR_CODES as Color} from '../../../../utilities';
const Style = StyleSheet.create({
  keyboardAvoidingView: {flex: 1},
  container: {
    flex: 1,
    backgroundColor: Color.LIGHT_GRAY,
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
    color: Color.BLACK,
    fontFamily: FONTS.FUTURA,
    textAlign: 'center',
  },
  pageSubTitle: {
    fontSize: 18,
    fontFamily: FONTS.FUTURA,
    color: Color.GRAY,
    marginTop: 10,
    textAlign: 'center',
  },

  whiteText: {color: Color.WHITE},
  blackButton: {backgroundColor: Color.BLACK_BUTTON},
  skipForNow: {
    textAlign: 'center',
    paddingVertical: 20,
    fontSize: 16,
    fontFamily: FONTS.SOFIA_REGULAR,
    color: Color.BLACK,
  },
  footerContainer: {flex: 0.5},
});

export default Style;
