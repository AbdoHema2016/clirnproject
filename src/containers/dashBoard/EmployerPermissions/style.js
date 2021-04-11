import {StyleSheet} from 'react-native';
import {Layout} from '../../../utilities';

const {HEX_COLOR_CODES, LAYOUT_CONSTRAINTS, FONTS} = Layout;

const Style = StyleSheet.create({
  modal: {
    height: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT,
    backgroundColor: HEX_COLOR_CODES.MODAL_BG,
  },
  modalContainer: {
    backgroundColor: HEX_COLOR_CODES.WALKTHROUGH_BG,
    flex: 1,
    justifyContent: 'center',
  },
  remiderPopupContainer: {
    backgroundColor: 'white',
    width: '92%',
    alignSelf: 'center',
    borderRadius: 5,
    paddingLeft: '5%',
  },
  closeBtnContainer: {
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
    height: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT * 0.045,
    marginTop: 8,
  },
  closeBtn: {
    width: 50,
    height: 50,
    alignSelf: 'flex-end',
  },
  closeImage: {
    width: 24,
    height: 24,
  },
  popupIcon: {
    width: 97,
    height: 97,
    alignSelf: 'center',
  },
  popupTitle: {
    marginTop: '15%',
    fontFamily: FONTS.FUTURA,
    fontSize: 24,
    color: HEX_COLOR_CODES.DARKGRAY,
  },
  msgContainer: {
    marginVertical: 20,
    marginRight: 5,
  },
  popupBody: {
    marginTop: '5%',
    width: '90%',
    fontFamily: FONTS.ARIAL,
    fontSize: 16,
    color: HEX_COLOR_CODES.GRAY,
    marginBottom: '8%',
    fontWeight: '400',
  },
  companyName: {
    fontFamily: FONTS.ARIAL,
    fontSize: 16,
    color: HEX_COLOR_CODES.GREEN,
    fontWeight: '700',
  },

  permissionsContainer: {
    flexDirection: 'row',
    marginTop: '2%',
  },
  subBody: {
    fontFamily: FONTS.ARIAL,
    fontSize: 16,
    fontWeight: '400',
    color: HEX_COLOR_CODES.GRAY,
  },
  addedPermission: {
    width: '60%',
    fontFamily: FONTS.ARIAL,
    fontSize: 16,
    color: HEX_COLOR_CODES.GREEN,
    fontWeight: '700',
  },

  btnTxt: {
    fontFamily: FONTS.FUTURA,
    fontSize: 16,
    color: HEX_COLOR_CODES.WHITE,
    height: '40%',
  },
  removeBtnTxt: {
    fontFamily: FONTS.FUTURA,
    fontSize: 16,
    color: HEX_COLOR_CODES.RED,
    height: '40%',
  },
  goToVaccineDetails: {
    marginTop: '10%',
    backgroundColor: HEX_COLOR_CODES.GREEN,
    marginBottom: '8%',
    width: '95%',
  },
});
export default Style;
