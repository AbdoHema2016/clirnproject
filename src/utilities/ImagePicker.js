import {PermissionsAndroid, Platform} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {cameraError, cameraOptions} from '../Constants';

const options = {
  mediaType: 'photo',
};

export const imagePicker = async (imageSourceChoice, callback) => {
  if (imageSourceChoice === cameraOptions.cancel) {
    callback(false);
    return;
  }

  let imagePickerFunction = launchImageLibrary;
  if (imageSourceChoice === cameraOptions.takePic) {
    if (Platform.OS !== 'ios') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          callback(cameraError);
          return;
        }
      } catch (err) {
        callback(cameraError);
        return;
      }
    }
    imagePickerFunction = launchCamera;
  }
  imagePickerFunction(options, (response) => {
    if (response.didCancel) {
      callback(false);
      return;
    }
    if (response.errorCode) {
      callback(cameraError);
      return;
    }
    callback(response);
  });
};
