import RNOtpVerify from 'react-native-otp-verify';

export function getHash(cb) {
  RNOtpVerify.getHash()
    .then((hash) => {
      cb(hash);
    })
    .catch();
}
