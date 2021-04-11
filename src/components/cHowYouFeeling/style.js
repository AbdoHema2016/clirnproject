import {StyleSheet} from 'react-native';
import {Layout} from '../../utilities';

const {HEX_COLOR_CODES, LAYOUT_CONSTRAINTS, FONTS} = Layout;

const Style = StyleSheet.create({
  container: {
    height:
      LAYOUT_CONSTRAINTS.SCREEN_HEIGHT > 800
        ? LAYOUT_CONSTRAINTS.SCREEN_HEIGHT - 240
        : LAYOUT_CONSTRAINTS.SCREEN_HEIGHT - 120,
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: 14,
    marginRight: 14,
    backgroundColor: HEX_COLOR_CODES.WHITE,
  },
  subContainer: {
    alignItems: 'center',
    marginTop: 0,
    width: '100%',
    height: '78%',
  },
  lablesContainer: {
    alignSelf: 'center',
    marginLeft: 14,
    marginRight: 14,
  },
  innerContainer: {
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH,
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
    marginTop: 36,
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 58,
    color: HEX_COLOR_CODES.BLACK,
    fontFamily: FONTS.SOFIA_MEDIUM,
  },
  inputContainer: {
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 26,
    marginTop: 24,
    height: 'auto',
  },
  buttonsContainer: {
    bottom: 24,
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 28,
    height: 'auto',
    paddingVertical: 8,
    position: 'absolute',
    justifyContent: 'space-between',
  },
  abledGreenButton: {
    backgroundColor: HEX_COLOR_CODES.GREEN,
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 56,
    alignSelf: 'center',
  },
  selectedButton: {
    backgroundColor: HEX_COLOR_CODES.WHITE,
    marginTop: 20,
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 58,
    borderWidth: 1.5,
    borderColor: HEX_COLOR_CODES.GREEN,
  },
  unselectedButton: {
    backgroundColor: HEX_COLOR_CODES.WHITE,
    marginTop: 20,
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 58,
    elevation: 4,
  },
  unselectedButtonContAINER: {
    backgroundColor: HEX_COLOR_CODES.WHITE,
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 60,
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
    marginTop: 24,
    alignItems: 'center',
    marginBottom: 8,
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
});

export default Style;
