import {Constants, HelperFunctions} from '../../../../utilities';

const {temperatureDefaultValues, temperatureType} = Constants;
const {errorReportLogger} = HelperFunctions;

class HealthStatusMethod {
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

  setTempVal() {
    const {setTempType, setTempIntVal, setTempDecVal} = this.props;
    const {celsius} = temperatureDefaultValues;
    const {celsiusWithDegree} = temperatureType;
    setTempType(celsiusWithDegree);
    setTempIntVal(celsius);
    setTempDecVal('0');
  }

  feelingSelected = (index, value) => {
    this.props.setFeeling(value, index);
  };

  sendHealthStat = () => {
    const {
      modalIndex,
      feeling: {
        feeling: {value},
      },
      tempSkipped,
    } = this.props;

    if (!this.props?.details?.token) {
      const error = new Error(
        'this.props.details.token not found in "sendHealthStat" healthStatusMethods.js',
      );

      errorReportLogger(error);
      return;
    }
    let data = {
      params: {
        health_status: value,
      },
      token: this.props.details.token,
      via: 'profile',
      skip: tempSkipped,
      modalIndex: modalIndex,
    };
    this.props.sendHealthStat(data);
  };

  isTempEnabled = () => {
    const {
      props: {
        details: {token, userID},
        showTemperature,
      },
    } = this.instance;

    let data = {
      token: token,
      userID: userID,
      status: !showTemperature ? '1' : '0',
    };
    this.props.showTemperatureAction(data);
  };
}

export const HealthStatusMethodObj = new HealthStatusMethod();
