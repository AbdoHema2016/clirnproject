import {StyleSheet} from 'react-native';
import {Layout} from '../../utilities';

const {HEX_COLOR_CODES, LAYOUT_CONSTRAINTS, FONTS} = Layout;

const Style = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: HEX_COLOR_CODES.WALKTHROUGH_BG,
  },
  modalView: {
    borderRadius: 4,
    alignSelf: 'center',
    marginLeft: 13,
    marginRight: 13,
    backgroundColor: HEX_COLOR_CODES.WHITE,
  },
  closeImage: {
    width: 24,
    height: 24,
  },
  title: {
    marginTop: 24,
    fontFamily: FONTS.FUTURA,
    fontSize: 24,
    marginLeft: 13,
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
  text: {
    fontSize: 24,
    fontFamily: FONTS.SOFIA_MEDIUM,
    color: HEX_COLOR_CODES.BLACK,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 24,
  },
  description: {
    color: HEX_COLOR_CODES.GRAY,
    fontSize: 18,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 22,
    fontFamily: FONTS.SOFIA_MEDIUM,
    marginBottom: 16,
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 40,
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 26,
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 24,
  },
  rejectButton: {
    flex: 1,
    borderRadius: 4,
    height: 50,
    backgroundColor: HEX_COLOR_CODES.DARKGRAY,
    marginRight: 10,
  },
  acceptButton: {
    flex: 1,
    borderRadius: 4,
    height: 50,
    backgroundColor: HEX_COLOR_CODES.GREEN,
    marginLeft: 10,
  },
  buttonText: {
    color: HEX_COLOR_CODES.WHITE,
  },
  buttonCustomStyle: {
    width: '100%',
  },
  confirmMsg: {
    marginTop: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT * 0.027,
    alignSelf: 'stretch',
    color: HEX_COLOR_CODES.GRAY,
    fontFamily: FONTS.FUTURA,
    fontWeight: '500',
    fontSize: 18,
  },
  body: {
    alignSelf: 'stretch',
    color: HEX_COLOR_CODES.GRAY,
    fontFamily: FONTS.FUTURA,
    fontWeight: '500',
    fontSize: 18,
  },
  companyNameInBody: {
    color: HEX_COLOR_CODES.GREEN_BLUE,
    fontFamily: FONTS.FUTURA,
    fontWeight: '500',
    fontSize: 18,
  },
  denyImage: {
    marginTop: 24,
    height: 96,
    width: 96,
    alignSelf: 'center',
  },
});

export default Style;
