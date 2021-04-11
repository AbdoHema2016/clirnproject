import {Platform} from 'react-native';
import {Constants, ImagePicker, HelperFunctions} from '../../../../utilities';
import dayjs from 'dayjs';
import {
  logAnalyticsEvent,
  setUserAnalyticsProperties,
} from '../../../../utilities/Firebase';
import {translate} from '../../../../Localization';

const {DATEFORMATS, analyticsIds, docTypes, cameraError} = Constants;
const {imagePicker} = ImagePicker;
const {errorReportLogger} = HelperFunctions;
class ResultsMethods {
  constructor() {
    this.props = null;
    this.instance = null;
  }

  set setProps(props) {
    this.props = props;
  }

  set setInstance(instance) {
    this.instance = instance;
  }
  goBack = () => {
    this.props.navigation.pop();
  };
  editTest = async (item, popupType) => {
    const {
      test_center,
      test_date,
      test_performed,
      test_result,
      test_type,
      id,
      document,
    } = item;
    const {
      updateHealthTestID,
      editHealthData,
      route = '',
      userLocation = '',
      associatedCompany = '',
    } = this.props;
    const screenName = route?.name;
    setUserAnalyticsProperties({
      userLocation,
      screenName,
      associatedCompany,
    });
    logAnalyticsEvent(analyticsIds.healthResultsScreen_edit_health_test, {
      userLocation,
      screenName,
      associatedCompany,
    });
    let docType = item.document_url.substring(
      item.document_url.lastIndexOf('.') + 1,
    );
    let formattedDate = dayjs(test_date, DATEFORMATS.TEMPERATURE_DATA).format(
      DATEFORMATS.PROFILE_HEALTH_TEST,
    );
    updateHealthTestID(id);
    let data = {
      healthTestData: [
        {
          testData: {
            id,
            howWasThistestPerformed: {
              value: test_performed,
              empty: false,
              status: 'active',
            },

            testCentre: {value: test_center, empty: false, status: 'active'},
            testDate: {value: formattedDate, empty: false, status: 'active'},
            testResult: {value: test_result, empty: false, status: 'active'},
            testType: {value: test_type, empty: false, status: 'active'},

            document: {
              name: document,
              type: docType,
              uri: item.document_url,
            },
          },
        },
      ],
      index: id,
    };

    editHealthData(data);
    this.instance.setState({showModal: true, popupType});
  };
  showError = () => {
    this.instance.setState({error: !this.instance.state.error});
  };
  formatDate = (currentDate) => {
    let newDate = dayjs(currentDate, DATEFORMATS.TEMPERATURE_DATA).format(
      DATEFORMATS.PROFILE_HEALTH_TEST,
    );
    return newDate;
  };
  uploadHealthTest = (healthTestDetails) => {
    const {
      test_center,
      test_date,
      test_performed,
      test_result,
      test_type,
      id,
    } = healthTestDetails;
    let testData = {
      test_center,
      test_date: dayjs(test_date, DATEFORMATS.TEMPERATURE_DATA).format(
        DATEFORMATS.PROFILE_HEALTH_TEST,
      ),
      test_performed,
      test_result,
      test_type,
      id,
    };
    const options = [
      translate('CAMERA_OPTIONS.TAKE_PHOTO'),
      translate('CAMERA_OPTIONS.LIBRARY'),
      translate('CAMERA_OPTIONS.CANCEL'),
    ];
    const cancelButtonIndex = 2;
    this.props.showActionSheetWithOptions(
      {
        useModal: true,
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        this.uploadImage(buttonIndex, docTypes.HEALTH, testData);
      },
    );
  };
  uploadImage = async (imageSourceChoice, docType, testData) => {
    if (!this.props?.token) {
      const error = new Error(
        'this.props.details.token not found in "uploadImage" in ResultsMethods.js',
      );
      errorReportLogger(error);
      return;
    }
    if (docType === docTypes.HEALTH) {
      this.instance.setState({
        uploadingImage: true,
      });
    }
    let accessToken = this.props.token;
    let userID = this.props.userID;
    imagePicker(imageSourceChoice, async (source) => {
      if (!source?.fileName) {
        if (docType === docTypes.HEALTH) {
          this.instance.setState({
            uploadingImage: false,
          });
        }
        return;
      }
      if (source === cameraError) {
        this.instance.setState({
          uploadingImage: false,
          error: true,
        });
        return;
      }
      if (Platform.OS !== 'android' && source && source.uri) {
        source.fileName = source.uri.substring(source.uri.lastIndexOf('/') + 1);
      }
      source.fileName = source.fileName.replace(/ /g, '_').toLowerCase();
      this.props.uploadImageS3({
        source,
        accessToken,
        userID,
        docType,
        testData,
      });
    });
  };
}

const resultsMethods = new ResultsMethods();

export default resultsMethods;
