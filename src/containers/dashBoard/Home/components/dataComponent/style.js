import {StyleSheet} from 'react-native';
import {Layout} from '../../../../../utilities';

const {HEX_COLOR_CODES, LAYOUT_CONSTRAINTS, FONTS} = Layout;

export const Style = StyleSheet.create({
  dataContainer: {
    height: LAYOUT_CONSTRAINTS.WINDOW_HEIGHT / 2 - 16,
    backgroundColor: HEX_COLOR_CODES.WHITE,
  },
  data: {
    height: 'auto',
    flexDirection: 'row',
    width: '100%',
    zIndex: 0,
  },
  infoIcon: {
    height: 24,
    width: 24,
  },
  infoAlertText: {
    fontSize: 14,
    fontFamily: FONTS.SOFIA_REGULAR,
    color: HEX_COLOR_CODES.BLACK,
    marginHorizontal: 15,
    marginTop: 10,
  },
  verifiedIcon: {
    height: '100%',
    width: '100%',
    marginTop: 32,
  },
  verifiedLabel: {
    marginTop: 8,
    fontSize: 12,
    fontFamily: FONTS.FUTURA,
    color: HEX_COLOR_CODES.GREEN,
  },
  notVerifiedLabel: {
    marginTop: 8,
    fontSize: 12,
    fontFamily: FONTS.FUTURA,
    color: HEX_COLOR_CODES.LIGHT_RED,
  },
  infoIconContainer: {
    width: 68,
  },
  verifiedIconCotainer: {
    height: 24,
    width: 24,
    marginLeft: 13,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  healthTestLabel: {
    fontSize: 18,
    marginTop: 16,
    fontFamily: FONTS.SOFIA_REGULAR,
  },
  dateLabel: {
    fontSize: 12,
    marginTop: 8,
    fontFamily: FONTS.SOFIA_REGULAR,
    color: HEX_COLOR_CODES.GRAY,
  },
  healthTestStatusLabel: {
    fontSize: 16,
    marginTop: 32,
    fontFamily: FONTS.SOFIA_REGULAR,
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH * 0.5,
  },
  healthTestDetailsContainer: {
    height: 'auto',
  },
  testSwitchContainer: {
    flex: 1.0,
    bottom: 0,
    top: 64,
  },
  tempSwitchContainer: {
    flex: 0.9,
    top: 12,
  },
  shareMyIdIcon: {
    position: 'relative',
    marginLeft: 24,
    height: 20,
    width: 22,
    bottom: 2,
  },
  trackColorWhenFalse: {
    color: HEX_COLOR_CODES.TRACK_FALSE,
  },
  trackColorWhenTrue: {
    color: HEX_COLOR_CODES.TRACK_TRUE,
  },
  alertContainer: {
    position: 'absolute',
    right: 13,
    top: 12,
  },
  thumbColorWhenEnabled: {
    color: HEX_COLOR_CODES.THUMB_ENABLED,
  },
  thumbColorWhenDisabled: {
    color: HEX_COLOR_CODES.THUMB_DISABLED,
  },
  profileInfoIconContainer: {
    height: 36,
    width: 36,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: HEX_COLOR_CODES.ORANGE,
  },
  buttonCustomStyle: {
    marginTop: 16,
    height: 42,
    width: 108,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: HEX_COLOR_CODES.GREEN,
  },
  addNewButtonInnerContainer: {width: 108},
  buttonTextStyle: {
    color: HEX_COLOR_CODES.GREEN,
  },
  infoAlertContainer: {
    paddingBottom: 30,
    paddingLeft: 10,
    paddingTop: 10,
  },
  menuTrigger: {padding: 5},
});
