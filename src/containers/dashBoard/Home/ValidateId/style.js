import {StyleSheet} from 'react-native';
import {Layout} from '../../../../utilities';

const {HEX_COLOR_CODES, LAYOUT_CONSTRAINTS, FONTS} = Layout;

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HEX_COLOR_CODES.LIGHT_WHITE,
  },
  infoContainer: {
    height: '90%',
    paddingTop: '30%',
    alignItems: 'center',
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
  buttonsContainer: {
    position: 'absolute',
    bottom: '8%',
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 28,
    height: 'auto',
    alignSelf: 'center',
  },
  whiteText: {
    color: HEX_COLOR_CODES.WHITE,
  },
  greenButton: {
    backgroundColor: HEX_COLOR_CODES.GREEN,
  },
  notNowBtn: {
    borderColor: HEX_COLOR_CODES.GREEN,
    borderWidth: 1,
    marginTop: 15,
  },
  notNowTxt: {
    fontFamily: FONTS.FUTURA,
    fontSize: 16,
    color: HEX_COLOR_CODES.GREEN,
  },
  msg: {
    marginTop: '10%',
    width: '65%',
    lineHeight: 24,
  },
  subTitle: {
    fontFamily: FONTS.ARIAL,
    fontSize: 16,
    color: HEX_COLOR_CODES.GRAY,
    fontWeight: '400',
    textAlign: 'center',
  },
  greenWords: {
    fontFamily: FONTS.ARIAL,
    fontSize: 16,

    fontWeight: '700',
    color: HEX_COLOR_CODES.GREEN,
  },
  image: {
    marginTop: 48,
    height: 128,
    width: 128,
    alignSelf: 'center',
  },
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
