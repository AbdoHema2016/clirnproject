import {StyleSheet} from 'react-native';
import {Layout} from '../../utilities';

const {HEX_COLOR_CODES, LAYOUT_CONSTRAINTS} = Layout;

const height = LAYOUT_CONSTRAINTS.WINDOW_HEIGHT;
const width = LAYOUT_CONSTRAINTS.WINDOW_WIDTH;
const maskImageHeight = 480;
const maskImageWidth = 188;
const yBorderWidth = (height - maskImageHeight) / 2;
const xBorderWidth = (width - maskImageWidth) / 2;

const style = StyleSheet.create({
  scannerContainer: {
    width: 'auto',
    justifyContent: 'center',
    position: 'absolute',
    marginTop: 44,
    backgroundColor: HEX_COLOR_CODES.MODAL_BG,
    bottom: 0,
  },
  modal: {
    height: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT,
    backgroundColor: HEX_COLOR_CODES.MODAL_BG,
  },
  modalContainer: {
    height: LAYOUT_CONSTRAINTS.WINDOW_HEIGHT,
    backgroundColor: HEX_COLOR_CODES.WALKTHROUGH_BG,
  },
  camera: {
    height: height,
    width: width,
  },
  scannerMaskBackground: {
    position: 'absolute',
    flex: 1,
    borderColor: Layout.HEX_COLOR_CODES.WALKTHROUGH_BG,
    borderTopWidth: yBorderWidth,
    borderBottomWidth: yBorderWidth,
    borderLeftWidth: xBorderWidth,
    borderRightWidth: xBorderWidth,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  scannerMaskImage: {
    width: maskImageWidth,
    height: maskImageHeight,
    opacity: 0.7,
  },

  buttonContainer: {
    marginTop: 20,
    height: 20,
    backgroundColor: HEX_COLOR_CODES.MODAL_BLANK,
  },
  buttonStyle: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH,
  },
  imageStyle: {
    height: 13,
  },
  textStyle: {
    marginLeft: 80,
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH,
    textAlign: 'left',
    color: HEX_COLOR_CODES.WHITE,
  },
  infoBox: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  infoHeader: {
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '500',
    paddingBottom: 5,
    color: HEX_COLOR_CODES.WHITE,
  },
  infoMessage: {
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '500',
    color: HEX_COLOR_CODES.WHITE,
  },
  topContent: {
    position: 'absolute',
    top: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT * 0.07,
    zIndex: 10,
  },
  bottomContent: {
    position: 'absolute',
    bottom: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT * 0.1,
    alignSelf: 'center',
  },
  errContainer: {
    height: '100%',
    backgroundColor: HEX_COLOR_CODES.GREY_BG,
    alignItems: 'center',
  },
});

export default style;