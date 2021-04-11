import {StyleSheet} from 'react-native';
import {Layout} from '../../../utilities';

const {HEX_COLOR_CODES, LAYOUT_CONSTRAINTS, FONTS} = Layout;

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
  editButtonContainer: {
    position: 'absolute',
    alignSelf: 'center',
    right: 0,
    height: 50,
    width: 50,
  },
  binButtonContainer: {
    position: 'absolute',
    alignSelf: 'center',
    right: 45,
    height: 50,
    width: 50,
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
  statusIconContainer: {
    height: 24,
    width: 24,
    marginLeft: 13,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  statusIcon: {
    height: '100%',
    width: '100%',
  },
  historyCard: {
    height: 100,
    justifyContent: 'center',
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
  verify: {
    fontFamily: FONTS.FUTURA,
    fontSize: 12,
    marginTop: 4,
    color: HEX_COLOR_CODES.GREEN,
  },
  notVerified: {
    fontFamily: FONTS.FUTURA,
    fontSize: 12,
    marginTop: 4,
    color: HEX_COLOR_CODES.LIGHT_RED,
  },
  expirationDate: {
    fontFamily: FONTS.SOFIA_REGULAR,
    fontSize: 16,
    marginTop: 2,
    color: HEX_COLOR_CODES.BLACK,
  },
  dateTaken: {
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
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 26,
    height: 40,
    borderRadius: 4,
    bottom: 32,
    alignItems: 'center',
    backgroundColor: HEX_COLOR_CODES.GREEN_BLUE,
  },
  addNewButtonText: {
    color: HEX_COLOR_CODES.WHITE,
    marginTop: 20,
  },
  errorContainer: {
    height: '100%',
    backgroundColor: HEX_COLOR_CODES.GREY_BG,
    width: '100%',
  },
  addImageStyle: {
    position: 'relative',
    right: 48,
    bottom: 20,
  },
});
