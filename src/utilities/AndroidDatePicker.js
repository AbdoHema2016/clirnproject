import {DatePickerAndroid} from 'react-native';

export const datePickerAndroid = async (maxDate, callback) => {
  try {
    const {action, year, month, day} = await DatePickerAndroid.open({
      // Use `new Date()` for current date.
      // May 25 2020. Month 0 is January.
      date: new Date(),
      maxDate: maxDate,
    });
    if (action !== DatePickerAndroid.dismissedAction) {
      // Selected year, month (0-11), day
      let doubleDigitMonth =
        parseInt(month, 10) + 1 < 10
          ? '0' + (parseInt(month, 10) + 1).toString()
          : parseInt(month, 10) + 1;
      let doubleDigitDate = day < 10 ? '0' + day : day;

      callback(year + '-' + doubleDigitMonth + '-' + doubleDigitDate);
    }
  } catch ({code, message}) {
    console.warn('Cannot open date picker', message);
  }
};
