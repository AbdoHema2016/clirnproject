import {StyleSheet} from 'react-native';
import {Layout} from '.././../../../../utilities';

const {HEX_COLOR_CODES, FONTS} = Layout;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingVertical: 13,
    borderBottomWidth: 0.5,
    borderBottomColor: HEX_COLOR_CODES.MID_GRAY,
  },
  testDetailsContainer: {flex: 1, marginLeft: 15},
  verifiedIcon: {
    height: 24,
    width: 24,
    borderRadius: 8,
    marginLeft: 8,
  },
  testLabel: {
    fontSize: 18,
    fontFamily: FONTS.FUTURA,
  },
  verifiedLabel: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: FONTS.FUTURA,
    color: HEX_COLOR_CODES.GREEN,
  },
  notVerifiedLabel: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: FONTS.FUTURA,
    color: HEX_COLOR_CODES.LIGHT_RED,
  },
  testStatus: {
    fontSize: 16,
    marginTop: 4,
    fontFamily: FONTS.FUTURA,
  },
  testDate: {
    fontSize: 12,
    marginTop: 4,
    fontFamily: FONTS.FUTURA,
    color: HEX_COLOR_CODES.GRAY,
  },
  infoContainer: {
    backgroundColor: HEX_COLOR_CODES.RED,
    height: 45,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  infoIcon: {
    height: 30,
    width: 30,
  },
  alertContainer: {
    position: 'absolute',
    bottom: 0,
    left: 5,
    right: 5,
    backgroundColor: HEX_COLOR_CODES.WHITE,

    shadowColor: HEX_COLOR_CODES.BLACK,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 4,
    paddingLeft: 15,
    paddingVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  alertDescription: {
    fontSize: 14,
    fontFamily: FONTS.SOFIA_REGULAR,
    color: HEX_COLOR_CODES.BLACK,
    marginHorizontal: 15,
    marginTop: 10,
  },
  infoAlertContainer: {
    paddingBottom: 30,
    paddingTop: 10,
  },
  processButtonView: {
    right: 8,
    height: 42,
    width: 95,
    borderRadius: 4,
    backgroundColor: HEX_COLOR_CODES.GREEN,
  },
  processButton: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  processText: {
    fontFamily: FONTS.FUTURA,
    fontSize: 16,
    color: HEX_COLOR_CODES.WHITE,
  },
});
