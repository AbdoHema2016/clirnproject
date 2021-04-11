import {StyleSheet} from 'react-native';
import {Layout} from '../../../../utilities';

const {LAYOUT_CONSTRAINTS, HEX_COLOR_CODES, FONTS} = Layout;

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HEX_COLOR_CODES.WHITE,
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
  binButtonContainer: {
    position: 'absolute',
    right: 0,
  },
  binButton: {
    width: '100%',
    height: '100%',
  },
  binIcon: {
    height: 24,
    width: 24,
  },
  backButtonStyle: {
    color: HEX_COLOR_CODES.GRAY,
  },
  underLine: {
    height: 2,
    position: 'absolute',
    bottom: 0,
    backgroundColor: HEX_COLOR_CODES.LIGHT_GRAY,
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 28,
    alignSelf: 'center',
  },
  statusIcon: {
    marginTop: 12,
    marginLeft: 13,
    width: 24,
    height: 24,
  },
  historyCard: {
    justifyContent: 'center',
    height: 103,
  },
  details: {
    height: '100%',
    marginLeft: 13,
    marginRight: 16,
  },
  sharedDetail: {
    marginTop: 16,
    fontFamily: FONTS.SOFIA_MEDIUM,
    fontSize: 18,
  },
  sharedWith: {
    marginTop: 4,
    fontFamily: FONTS.SOFIA_REGULAR,
    fontSize: 16,
    color: HEX_COLOR_CODES.DARKGRAY,
  },
  time: {
    fontFamily: FONTS.SOFIA_REGULAR,
    fontSize: 16,
    marginTop: 6,
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
});
