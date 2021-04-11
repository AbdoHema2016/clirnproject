import {StyleSheet} from 'react-native';
import {Layout} from '../../../utilities';

const {HEX_COLOR_CODES, LAYOUT_CONSTRAINTS, FONTS} = Layout;

export const Style = StyleSheet.create({
  backButtonTintColor: {
    color: HEX_COLOR_CODES.LIGHTGRAY,
  },
  container: {
    flex: 1,
    backgroundColor: HEX_COLOR_CODES.WHITE,
  },
  appTitle: {
    marginTop: LAYOUT_CONSTRAINTS.WINDOW_HEIGHT * 0.13,
    fontSize: 24,
    fontWeight: '600',
    color: HEX_COLOR_CODES.BLACK,
    fontFamily: FONTS.FUTURA,
    marginLeft: 14,
  },
  flatList: {
    flex: 1,
    marginTop: 44,
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH,
    alignSelf: 'center',
  },
  cell: {
    justifyContent: 'center',
    height: 96,
    marginHorizontal: 8,
    alignSelf: 'center',
  },
  cellInnerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
    height: '100%',
  },
  checkedInInfo: {
    paddingRight: 8,
    flex: 1,
  },
  venueName: {
    fontSize: 18,
    fontFamily: FONTS.FUTURA,
  },
  checkedInTime: {
    fontSize: 16,
    fontFamily: FONTS.ARIAL,
    color: HEX_COLOR_CODES.GRAY,
    marginTop: 4,
    fontWeight: '400',
  },
  checkOutButton: {
    flex: 0.4,
    height: 42,
    backgroundColor: HEX_COLOR_CODES.GREEN_BLUE,
    shadowColor: HEX_COLOR_CODES.WHITE,
  },
  checkOutButtonTitle: {
    color: HEX_COLOR_CODES.WHITE,
    fontSize: 16,
    height: 20,
    fontFamily: FONTS.FUTURA,
  },
  underLine: {
    height: 2,
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 26,
    backgroundColor: HEX_COLOR_CODES.LIGHT_GRAY,
  },
  noCheckIn: {
    fontFamily: FONTS.SOFIA_MEDIUM,
    fontSize: 24,
    color: HEX_COLOR_CODES.GREEN,
    width: 240,
    alignSelf: 'center',
    textAlign: 'center',
    position: 'absolute',
    marginTop: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT / 4,
  },
});
