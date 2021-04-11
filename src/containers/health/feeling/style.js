import {StyleSheet} from 'react-native';
import {Layout} from '../../../utilities';

const {LAYOUT_CONSTRAINTS, HEX_COLOR_CODES, FONTS} = Layout;

const Style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: HEX_COLOR_CODES.LIGHT_GRAY,
  },
  lablesContainer: {
    alignSelf: 'center',
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 28,
  },
  innerContainer: {
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH,
    bottom: 24,
  },
  infoStageLabel: {
    marginTop: LAYOUT_CONSTRAINTS.WINDOW_HEIGHT * 0.12,
    fontSize: 16,
    color: HEX_COLOR_CODES.GRAY,
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
    bottom: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT * 0.098,
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 28,
    height: 50,
    justifyContent: 'space-between',
  },
  abledGreenButton: {
    backgroundColor: HEX_COLOR_CODES.GREEN,
  },
  selectedButton: {
    backgroundColor: HEX_COLOR_CODES.WHITE,
    marginTop: 20,
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 26,
    borderWidth: 1.5,
    borderColor: HEX_COLOR_CODES.GREEN,
  },
  unselectedButton: {
    backgroundColor: HEX_COLOR_CODES.WHITE,
    marginTop: 20,
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 26,
  },
  disabledButton: {
    backgroundColor: HEX_COLOR_CODES.GRAY,
  },
  whiteText: {
    color: HEX_COLOR_CODES.WHITE,
  },
  blackText: {
    color: HEX_COLOR_CODES.BLACK,
  },
  chooseAns: {
    marginTop: 26,
    color: HEX_COLOR_CODES.GRAY,
    fontSize: 18,
    fontFamily: FONTS.SOFIA_MEDIUM,
  },
  answerButtons: {
    marginTop:
      LAYOUT_CONSTRAINTS.SCREEN_HEIGHT > 700
        ? LAYOUT_CONSTRAINTS.SCREEN_HEIGHT * 0.078
        : 24,
    alignItems: 'center',
    marginBottom: 8,
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
