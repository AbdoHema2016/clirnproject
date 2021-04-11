import {StyleSheet, Platform} from 'react-native';
import {Layout} from '../../../../utilities';

const {HEX_COLOR_CODES, LAYOUT_CONSTRAINTS, FONTS} = Layout;

const style = StyleSheet.create({
  modalContainer: {
    width: 'auto',
    justifyContent: 'center',
    position: 'absolute',
    marginTop: 44,
    bottom: 0,
  },

  iosPicker: {
    marginTop: 0,
    height: 150,
    bottom: 0,
    backgroundColor: HEX_COLOR_CODES.WHITE,
  },
  modal: {
    height: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT,
  },
  dataContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: HEX_COLOR_CODES.WALKTHROUGH_BG,
  },
  dataView: {
    alignSelf: 'center',
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 28,
    marginTop: 92,
    borderRadius: 8,
    backgroundColor: HEX_COLOR_CODES.WHITE,
  },
  textStyle: {
    color: HEX_COLOR_CODES.WHITE,
  },
  image: {
    position: 'absolute',
    right: 0,
    height: 24,
    width: 24,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0000',
  },
  lablesContainer: {
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 56,
    alignSelf: 'center',
    marginTop: 48,
  },
  innerContainer: {
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH,
    bottom: 24,
  },
  infoStageLabel: {
    marginTop: LAYOUT_CONSTRAINTS.WINDOW_HEIGHT * 0.12,
    fontSize: 16,
    color: HEX_COLOR_CODES.GRAY,
    textAlign: 'left',
    fontFamily: FONTS.SOFIA_MEDIUM,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: HEX_COLOR_CODES.BLACK,
    fontFamily: FONTS.SOFIA_MEDIUM,
  },
  inputContainer: {
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 26,
    marginTop: 24,
    height: 'auto',
  },
  buttonsContainer: {
    marginTop: 20,
    bottom: 16,
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 28,
    height: 'auto',
    paddingVertical: 16,
    justifyContent: 'space-between',
  },
  abledGreenButton: {
    backgroundColor: HEX_COLOR_CODES.GREEN,
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 56,
    alignSelf: 'center',
  },
  selectedTemperatureScaleTypeButtonContainer: {
    backgroundColor: HEX_COLOR_CODES.WHITE,
    marginLeft: 13,
    height: 49,
    width: 48,
    borderWidth: 1.5,
    borderColor: HEX_COLOR_CODES.GREEN,
    elevation: 5,
  },
  unSelectedTemperatureScaleTypeButtonContainer: {
    backgroundColor: HEX_COLOR_CODES.WHITE,
    marginLeft: 13,
    height: 49,
    width: 48,
  },
  temperatureScaleTypeButton: {
    backgroundColor: HEX_COLOR_CODES.WHITE,
    height: '100%',
    width: '100%',
  },
  temperatureIntegerValueButtonContainer: {
    height: 48,
    width: 116,
    marginLeft: 13,
  },
  selTemperatureIntegerValueButtonContainer: {
    height: 48,
    width: 116,
    marginLeft: 13,
    borderWidth: 1.5,
    borderColor: HEX_COLOR_CODES.GREEN,
  },
  temperatureIntegerValueButton: {
    backgroundColor: HEX_COLOR_CODES.WHITE,
    height: '70%',
    width: Platform.OS === 'ios' ? '100%' : '80%',
  },
  disabledButton: {
    backgroundColor: HEX_COLOR_CODES.GRAY,
  },
  whiteText: {
    color: HEX_COLOR_CODES.WHITE,
  },
  blackText: {
    color: HEX_COLOR_CODES.BLACK,
    position: 'absolute',
    left: 16,
  },
  chooseScale: {
    marginTop: 26,
    color: HEX_COLOR_CODES.GRAY,
    fontSize: 18,
    fontFamily: FONTS.SOFIA_MEDIUM,
  },
  tempScaleType: {
    marginTop: 36,
    alignItems: 'center',
    flexDirection: 'row',
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH,
  },
  dotLabel: {
    width: 4,
    marginLeft: 12,
    textAlign: 'center',
  },
  tempScaleLabel: {
    width: 32,
    fontSize: 18,
    marginTop: 12,
    fontFamily: FONTS.SOFIA_REGULAR,
    marginLeft: 12,
    textAlign: 'center',
  },
  skip: {
    marginTop: 16,
    textAlign: 'center',
    fontFamily: FONTS.SOFIA_REGULAR,
    fontSize: 16,
    color: HEX_COLOR_CODES.BLACK,
    alignSelf: 'center',
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 56,
  },

  doneButton: {
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH,
    marginTop: 0,
    backgroundColor: 'grey',
    height: 44,
    justifyContent: 'center',
  },
  pickerView: {
    marginTop: 32,
    width: '100%',
  },
  errorText: {
    fontFamily: FONTS.SOFIA_REGULAR,
    fontSize: 14,
    color: HEX_COLOR_CODES.RED,
    marginHorizontal: 15,
    marginTop: 15,
  },
});
export default style;
