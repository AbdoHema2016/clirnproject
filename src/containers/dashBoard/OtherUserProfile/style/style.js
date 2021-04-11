import {StyleSheet} from 'react-native';
import {Layout} from '../../../../utilities';

const {HEX_COLOR_CODES, FONTS} = Layout;

const Style = StyleSheet.create({
  wrapper: {flex: 1},
  sharedProfileView: {
    fontFamily: FONTS.SOFIA_REGULAR,
    fontSize: 24,
  },
  scrollView: {backgroundColor: HEX_COLOR_CODES.WHITE},
  contentContainerStyle: {
    paddingBottom: 10,
  },
  tintColor: {
    tintColor: HEX_COLOR_CODES.WHITE,
  },
  userImageContainer: {
    height: 144,
    width: 144,
    borderRadius: 77,
    backgroundColor: HEX_COLOR_CODES.WHITE,
  },
  userImage: {
    height: '100%',
    width: '100%',
    borderRadius: 77,
  },
  profileStatusContainer: {
    position: 'absolute',
    right: 8,
    bottom: 0,
    backgroundColor: HEX_COLOR_CODES.MID_GRAY,
    height: 36,
    width: 36,
    borderRadius: 18,
  },
  userName: {
    marginTop: 36,
    alignSelf: 'center',
    fontSize: 24,
    fontFamily: FONTS.SOFIA_REGULAR,
    fontWeight: '600',
    textAlign: 'center',
    marginHorizontal: 15,
  },
  location: {
    marginTop: 8,
    alignSelf: 'center',
    fontSize: 16,
    fontFamily: FONTS.SOFIA_REGULAR,
    color: HEX_COLOR_CODES.GRAY,
    textAlign: 'center',
    marginHorizontal: 15,
  },
  dataContainer: {
    marginTop: 15,
  },
  profileImageContainer: {
    backgroundColor: HEX_COLOR_CODES.LIGHT_WHITE,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    backgroundColor: HEX_COLOR_CODES.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25,
    paddingBottom: 10,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    marginHorizontal: 15,
    fontSize: 18,
    fontFamily: FONTS.SOFIA_REGULAR,
    color: HEX_COLOR_CODES.BLACK,
    textAlign: 'center',
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
});

export default Style;
