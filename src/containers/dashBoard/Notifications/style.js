import {StyleSheet} from 'react-native';
import {Layout} from '../../../utilities';

const {HEX_COLOR_CODES, LAYOUT_CONSTRAINTS, FONTS} = Layout;

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HEX_COLOR_CODES.WHITE,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatList: {
    marginTop: 24,
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retryButton: {
    marginTop: 50,
    marginHorizontal: 15,
    backgroundColor: HEX_COLOR_CODES.BLACK,
  },
  retry: {
    fontSize: 18,
    fontFamily: FONTS.SOFIA_REGULAR,
    color: HEX_COLOR_CODES.WHITE,
  },
  errorText: {},
  header: {
    marginTop: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT * 0.1,
  },
  title: {
    marginLeft: 13,
    fontFamily: FONTS.SOFIA_MEDIUM,
    fontSize: 24,
  },
  listContainer: {
    paddingTop: 43,
    alignItems: 'center',
  },
  notificationCard: {
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 26,
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  notiUpperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notiCardTitle: {
    flex: 1,
    fontFamily: FONTS.SOFIA_REGULAR,
    fontSize: 16,
    fontWeight: '500',
    color: HEX_COLOR_CODES.DARKGRAY,
  },
  remove: {
    width: 24,
    height: 24,
    right: 0,
  },
  crossButtonContainer: {
    alignSelf: 'flex-end',
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  crsossButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notiCardDate: {
    fontFamily: FONTS.ARIAL,
    fontSize: 16,
    color: HEX_COLOR_CODES.GRAY,
    marginTop: 8,
  },
  noNotification: {
    fontFamily: FONTS.SOFIA_MEDIUM,
    fontSize: 24,
    color: HEX_COLOR_CODES.GREEN,
    width: 240,
    alignSelf: 'center',
    textAlign: 'center',
    position: 'absolute',
    marginTop: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT / 3,
  },
  underLine: {
    height: 2,
    position: 'absolute',
    bottom: 0,
    backgroundColor: HEX_COLOR_CODES.LIGHT_GRAY,
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 28,
    alignSelf: 'center',
  },
  subTextStyle: {
    color: HEX_COLOR_CODES.GREEN,
  },
});
