import {StyleSheet} from 'react-native';
import {Layout} from '../../../../utilities';

const {HEX_COLOR_CODES, LAYOUT_CONSTRAINTS, FONTS} = Layout;

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HEX_COLOR_CODES.WHITE,
  },
  pickerVisiblelist: {
    marginBottom: LAYOUT_CONSTRAINTS.WINDOW_HEIGHT * 0.04,
  },
  pickerNotVisiblelist: {
    marginBottom: LAYOUT_CONSTRAINTS.WINDOW_HEIGHT * 0.23,
  },
  appTitle: {
    marginTop: LAYOUT_CONSTRAINTS.WINDOW_HEIGHT * 0.13,
    fontSize: 24,
    fontWeight: '600',
    color: HEX_COLOR_CODES.BLACK,
    fontFamily: FONTS.SOFIA_MEDIUM,
    marginLeft: 14,
  },
  companyContainer: {
    flex: 1,
    marginTop: 44,
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 28,
    alignSelf: 'center',
  },
  reason: {
    fontWeight: '500',
    fontFamily: FONTS.FUTURA,
    fontSize: 12,
    color: HEX_COLOR_CODES.DARKGRAY,
    marginBottom: 20,
  },
  noHistoryContainer: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
  },
  binButtonContainer: {
    right: 0,
    width: 50,
    height: 50,
  },
  cRadioBtn: {
    right: 0,
    width: 30,
    borderRadius: 15,
    height: 30,
    justifyContent: 'center',
    backgroundColor: HEX_COLOR_CODES.LIGHTGREEN,
    marginTop: 18,
    marginBottom: 18,
  },
  cRadioUncheckedBtn: {
    right: 0,
    width: 30,
    borderRadius: 15,
    height: 30,
    justifyContent: 'center',
    marginTop: 18,
    marginBottom: 18,
  },
  radioBtnBckground: {
    right: 5,
    width: 20,
    borderRadius: 7.5,
    height: 20,
    justifyContent: 'center',
  },
  showinProfileLbl: {
    fontWeight: '500',
    fontFamily: FONTS.FUTURA,
    fontSize: 16,
    color: HEX_COLOR_CODES.DARKGRAY,
    marginTop: 20,
    marginLeft: 12,
  },
  workRemotelyLbl: {
    fontWeight: '500',
    fontFamily: FONTS.FUTURA,
    fontSize: 14,
    color: HEX_COLOR_CODES.DARKGRAY,
    marginBottom: 20,
  },
  switchworkRemote: {
    right: 15,
    position: 'absolute',
  },
  binButton: {
    width: '100%',
    height: '100%',
  },
  androidDropDown: {
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 34,
    height: '100%',
    marginLeft: 8,
    backgroundColor: HEX_COLOR_CODES.LIGHT_GRAY,
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
  companyCard: {
    justifyContent: 'center',
  },
  companyNameTag: {
    fontFamily: FONTS.FUTURA,
    fontSize: 12,
    fontWeight: '500',
    color: HEX_COLOR_CODES.DARKGRAY,
    marginBottom: 4,
  },
  details: {
    height: '100%',
    backgroundColor: HEX_COLOR_CODES.LIGHT_WHITE,
    flexGrow: 1,
    marginRight: 16,
  },
  companyName: {
    marginTop: 16,
    marginLeft: 13,
    fontFamily: FONTS.SOFIA_MEDIUM,
    fontSize: 18,
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
  selectReason: {
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 26,
    backgroundColor: HEX_COLOR_CODES.LIGHT_GRAY,
  },
  dropDown: {
    marginLeft: 13,
  },
  dropDownTextStyle: {
    position: 'absolute',
    left: 13,
    fontSize: 18,
    color: HEX_COLOR_CODES.GRAY,
  },
});

export default Style;
