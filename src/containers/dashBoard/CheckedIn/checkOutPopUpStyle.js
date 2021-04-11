import {StyleSheet} from 'react-native';
import {Layout} from '../../../utilities';

const {HEX_COLOR_CODES, LAYOUT_CONSTRAINTS, FONTS} = Layout;

export const Style = StyleSheet.create({
  modal: {
    height: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT,
    backgroundColor: HEX_COLOR_CODES.MODAL_BG,
  },
  modalContainer: {
    backgroundColor: HEX_COLOR_CODES.WALKTHROUGH_BG,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popup: {
    height: 305,
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 26,
    backgroundColor: HEX_COLOR_CODES.WHITE,
    borderRadius: 4,
  },
  checkoutText: {
    marginTop: 64,
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 88,
    alignSelf: 'center',
    fontSize: 24,
    fontFamily: FONTS.FUTURA,
    color: HEX_COLOR_CODES.BLACK,
  },
  subText: {
    fontSize: 16,
    marginTop: 18,
    fontFamily: FONTS.ARIAL,
    color: HEX_COLOR_CODES.GRAY,
    alignSelf: 'center',
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 88,
  },
  companyName: {
    color: HEX_COLOR_CODES.GREEN_BLUE,
    fontFamily: FONTS.SOFIA_MEDIUM,
    fontSize: 18,
  },
  alertButtonsView: {
    height: 54,
    marginTop: 54,
    marginLeft: 13,
    marginRight: 13,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  noButton: {
    width: 151,
    height: 52,
    borderRadius: 4,
  },
  no: {
    color: HEX_COLOR_CODES.GREEN_BLUE,
    fontFamily: FONTS.FUTURA,
    height: 32,
    fontSize: 16,
  },
  checkoutButton: {
    height: 52,
    width: 151,
    borderRadius: 4,
    right: 16,
  },
  checkOutButtonText: {
    color: HEX_COLOR_CODES.RED,
    fontFamily: FONTS.FUTURA,
    height: 32,
  },
  buttonCustomStyle: {
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 56,
    alignSelf: 'center',
  },
  alertButtonCustomStyle: {
    width: 151,
    alignSelf: 'center',
  },
  crossButtonContainer: {
    height: 32,
    width: 32,
    position: 'absolute',
    right: 24,
    top: 24,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  crsossButton: {
    height: 24,
    width: 24,
  },
  customeImageStyle: {
    height: 24,
    width: 24,
    right: 0,
    position: 'relative',
  },
  textStyle: {
    height: 0,
    width: 0,
  },
});
