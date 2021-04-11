import {StyleSheet} from 'react-native';
import {Layout} from '../../../../utilities';

const {HEX_COLOR_CODES, LAYOUT_CONSTRAINTS} = Layout;

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
  closeBtn: {
    position: 'absolute',
    right: 20,
    top: 100,
  },
  closeImg: {
    width: 50,
    height: 50,
  },
  infoAlertcontainer: {
    top: LAYOUT_CONSTRAINTS.WINDOW_HEIGHT > 800 ? -50 : 0,
    height: 168,
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 28,
    borderRadius: 4,
  },
  infoLabel: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'futura',
    color: HEX_COLOR_CODES.WHITE,
    width: 291,
    paddingLeft: 18,
    paddingTop: 32,
    marginRight: 18,
    alignSelf: 'center',
  },
  infoLabelColor: {
    color: HEX_COLOR_CODES.WHITE,
  },
});
