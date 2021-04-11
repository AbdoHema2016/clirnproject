import {StyleSheet} from 'react-native';
import {Layout} from '../../../../utilities';

const {LAYOUT_CONSTRAINTS, HEX_COLOR_CODES, FONTS} = Layout;

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HEX_COLOR_CODES.WHITE,
  },
  backButtonStyle: {
    color: HEX_COLOR_CODES.GRAY,
  },
  appTitle: {
    marginTop: LAYOUT_CONSTRAINTS.WINDOW_HEIGHT * 0.13,
    fontSize: 24,
    fontWeight: '600',
    color: HEX_COLOR_CODES.BLACK,
    fontFamily: FONTS.SOFIA_MEDIUM,
    marginLeft: 14,
  },
  flatList: {
    flex: 1,
    marginTop: 44,
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 28,
    alignSelf: 'center',
  },
  noHistoryContainer: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
  },
  underLine: {
    height: 2,
    position: 'absolute',
    bottom: 0,
    backgroundColor: HEX_COLOR_CODES.LIGHT_GRAY,
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 28,
    alignSelf: 'center',
  },
  historyCard: {
    height: 104,
    justifyContent: 'center',
  },
  temperature: {
    fontFamily: FONTS.SOFIA_MEDIUM,
    fontSize: 18,
    color: HEX_COLOR_CODES.BLACK,
  },
  status: {
    fontFamily: FONTS.SOFIA_REGULAR,
    fontSize: 16,
    marginTop: 2,
    color: HEX_COLOR_CODES.DARKGRAY,
  },
  time: {
    fontFamily: FONTS.SOFIA_REGULAR,
    fontSize: 16,
    marginTop: 2,
    color: HEX_COLOR_CODES.GRAY,
  },
  noData: {
    fontFamily: FONTS.SOFIA_MEDIUM,
    fontSize: 24,
    color: HEX_COLOR_CODES.GREEN,
    width: 240,
    alignSelf: 'center',
    textAlign: 'center',
    position: 'absolute',
    marginTop: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT / 3 - 44,
  },
  addNewButton: {
    marginTop: 36,
    alignSelf: 'center',
    width: 125,
    height: 42,
    borderRadius: 8,
    bottom: 32,
    backgroundColor: HEX_COLOR_CODES.GRAY,
  },
  addNewButtonText: {
    color: HEX_COLOR_CODES.WHITE,
  },
});
