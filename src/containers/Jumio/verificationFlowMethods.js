import {NativeEventEmitter, Alert, NativeModules} from 'react-native';
import {Constants} from '../../utilities';
import {translate} from '../../Localization';
import {initiateJumioSDK} from './SDKMethods';

const {jumioErrorCode, jumioSource} = Constants;
const {JumioMobileSDKNetverify} = NativeModules;
class JumioVerificationMethods {
  constructor() {
    this.props = null;
    this.instance = null;
  }

  setProps(props) {
    this.props = props;
  }

  setInstance(instance) {
    this.instance = instance;
  }
  startJumio = () => {
    this.setupNetVerifyListeners();
    this.openJumio();
  };

  getJumioData() {
    const {token, fetchJumioCredentials} = this.instance.props;

    fetchJumioCredentials({access_token: token});
  }
  openJumio() {
    const {apiToken, apiSecret, dataCenter, userId} = this.instance.props;
    return initiateJumioSDK({apiToken, apiSecret, dataCenter, userId});
  }
  setupNetVerifyListeners = () => {
    this.instance.emitterNetverify = new NativeEventEmitter(
      JumioMobileSDKNetverify,
    );
    this.instance.emitterNetverify.addListener(
      'EventDocumentData',
      (EventDocumentData) => {
        this.instance.emitterNetverify.removeListener('EventDocumentData');
        this.instance.emitterNetverify.removeListener('EventErrorNetverify');
        if (this.instance.state.source === jumioSource.medicalApprover) {
          this.instance.setState({step: 1});
        }
      },
    );

    this.instance.emitterNetverify.addListener(
      'EventErrorNetverify',
      (EventErrorNetverify) => {
        this.instance.emitterNetverify.removeListener('EventErrorNetverify');
        this.instance.emitterNetverify.removeListener('EventDocumentData');
        if (EventErrorNetverify.errorCode === jumioErrorCode) {
          return;
        }
        Alert.alert(
          translate('JUMIO_POPUP.JUMIO_ERROR'),
          this.getJumioError(EventErrorNetverify.errorMessage),
        );
      },
    );
  };
  getJumioError = (error = '') => {
    if (typeof error !== 'string') {
      return error;
    }
    const errorArray = error.split('(');
    return errorArray[0].trim();
  };
}

export const JumioFlowMethodsObj = new JumioVerificationMethods();
