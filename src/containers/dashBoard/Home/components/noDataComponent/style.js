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
  },
  infoIcon: {
    height: 24,
    width: 24,
  },
  verifiedIcon: {
    height: '100%',
    width: '100%',
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
    backgroundColor: HEX_COLOR_CODES.GREEN,
    borderRadius: 12,
  },
  healthTestLabel: {
    fontSize: 18,
    marginTop: 16,
    fontFamily: FONTS.SOFIA_REGULAR,
  },
  dateLabel: {
    fontSize: 18,
    marginTop: 4,
    fontFamily: FONTS.SOFIA_REGULAR,
    color: HEX_COLOR_CODES.GRAY,
  },
  healthTestStatusLabel: {
    fontSize: 16,
    marginTop: 4,
    fontFamily: FONTS.SOFIA_REGULAR,
  },
  healthTestDetailsContainer: {
    height: 'auto',
  },
  switchContainer: {
    flex: 0.9,
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
  thumbColorWhenEnabled: {
    color: HEX_COLOR_CODES.THUMB_ENABLED,
  },
  thumbColorWhenDisEnabled: {
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
  crossIconContainer: {
    position: 'absolute',
    right: 3,
    top: 4,
    height: 35,
    width: 37,
    borderRadius: 4,
    backgroundColor: '#0000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfoButton: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  profileInfoIcon: {
    position: 'relative',
    right: 12,
    height: 24,
    width: 24,
  },
  unverifiedProfileInfoIconBackGround: {
    backgroundColor: HEX_COLOR_CODES.ORANGE,
  },
  infoIconTextStyle: {
    height: 0,
    width: 0,
  },
  infoAlertcontainer: {
    position: 'absolute',
    height: 115,
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 28,
    marginLeft: 14,
    backgroundColor: HEX_COLOR_CODES.BLACK,
    zIndex: 1,
    marginTop: 60,
    borderRadius: 4,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: FONTS.SOFIA_REGULAR,
    color: HEX_COLOR_CODES.WHITE,
    paddingLeft: 14,
    paddingTop: 32,
    marginRight: 88,
  },
  infoLabelColor: {
    color: HEX_COLOR_CODES.WHITE,
  },
  anitibodyLabel: {
    color: HEX_COLOR_CODES.GREEN,
    textDecorationLine: 'underline',
  },
  buttonCustomStyle: {
    marginTop: 16,
    height: 42,
    width: 128,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: HEX_COLOR_CODES.GREEN,
  },
  buttonTextStyle: {
    color: HEX_COLOR_CODES.GREEN,
  },
  alertContainer: {
    position: 'absolute',
    right: 13,
    top: 12,
  },
  tempSwitchContainer: {
    marginTop: 4,
  },
  menuTrigger: {padding: 5},
  infoAlertContainer: {
    paddingBottom: 30,
    paddingLeft: 10,
    paddingTop: 10,
  },
  infoAlertText: {
    fontSize: 14,
    fontFamily: FONTS.SOFIA_REGULAR,
    color: HEX_COLOR_CODES.BLACK,
    marginHorizontal: 15,
    marginTop: 10,
  },
});
