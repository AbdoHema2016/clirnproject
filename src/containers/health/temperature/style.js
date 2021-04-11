import {StyleSheet, Platform} from 'react-native';
import {Layout} from '../../../utilities';

const {LAYOUT_CONSTRAINTS, HEX_COLOR_CODES, FONTS} = Layout;

const Style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: HEX_COLOR_CODES.LIGHT_GRAY,
  },
  lablesContainer: {
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 26,
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
    position: 'absolute',
    bottom: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT * 0.119,
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 28,
    height: 50,
    justifyContent: 'space-between',
  },
  abledGreenButton: {
    backgroundColor: HEX_COLOR_CODES.GREEN,
  },
  selectedTemperatureScaleTypeButtonContainer: {
    backgroundColor: HEX_COLOR_CODES.WHITE,
    marginLeft: 13,
    height: 49,
    width: 48,
    borderWidth: 1.5,
    borderColor: HEX_COLOR_CODES.GREEN,
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
    height: '100%',
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
    marginTop:
      LAYOUT_CONSTRAINTS.SCREEN_HEIGHT > 700
        ? LAYOUT_CONSTRAINTS.SCREEN_HEIGHT * 0.078
        : 24,
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
    marginTop: 5,
    textAlign: 'center',
    fontFamily: FONTS.SOFIA_REGULAR,
    fontSize: 16,
    color: HEX_COLOR_CODES.BLACK,
    alignSelf: 'center',
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 56,
    paddingVertical: 15,
  },
});

export default Style;
