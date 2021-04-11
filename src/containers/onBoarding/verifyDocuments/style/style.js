import {StyleSheet} from 'react-native';
import {Layout} from '../../../../utilities';

const {LAYOUT_CONSTRAINTS, HEX_COLOR_CODES, FONTS} = Layout;

const Style = StyleSheet.create({
  keyboardAvoidingView: {flex: 1},
  container: {
    flex: 1,
    backgroundColor: HEX_COLOR_CODES.LIGHT_GRAY,
    paddingHorizontal: 13,
  },
  innerContainer: {flex: 1},
  infoStageLabel: {
    marginTop: LAYOUT_CONSTRAINTS.WINDOW_HEIGHT * 0.12,
    fontSize: 16,
    color: HEX_COLOR_CODES.GRAY,
    fontFamily: FONTS.SOFIA_MEDIUM,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: HEX_COLOR_CODES.BLACK,
    fontFamily: FONTS.FUTURA,
  },
  pageSubTitle: {
    fontSize: 18,
    fontFamily: FONTS.FUTURA,
    color: HEX_COLOR_CODES.GRAY,
    marginTop: 10,
  },
  verifyIconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    marginHorizontal: 15,
    fontSize: 18,
    fontFamily: FONTS.SOFIA_REGULAR,
    color: HEX_COLOR_CODES.BLACK,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 50,
    marginHorizontal: 15,
    backgroundColor: HEX_COLOR_CODES.BLACK,
  },
  retry: {
    fontSize: 18,
    fontFamily: FONTS.SOFIA_REGULAR,
    color: HEX_COLOR_CODES.WHITE,
  },
});

export default Style;
