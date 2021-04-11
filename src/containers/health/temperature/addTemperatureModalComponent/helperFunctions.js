import dayjs from 'dayjs';
import {Constants} from '../../../../utilities';

const {DATEFORMATS, profileModals, temperatureDefaultValues} = Constants;

class TemperatureHelperFunction {
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

  tempScaleType = (val) => {
    const {celsius, fahrenheit} = temperatureDefaultValues;
    let intVal = val === '°F' ? fahrenheit : celsius;
    this.props.setTempType(val, intVal, '0');
  };

  showPicker = (val) => {
    this.instance.setState({
      showPicker: val,
    });
  };

  selectTemperatureValue = (type, val) => {
    this.showPicker(true);
    if (val === null) {
      this.instance.setState({
        intOrDec: type,
      });
      return;
    }
    type === 'INT'
      ? this.props.setTempIntVal(val)
      : this.props.setTempDecVal(val);
  };

  setTempVal() {
    const {celsius, fahrenheit} = temperatureDefaultValues;
    this.props.setTempIntVal(
      this.props.profile.userInfo.healthReport.preferred_measurement === '°C'
        ? celsius
        : fahrenheit,
    );
    this.props.setTempDecVal('0');
  }

  sendTemperatureData = (tempDecValue, tempIntValue, tempType) => {
    this.props.tempSkipped(false);
    const {
      details: {token, userID},
      modalIndex,
      feeling,
      email,
    } = this.props;
    let data;
    if (email !== '') {
      data = {
        date_of_reading: dayjs().format(DATEFORMATS.TEMPERATURE_DATA),
        temperature: tempIntValue + '.' + tempDecValue,
        preferred_measurement: tempType === '°C' ? '1' : '2',
        user_id: userID,
      };
    } else {
      data = {
        date_of_reading: dayjs().format(DATEFORMATS.TEMPERATURE_DATA),
        temperature: tempIntValue + '.' + tempDecValue,
        preferred_measurement: tempType === '°C' ? '1' : '2',
        user_id: userID,
        step: 6,
      };
    }

    this.props.sendTempData(data, token, modalIndex, feeling.id);
  };

  showModal = (type) => {
    this.instance.setState(
      {
        showModal: type === -1 ? false : true,
      },
      () => {
        this.instance.state.source === 'Profile'
          ? this.props.updateModalIndex(type)
          : this.props.updateTempHistoryModalIndex(type);
      },
    );
  };

  skipPressed = (type) => {
    this.showModal(type);
    this.props.tempSkipped(true);
  };

  showNextModal = () => {
    const {modalIndex} = this.instance.state;
    const index =
      modalIndex > profileModals.HealthUpdateModal ? 1 : modalIndex + 1;
    this.instance.state.source === 'Profile'
      ? this.props.updateModalIndex(index)
      : this.props.updateTempHistoryModalIndex(index);
  };
}

const TemperatureHelperFunctionObj = new TemperatureHelperFunction();
export default TemperatureHelperFunctionObj;
